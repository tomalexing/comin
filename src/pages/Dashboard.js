import React, {Component} from 'react'
import logo from '../img/Logo.png';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Api from './../services/Api.js';
import Auth from './../store/AuthStore.js';
import Header from './../components/Header.js';
import Sidebar from './../components/Sidebar.js';
import deepEqual from 'deep-equal';
import TxForm from './../components/TxForm.js';
import TxInput from './../components/TxInput.js';
import Share from './../components/Share.js';
import { Timeline } from 'react-twitter-widgets'


class Dashboard extends Component{
  
    constructor(props) {
      super(props);
      this.state = { keyVal: props.location.state && props.location.state.keyVal != undefined ? props.location.state.keyVal : ''};
    }

    componentDidMount(){
      let _self = this;
      Api.auth().onAuthStateChanged((user) => {
        if(_self.state.keyVal === '' ){
          let { uid } = user ;
  
          Api.getRef(`users/${uid}`).once('value')
          .then(snapshot => {
            let {keyVal} = snapshot.val();
            _self.setState({keyVal: keyVal})
          });
        }

      });
  
    }


    shouldComponentUpdate(nextProps, nextState){

      if( !deepEqual(this.state, nextState) || !deepEqual(this.props, nextProps) ){
        return true
      }
      return false

    }

    render(){
        let { keyVal } = this.state;
        return (
          <div className="App Layout-app">
            <Header/>
            <div className="App-intro">
              <Sidebar/>
              <div className="App-intro__content">
                <Switch>
                  <RoutePassProps
                    exact
                    path={'/dashboard'}
                    component={Dash}
                    keyVal={keyVal}
                  />
                  <RoutePassProps
                    exact
                    path={'/dashboard/account'}
                    component={Account}
                  />
                </Switch>
              </div>
              <div className="App-intro__twitter">
                <Timeline
                  dataSource={{
                    sourceType: 'profile',
                    screenName: 'Comin_official'
                  }}
                  options={{
                    username: 'Comin Official'
                  }}
                  onLoad={() => console.log('Timeline is loaded!')}
                />
              </div>
            </div>
          </div>
        );
    }
  }

  export default withRouter(Dashboard);


  class Account extends Component{
    
    constructor(props){
      super(props)
      this.state = {
        photoURL: Auth.photoURL,
        displayName: Auth.displayName,
        email: Auth.email,
        uid: Auth.uid
      }
      this.copy = this.copy.bind(this);

    }

    copy(e) {
      let textAreaSelector = null;
      try {
        Array.from(e.currentTarget.closest('div').children).forEach((value, index) => {  // hard coded selector I should make up better
          if (value.tagName === 'TEXTAREA') {
            textAreaSelector = value;
            value.disabled = false;
            value.select();
          }
        })
        var successful = document.execCommand('copy');
        textAreaSelector.disabled = true;
      } catch (err) {
        console.log('Ха ха - бери, и копируй руками');
      }
    }

    render(){
      let {photoURL, displayName, email, uid} = this.state;
      return [
        <div key="1" className="App-intro__content__in  App-intro__account">
          <div className="App-intro__account__image"> <img src={photoURL}/> </div>
          <div className="App-intro__account__info">
            <div className="App-intro__account__name">{displayName}</div>
            <div className="App-intro__account__email">{email}</div>
          </div>
        </div>,
        <div key="2" className="App-intro__content__in">
          <h2 className="u-text-font__light">Share</h2>
          <hr className="u-my-3"/>
          <Share/>
          <p className='u-mt-5'>Your share link: </p>
          <div className={'f f-align-1-2 u-my-2'} >
            <textarea style={{width: '100%'}} className={'App-intro__content-copy'} disabled value={document.location.href} />
            <button className="btn btn-primiry" onClick={this.copy}> COPY </button>
          </div>
        </div>]
    }
  }
  
  class Dash extends Component{
    constructor(props) {
      super(props);      
      this.state = { messages: [], passed: undefined }; // <- set up react state
      this.onSubmit = this.onSubmit.bind(this);
      this.copy = this.copy.bind(this);
    }

    componentWillReceiveProps(newProps){
      let {keyVal} = newProps;
      if(keyVal != this.props.keyVal){
        this.setState({keyVal})
      }

    }

    shouldComponentUpdate(nextProps, nextState){

      if( !deepEqual(this.state, nextState) || !deepEqual(this.props, nextProps) ){
        return true
      }
      return false

    }

    onSubmit(e, instance ,form){
      e.preventDefault();
      let _self = this;
      let {keyVal} = form;
      Api.getRef('users').orderByChild('key').equalTo(keyVal).once('value')
      .then(snapshot => {
        if(null !== snapshot.val()){
          instance.clearFields();
          _self.setState({passed: true})
        }else{
          _self.setState({passed: false})
        }
      });
    
    }

    copy(e) {
      let textAreaSelector = null;
      try {
        Array.from(e.currentTarget.closest('div').children).forEach((value, index) => {  // hard coded selector I should make up better
          if (value.tagName === 'TEXTAREA') {
            textAreaSelector = value;
            value.disabled = false;
            value.select();
          }
        })
        var successful = document.execCommand('copy');
        textAreaSelector.disabled = true;
      } catch (err) {
        console.log('Ха ха - бери, и копируй руками');
      }
    }

    render(){
      let { keyVal } = this.props;
      let { passed } = this.state;

      return[
        <div key="1" className="App-intro__content__in">
          <h2 className="u-text-font__light">Thank you for registration!</h2>
          <hr className="u-my-3"/>
          <p className='u-mt-5'>Your promo code: </p>
          <div className={'f f-align-1-2 u-my-2'} >
            <textarea className={'App-intro__content-copy'} disabled value={keyVal} />
            <button className="btn btn-primiry" onClick={this.copy}> COPY </button>
          </div>
          <p>This promo code gives you the opportunity to get a discount on this category of goods up to $50.</p>
        </div>,
        <div key="2" className="App-intro__content__in">
          <p>Enter your promo code: </p> 
          <TxForm submit={this.onSubmit} innerErrorFielsType={true} formClass="App-intro__form">
      
              <TxInput tag="input" type="text" name="keyVal" validate={[{ minLength: 10 }, "required"]} className="field-block u-my-3" placeholder="number" />

              <TxInput type="submit" autoValidate={false} value="CHECK" style={{ float: "right" }} className={"submit-post btn btn-primiry"} />
          </TxForm>
          { passed !== undefined &&  passed === false  && 
            <p className={"App-intro__content__nofound"} >NO FOUND</p> 
          }
          { passed !== undefined &&  passed === true  && 
            <p className={"App-intro__content__passed"}>PASSED</p> 
          }
        </div>]
    }
  }




  const RoutePassProps = ({ component: Component, redirect, ...rest }) =>
  (!redirect
    ? <Route {...rest} render={props => <Component {...props} {...rest} />} />
    : <Redirect to={`${redirect}`} />);