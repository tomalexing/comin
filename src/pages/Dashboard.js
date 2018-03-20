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
import items from './../products.js';
import Modal from './../components/Modal.js';

const prod = process.env.REACT_APP_BUILD;
const paths = {
  account: prod ? '/system/dashboard/account/' : '/dashboard/account',
  dashboard:  prod ? '/system/dashboard/' : '/dashboard'
}

class Dashboard extends Component{
  
  
  constructor(props) {
    super(props);
    this.state = { keyVal: props.location.state && props.location.state.keyVal != undefined ? props.location.state.keyVal : '', prod: props.location.state && props.location.state.prod != undefined ? props.location.state.prod : ''};
    this.close = this.close.bind(this);
  }
  
    componentDidMount(){
      let _self = this;
      Api.auth().onAuthStateChanged((user) => {
        if(_self.state.keyVal === '' || ! ('basicModal' in _self.state)){
          let { uid } = user ;
  
          Api.getRef(`users/${uid}`).once('value')
          .then(snapshot => {
            let {keyVal, prod, visited} = snapshot.val() || {keyVal: null};
            _self.setState({keyVal, prod, uid, basicModal: !visited})
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

    close(){
      let { keyVal, prod, basicModal, uid } = this.state;

      // close popup
      this.setState({ basicModal: false });
      

      // renew data with in user first visiting
      let visited = true;
      Api.getRef(`users/${uid}`).set({keyVal, prod, visited});
    }

    render(){
        let { keyVal, prod, basicModal } = this.state;
        return (
          <div className="App Layout-app">
            <Header prod={prod} />
            <div className="App-intro">
              <Sidebar/>
              <div className="App-intro__content">
                <Switch>
                  <RoutePassProps
                    exact
                    path={paths.dashboard}
                    component={Dash}
                    keyVal={keyVal}
                    prod={prod}
                    />
                  <RoutePassProps
                    exact
                    path={paths.account}
                    component={Account}
                    prod={prod}
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
            <Modal className="fade" show={basicModal} onHide={this.close}>
                <Modal.Header>
                    <h2 className="">You are awesome!</h2>
                </Modal.Header>
                <Modal.Body>
                    <p> Thank you for your registration, we appreciate your participation in our beta testing! </p>

                    <p>Comin is in beta version, which means, that the software’s code is still under development and is not at the level of performance or compatibility of a final, generally available product offering. Software may have limited functionality and may be substantially modified prior to full release of the product. </p>

                    <p>However, for your participation we grant you a certification code, which you will be able to use after the launch of Comin System. Certification code will provide you with a discount for further purchases via Comin and/or a one time discount for a certain category of goods.</p>
                    <br/>
                    <textarea style={{width: '100%'}} className={'App-intro__content-copy'} disabled value={'CODE: ' + keyVal } />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={this.close}>Close</button>
                </Modal.Footer>
            </Modal>
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
        console.trace(err.stack);
      }
    }

    render(){
      let {photoURL, displayName, email, uid} = this.state;
      let { prod } = this.props;
      if(prod != "no-ref"){
        prod = 'cominsystem' + prod;
      }
      if(prod === "no-ref"){
        prod = '';
      }

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
            <textarea style={{width: '100%'}} className={'App-intro__content-copy'} disabled value={'https://comin.co/' + prod} />
            <button className="btn btn-primary" onClick={this.copy}> COPY </button>
          </div>
        </div>]
    }
  }
  
class Dash extends Component{
    constructor(props) {
      super(props);      
      this.state = { prod: '', passed: undefined };
      this.onSubmit = this.onSubmit.bind(this);
      this.copy = this.copy.bind(this);
    }

    componentWillReceiveProps(newProps){
      let {keyVal, prod} = newProps;
      if(keyVal != this.props.keyVal){
        this.setState({keyVal})
      }
      if(prod != this.props.prod){
        this.setState({prod})
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
      Api.getRef('users').orderByChild('keyVal').equalTo(keyVal).once('value')
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
        console.trace(err.stack);
      }
    }

    getDiscount(productId){
      let product = items.filter( p => ( p.productId === productId))
      if( product.length > 0)
        return product[0].saleAmount
      return '...'
    }

    render(){
      let { keyVal, prod } = this.props;
      let { passed } = this.state;

      
      return[
        <div key="1" className="App-intro__content__in">
          <h2 className="u-text-font__light">Thank you for registration!</h2>
          <hr className="u-my-3"/>
          <p className='u-mt-5'>Your promo code: </p>
          <div className={'f f-align-1-2 u-my-2 f-wrap'} >
            <textarea className={'App-intro__content-copy'} disabled value={keyVal} />
            <button className="btn btn-primary" onClick={this.copy}> COPY </button>
          </div>
          <p>However, for your participation we grant you a certification code, which you will be able to use after the launch of Comin System. Certification code will provide you with a discount up to {`${this.getDiscount(prod)}`} for further purchases via Comin and/or a one time discount for a certain category of goods.</p>
        </div>,
        <div key="2" className="App-intro__content__in">
          <p>Enter your promo code: </p> 
          <TxForm submit={this.onSubmit} innerErrorFielsType={true} formClass="App-intro__form">
      
              <TxInput tag="input" type="text" name="keyVal" validate={[{ minLength: 10 }, "required"]} className="field-block u-my-3" placeholder="number" />

              <TxInput type="submit" autoValidate={false} value="CHECK" style={{ float: "right" }} className={"submit-post btn btn-primary"} />
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