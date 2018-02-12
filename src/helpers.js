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

let util = {};
util.debounce = debounce;
util.delegate = delegate;
export default util;