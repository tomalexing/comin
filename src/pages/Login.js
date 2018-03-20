import React from 'react';
import Auth from './../store/AuthStore.js';
import fb from './../img/fb.svg';
import mainbg from './../img/bg.png';
import logo from './../img/Logo_dark.png';
import Api from './../services/Api.js';
import {
//   BrowserRouter as Router,
//   Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import TxForm from './../components/TxForm';
import { debounce, listener, getUniqueKey, getParameterByName } from './../helpers';
import TxInput from './../components/TxInput';
import warningMark  from './../img/warning.svg';
import google from './../img/google.svg';


import github from './../img/github.svg';
import facebook from './../img/facebook.svg';
import twitter from './../img/twitter.svg';
import discord from './../img/discord.svg';
import telegram from './../img/telegram.svg';



class Login extends React.Component {

  constructor(props){
    super(props);
    this.removeMe = [];
    this.doAtDidMount = [];
    this.loginGoog = this.loginGoog.bind(this);
    this.loginFb = this.loginFb.bind(this);
    this.errorField = null;
    this.errorFieldIn = null;
  
    this.productId = getParameterByName('prod');
  }



  state = {
    ctx: { redirect: Auth.isAuthenticated }
  }



  loginGoog = async (info) => {
    let _self = this;

    Api.auth().signInWithPopup(Api.GoogleAuthProvider()).then(function(result) {
        let {credential:{ accessToken }, user: { photoURL, displayName, email, uid } = {photoURL: '', displayName:'', email: '', uid: ''}} = result;
        Auth.authorize({
          accessToken,
          photoURL,
          displayName,
          email,
          uid
        },
        (resolve) => {
            let user = Api.auth().currentUser;
            let ctx = {};
            if(user){

              Api.getRef(`users/${user.uid}`)
                .once('value')
                .then(snapshot => {
                  let state = snapshot.val();
                  
                  if(!state){
                    state = {'keyVal': getUniqueKey( user.uid.slice(0, 10) ), prod: _self.productId || 'no-ref'}
                    Api.getRef(`users/${user.uid}`).set(state);
                  }

                  ctx = {
                    redirect: true,
                    state: {
                      ...state 
                    },
                    pathname: `${process.env.REACT_APP_BUILD ? '/system/dashboard' :  '/dashboard'}`
                  }

                  _self.setState({ ctx })
                })
                .catch(err => console.log(err));

            }
        });
        
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  loginFb = async (info) => { 

    let _self = this;

    Api.auth().signInWithPopup(Api.FacebookAuthProvider()).then(function(result) {
        let {credential:{ accessToken }, user: { photoURL, displayName, email, uid } = {photoURL: '', displayName:'', email: '', uid: ''}} = result;
        debugger;
        Auth.authorize({
          accessToken,
          photoURL,
          displayName,
          email,
          uid
        },
        (resolve) => {
            let user = Api.auth().currentUser;
            let ctx = {};
            if(user){
              Api.getRef(`users/${user.uid}`)
                .once('value')
                .then(snapshot => {
                  let state = snapshot.val();
                  
                  if(!state){
                    state = {'keyVal': getUniqueKey( user.uid.slice(0, 10) ), prod: _self.productId || 'no-ref'}
                    Api.getRef(`users/${user.uid}`).set(state);
                  }

                  ctx = {
                    redirect: true,
                    state: {
                      ...state
                    },
                    pathname: `${process.env.REACT_APP_BUILD ? '/system/dashboard' :  '/dashboard'}`
                  }

                  _self.setState({ ctx })
                })
                .catch(err => console.log(err));

            }
        });
        
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    
    let sameUrl = false;
    if(this.props.location.pathname === `${process.env.REACT_APP_BUILD ? '/system/dashboard' :  '/dashboard'}`){
      sameUrl = true
    }

    let { ctx } = this.state, from = {};
    
    if( ctx.pathname ){
      from =  {pathname: ctx.pathname, state: ctx.state }
    }else{
      from =  { pathname: `${process.env.REACT_APP_BUILD ? '/system/dashboard' :  '/dashboard'}` };
    }

    const bgPic = {
      backgroundImage : `url(${mainbg})`
    }

    return (
      (ctx.redirect && !sameUrl) ? <Redirect to={from} /> :
      <div className="f Layout-login" style={bgPic}>
       <div className="f f-col Layout-login__in">
          <div className="f f-align-2-1 f-col login__registform">
            <div className="f login__logo">
              <a href="//comin.co/" ><img src={logo} srcSet={`${logo} 2x, ${logo} 1x`} alt="Comin"/> </a>
            </div>
            <h1 className="login__header u-text-left u-my-3">Login/registration</h1>
            <p className="login__decs u-mb-5" >You can login/register with Comin System via social networks</p>
            <div className="f f-gap-2 registform-regist__social"> 
              <button className="btn btn-primary btn-big btn-block fb-color"  onClick={this.loginFb} >
                FACEBOOK
              </button>
              <button className="btn btn-primary btn-big btn-block google-color" onClick={this.loginGoog}>
                GOOGLE
              </button>
            </div>
            <h5 className="u-mt-4 h5" >By using our website and/or services, you agree to our <a href="//comin.co/terms-of-service/">Terms of Service</a> and <a href="//comin.co/privacy-policy">Privacy Policy</a>.</h5>
          </div>
          <div className="f f-align-13-2 login__footer login__footer--info">
						
            <div className="u-mx-1">
              <a href="//comin.co"><img width="300" height="64" src="https://comin.co/wp-content/uploads/2018/03/Logo_footer-1.png" /></a>
              <p className="login__footer-text__copyright">By using our website and/or services, you agree to our <a href="//comin.co/terms-of-service/">Terms of Service</a> and <a href="//comin.co/privacy-policy">Privacy Policy</a>. Comin is not a merchant of goods displayed on the widget, but an intermediary between Customers and merchants. Therefore, Comin shall not be held liable for any discrepancies that may arise between Customers and merchants. </p>
            </div>
            <div className="u-mx-1">
              <img width="216" height="46" src="https://comin.co/wp-content/uploads/2018/03/Logo_footer_wl-300x64.png" />
              <fieldset>
                <legend><strong >NOTE:</strong></legend>
                  <p>Comin applies reasonable efforts in order to provide accurate and up-to-date information (content) presented on our website and/or through our service. However, Comin shall not be held liable express or implied for any content inaccuracies that may appear on the website and/or its portals.</p>
              </fieldset>
            </div>
  
          </div>
          <footer className="f f-align-13-2 login__footer">
            <p className="u-mx-1">
              Copyright © 2018 Comin System. All Rights Reserved.
            </p>
            <ul className="f f-align-2-2">
              { /* <li className="u-mx-1"> <a href="https://github.com/comincoin" target="_blank"><img src={github}/></a></li> */}
              <li className="u-mx-1"> <a  target="_blank" href="https://www.facebook.com/comin.systems/"><img src={facebook}/></a></li>
              <li className="u-mx-1"> <a  target="_blank" href="https://twitter.com/Comin_official"><img src={twitter}/></a></li>
              <li className="u-mx-1"> <a target="_blank" href="https://t.me/comin_systems"><img src={telegram}/></a></li>
              <li className="u-mx-1"> <a  target="_blank" href="https://discord.gg/yUahqnn"><img src={discord}/></a></li>
            </ul>
          </footer>
        </div>
      </div>
    )
  }
}
export default withRouter(Login); 