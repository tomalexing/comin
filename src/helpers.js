import React from 'react';

export class LazyImage extends React.Component {
    constructor(p){
      super(p);
      this._isMounted = false;
    }
  
    state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null
    }
  
    componentWillMount() {
      this.load(this.props)
    }
  
    componentDidMount(){
      this._isMounted = true;
    }
  
    componentWillUnmount(){
      this._isMounted = false;
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) {
        this.load(nextProps)
      }
    }
  
    load(props) {
      props.load().then((src) => {
        let image = new Image; 
        image.src = src;
        image.onload = () => {
            if(this.node){
                this.node.innerHTML = '';
                this.node.appendChild(image);
            }
        }
      })
    }
  
    render() {
      let {mod , ...rest} = this.props;
      return  <div ref={node => this.node = node} />
    }
}

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function delegate(target, type, selector, handler, capture = false, once = false) {
    const dispatchEvent = (event) => {
        // console.time('delegate');
        let targetElement = event.target;
        while (targetElement && targetElement !== target ) {
        if ( typeof targetElement.matches == 'function' && targetElement.matches(selector)) {
          
            event.delegateTarget = event.delegateTarget || targetElement;
            handler.call(this, event);
            break;
        }
        targetElement = targetElement.parentNode;
        }
        // console.timeEnd('delegate');
    };

    target.addEventListener(type, dispatchEvent, !!capture);

    return () => target.removeEventListener(type, dispatchEvent, {capture: !!capture, once: !!once});

};


export function listener(target, type, handler, capture) {
  const dispatchEvent = (event) => {
      handler.call(this, event);
  };

  target.addEventListener(type, dispatchEvent, !!capture);

  return () => target.removeEventListener(type, dispatchEvent, !!capture);

};



export const call = (fn, ...args) => {
  if (typeof fn === 'function') {
      return fn(...args);
  }
};


export function removeClass(element, className){
  if ( element.classList)
    element.classList.remove(className)
  else
    element.className = element.className
      .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
      .replace(/\s+/g, ' ')
      .replace(/^\s*|\s*$/g, '');
}

export function addClass(element, className){
  if ( element.classList)
    element.classList.add(className)
  else if ( !hasClass(element))
    element.className = element.className + ' ' + className
}

export function hasClass(element, className) {
  if ( element.classList)
    return !!className && element.classList.contains(className)
  else
    return ` ${element.className} `.indexOf(` ${className} `) !== -1
}


export const requestAnimationFramePromise = _ => new Promise(requestAnimationFrame);
export const transitionEndPromise = elem => new Promise(resolve => {
  elem.addEventListener('transitionend', resolve, {capture: false});
});


export const getUniqueKey = (key = '') => {
  return `${key?key+'-':''}${~~(Math.random()*1000)}_${~~(Math.random()*1000)}`
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let util = {};
util.debounce = debounce;
util.call = call;
util.listener = listener;
util.delegate = delegate;
util.hasClass = hasClass;
util.addClass = addClass;
util.removeClass = removeClass;
util.getUniqueKey = getUniqueKey;
util.getParameterByName = getParameterByName;
util.requestAnimationFramePromise = requestAnimationFramePromise  ;
export default util;