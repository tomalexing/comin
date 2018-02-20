import React from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom';
import logo from './../img/Logo.png';
import avatar from './../img/default-avatar.png';
import {hasClass, addClass, removeClass, delegate, listener, debounce,
  requestAnimationFramePromise, transitionEndPromise} from './../helpers';
import PropTypes from 'prop-types';
import Auth from './../store/AuthStore.js';
import Api from './../services/Api.js';
import TxInput from './TxInput.js';
import TxForm from './TxForm.js';
import formSerialize from 'form-serialize';
import NavLink from './NavLink.js';

const isActive = (match, location,to) => {
  return ['/dashboard'].some(str => location.pathname.includes(str) )
}

class Header extends React.Component{
  constructor(props){
    super(props);
    this.toggleMobileMenu =  this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.openMobileMenu = this.openMobileMenu.bind(this);
    this.closeListener = null;
    this.logout = this.logout.bind(this);
    this.listeners = [];
    this.timeout = null;
  }

  

  state = {
    isMobileMenuOpened: false,
    isPaymentFormOpened: false,
    isLiqpayPopupOpen: false,
    photoURL: Auth.photoURL,
    redirect: false
  }

  componentDidMount(){
    let _self = this;
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }


  closeMobileMenu = (target, stateTag, cb = ()=>{}) => {

    if(!target) return
    target.style.transition = 'opacity .3s';

    if(target.style.display === 'none'){
      //something goes wrong, so make state correction
      let obj = {};
      obj[stateTag] = false
      if(this._isMounted)
      this.setState(obj)
      return;
    }

    requestAnimationFramePromise()
      .then( _ => requestAnimationFramePromise())
      .then( _ => {
          target.style.opacity = 0;
          return transitionEndPromise(target);
      })
      .then( _ => {
        if(!target) return
        target.style.display = 'none';
        let obj = {};
        obj[stateTag] = false
        if(this._isMounted)
        this.setState(obj)
      }).then(cb);
  }

  openMobileMenu = (target, stateTag, type, optObj = {'closeTarget':'.h100','cb':()=>{}}) => {
    target.style.transition = 'opacity .1s';
    target.style.opacity = 0;
    target.style.display = 'flex';

    requestAnimationFramePromise()
      .then( _ => requestAnimationFramePromise())
      .then( _ => {
          if(!target) return
          target.style.opacity = 1;
          return transitionEndPromise(target);
      })
      .then( _ => {
        let obj = {};
        obj[stateTag] = true
        if(this._isMounted)
        this.setState(obj,() =>
           this.closeListener = delegate(window, type, optObj['closeTarget'], this.closeMobileMenu.bind(this,target, stateTag, optObj['cb']), false, true)
        )
      });
  }

  toggleMobileMenu = (e) =>  {
    e.preventDefault();
    e.stopPropagation();
    let currentTarget =  e.currentTarget,
    type = e.type;
    clearTimeout(this.timeout);

    this.timeout = setTimeout( _ => {
      !this.state.isMobileMenuOpened
      ?this.openMobileMenu(this.mobile_menu, 'isMobileMenuOpened', type)
      :this.closeMobileMenu(this.mobile_menu, 'isMobileMenuOpened', type);
      
      let menuWrapper = currentTarget.parentElement;
      hasClass(menuWrapper,'opened')?removeClass(menuWrapper,'opened'):addClass(menuWrapper,'opened');
    }, 200)
  }



  logout(e){
    e.preventDefault();
    let _self = this;
    Auth.signout().then((res , rej) => {
      console.log('logged out')
        _self.setState({redirect: true});
    });
  }

  render(){
    let { photoURL, redirect } = this.state;
    if(redirect) return(
      <Redirect to={'/'}/>
    ) 
    return(  <header className="f App__header">
                <div className="f f-align-2-2 App__header-logo">
                  <Link tabIndex='1' to={'/'} className="f f-align-2-2 App__header-logo__link"> <img src={logo} /> </Link>
                </div>
                <ul className="f f-align-1-2 App__header-menu">
                  <NavLink to={'/dashboard'} tabIndex='1' comp={isActive}>Dashboard</NavLink>
                  <NavLink tabIndex='1' to={'/about'}>About Us</NavLink>
                  <NavLink tabIndex='1' to={'/help'}>Support</NavLink>
                </ul>
                <div className="f f-align-2-2 App__header-account">
                  <button tabIndex='2' className="App__header-logout" onClick={this.logout}>Logout</button>
                </div>
            </header>
  );
  }
}

export default Header;