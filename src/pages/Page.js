import React from 'react';

class Page extends React.Component{
    
    componentDidMount(){
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
            console.log(e.data)
            createPopup(e.data);
           
        }


        function createPopup({productId, date}){
            var wrapper = document.createElement('div');
            var style = document.createElement('style');
            style.innerText = ".Comin{z-index: 10000000; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(42,42,42, .4); overflow-x: hidden; overflow-y: auto;}";
            style.innerText += ".Comin__btn{width: 40px; height: 40px; background-color: rgba(113, 134, 230, 0.85); position: absolute; top: 0; right: 0;} .Comin__btn:after, .Comin__btn:before{content: ''; width: 2px; height: 34px; background: #fff; display: block; position: absolute; right: 17px; top: 3px;} .Comin__btn:before{ transform: rotate(45deg);}.Comin__btn:after{ transform: rotate(-45deg);}" 

            wrapper.classList = 'Comin';
            wrapper.setAttribute('id', 'comin-popup-wrapper');
            
            var ifrmPopup = document.createElement("iframe");
            ifrmPopup.setAttribute("src", `${process.env.REACT_APP_BUILD ? "//comin.co/system/popup?id="+productId+"&date=" + date : "//localhost:3000/popup?id="+productId+"&date=" + date}`);
            ifrmPopup.style.width = "700px";
            ifrmPopup.style.height = "710px";
            ifrmPopup.style.margin = "30px 0";
            ifrmPopup.style.position = "absolute";
            ifrmPopup.style.left = (window.outerWidth - 700)/2 + "px";
            
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
    }

    shouldComponentUpdate(){
        return false
    }
    render(){
        return(
            <iframe id='comin' style={{'border':'none'}} src={`${process.env.REACT_APP_BUILD ? '//comin.co/system/banner' : '//localhost:3000/banner'}`} width="336" height="454"></iframe>
        )
    }
}

export default Page