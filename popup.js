      document.addEventListener("DOMContentLoaded", function(event) {
                var channel = new MessageChannel();
        var closeHandler = null;
          
        var ifr = document.querySelector('iframe#comin');
        var otherWindow = ifr.contentWindow;
        ifr.addEventListener("load", iframeLoaded, false);
            
        function iframeLoaded() {
            otherWindow.postMessage('', '*', [channel.port2]);
        }

        channel.port1.onmessage = handleMessage;
        function handleMessage(e) {
            createPopup(e.data);
           
        }


        function createPopup({productId, date}){
            var wrapper = document.createElement('div');
            var style = document.createElement('style');
            style.innerText = ".Comin{z-index: 10000000; height: 100%; height: 100vh; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(42,42,42, .4); overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling:touch;}";
            style.innerText += ".Comin__btn{width: 40px; height: 40px; background-color: rgba(113, 134, 230, 0.85); position: absolute; top: 0; right: 0; border: none;} .Comin__btn:after, .Comin__btn:before{content: ''; width: 2px; height: 34px; background: #fff; display: block; position: absolute; right: 17px; top: 3px;} .Comin__btn:before{ transform: rotate(45deg);} .Comin__btn:after{ transform: rotate(-45deg);}" 

            wrapper.classList = 'Comin';
            wrapper.setAttribute('id', 'comin-popup-wrapper');
            
            var ifrmPopup = document.createElement("iframe");
            ifrmPopup.setAttribute("src",  "//comin.co/system/popup?id="+productId+"&date=" + date);
            if(window.outerWidth > 700){
                ifrmPopup.style.width = "705px";
                ifrmPopup.style.height = "710px";
                ifrmPopup.style.margin = "30px 0";
                ifrmPopup.style.position = "absolute";
                ifrmPopup.style.border = "none";
                ifrmPopup.style.left = (window.outerWidth - 700)/2 + "px";
            }else{
                ifrmPopup.style.width = "100%";
                ifrmPopup.style.height = "1146px";
                ifrmPopup.style.margin = "60px 0px";
                ifrmPopup.style.border = "none";
            }
            
            var btn = document.createElement("button");
            btn.classList = 'Comin__btn';
            
            closeHandler = function(){
                btn.removeEventListener('click', closeHandler);
                wrapper.removeEventListener('click', closeHandler);
                wrapper.remove();
            }

            btn.addEventListener('click', closeHandler)
            wrapper.addEventListener('click', closeHandler)

            wrapper.appendChild(ifrmPopup);
            wrapper.appendChild(btn);
            document.body.appendChild(wrapper);
            document.head.appendChild(style);
        }
      });