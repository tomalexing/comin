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
import linkedin from './../img/linkedin.svg';
import facebook from './../img/facebook.svg';
import twitter from './../img/twitter.svg';
import discord from './../img/discord.svg';
import telegram from './../img/telegram.svg';
import instagram from './../img/instagram.svg';



class Login extends React.Component {

  constructor(props){
    super(props);
    this.removeMe = [];
    this.doAtDidMount = [];
    this.loginGoog = this.loginGoog.bind(this);
    this.loginFb = this.loginFb.bind(this);
    this.errorField = null;
    this.errorFieldIn = null;
  
    this.sale = getParameterByName('prod');
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
                    state = {'keyVal': getUniqueKey( user.uid.slice(0, 10) )}
                    Api.getRef(`users/${user.uid}`).set(state);
                  }

                  ctx = {
                    redirect: true,
                    state: {
                      ...state 
                    },
                    pathname: '/dashboard'
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
                    state = {'keyVal': getUniqueKey( user.uid.slice(0, 10) ), prod: _self.sale || 'no-ref'}
                    Api.getRef(`users/${user.uid}`).set(state);
                  }

                  ctx = {
                    redirect: true,
                    state: {
                      ...state
                    },
                    pathname: '/dashboard'
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
    if(this.props.location.pathname === '/dashboard'){
      sameUrl = true
    }

    let { ctx } = this.state, from = {};

    console.log(ctx)
    if( ctx.pathname ){
      from =  {pathname: ctx.pathname, state: ctx.state }
    }else{
      from =  { pathname: '/dashboard' };
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
              <Link to={'/'} ><img src={logo} srcSet={`${logo} 2x, ${logo} 1x`} alt="Comin"/> </Link>
            </div>
            <h1 className="login__header u-text-left u-my-3">Login/registration</h1>
            <p className="login__decs u-mb-5" >You can login/registration in Comin System via social networks</p>
            <div className="f f-gap-2 registform-regist__social"> 
              <div className="btn btn-primiry btn-block fb-color"  onClick={this.loginFb} >
                <img className="f f-align-1-2 u-mx-auto"  src={fb} alt="fb"/>
              </div>
              <div className="btn btn-primiry btn-block google-color" onClick={this.loginGoog}>
                <img className="f f-align-1-2  u-mx-auto"  src={google}alt="google"/>
              </div>
            </div>
          </div>
          <footer className="f f-align-13-2 login__footer">
            <p>
              Copyright © 2018 Comin System. All Rights Reserved.
            </p>
            <ul className="f f-align-2-2">
              <li className="u-mx-1"> <a href="https://github.com/comincoin"><img src={github}/></a></li>
              <li className="u-mx-1"> <a href="https://t.me/CominCoin"><img src={telegram}/></a></li>
              <li className="u-mx-1"> <a href="#"><img src={linkedin}/></a></li>
              <li className="u-mx-1"> <a href="https://www.facebook.com/groups/416365615432991/"><img src={facebook}/></a></li>
              <li className="u-mx-1"> <a href="https://twitter.com/Comin_official"><img src={twitter}/></a></li>
              <li className="u-mx-1"> <a href="https://discordapp.com/invite/UrjsM4G"><img src={discord}/></a></li>
              <li className="u-mx-1"> <a href="#"><img src={instagram}/></a></li>
            </ul>
          </footer>
        </div>
      </div>
    )
  }
}
export default withRouter(Login); 