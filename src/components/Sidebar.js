import React from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom';
import dashboard from './../img/dashboard.png';
import account from './../img/account.png';
import faq from './../img/faq.png';
import NavLink from "./NavLink.js";

class Sidebar extends React.Component{

    render(){
        return(<div className="f f-align-13-2 f-col App__sidebar ">
              <ul className="f f-align-1-1 f-col App__sidebar-menu">
                <NavLink
                  tabIndex='1'
                  className={"f f-align-1-2 App__sidebar-menu__item App__sidebar-menu__item__level-1"}
                  to={{
                    pathname: `${process.env.REACT_APP_BUILD ? '/system/dashboard' : '/dashboard' }` ,
                    state: {  }
                  }}
                >
                  <span className={"f f-align-2-2 App__sidebar-menu__item__icon"}>
                    <img src={dashboard} />
                  </span>
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                    tabIndex='1'
                    className={ "f f-align-1-2 App__sidebar-menu__item App__sidebar-menu__item__level-1" }
                    to={{
                    pathname:  `${process.env.REACT_APP_BUILD ? '/system/dashboard/account' : '/dashboard/account'}`,
                    state: {  }
                    }}>
                    <span className={"f f-align-2-2 App__sidebar-menu__item__icon"}>
                    <img src={account} />
                    </span>
                    <span>Account</span>
                </NavLink>
                <div className="App__sidebar-menu__delimiter" />
              </ul>
              <div className="App__sidebar-copyright" ><p className="u-mx-2">By using our website and/or services, you agree to our <a target="_blank" href="https://comin.co/terms-of-service/">Terms of Service</a> and <a target="_blank" href="https://comin.co/privacy-policy/">Privacy Policy</a>.</p> <p className="u-mx-2 u-mb-2 u-mt-1">Copyright © 2018 Comin. All Rights Reserved.</p></div>
            </div>
        )
    }
}

export default withRouter(Sidebar)