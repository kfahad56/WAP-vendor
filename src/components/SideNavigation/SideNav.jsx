/* eslint-disable */
import React, { Component } from 'react';
import user from '../images/user.png';
import './SideNav.css';
import { NavLink } from 'react-router-dom';
import close from '../../components/images/close.png';
// import user from '../images/userwhite';
import userWhite from '../images/userWhite.png';
import { CSSTransitionGroup } from 'react-transition-group';

import * as Cookie from 'js-cookie'
import * as base from '../../Apis/base'

class SideNav extends Component {
    state = {
        menuActive: false,
    }
    render() {
        console.log(this.props.activeName);

        return (

            <div className="SideNavbar">
                <div className="closeButtonContainer" onClick={this.props.close}>
                    <img src={close} alt="" />
                </div>

                {this.props.SignIn ? (<NavLink to="/login"><div className="UserProfile">
                    <div className="userImage">
                        <img src={userWhite} alt="" />
                    </div>
                    <div className="signInText">{Cookie.get(base.customerName)}</div>
                </div></NavLink>) :
                    <NavLink to="/login"><div className="UserProfile1">
                        <div className="userImage">
                            <img src={user} alt="" />
                        </div>
                        <div className="signInText">Sign-in</div>
                    </div></NavLink>}
                {/* {this.props.SignIn && <NavLink to="/login"><div className="UserProfile1">
                    <div className="userImage">
                        <img src={user} alt="" />
                    </div>
                    <div className="signInText">Sign-in</div>
                </div></NavLink>}
                {this.props.activeName && <div className="UserProfile">
                    <div className="afterSignInContainer">
                        <div className="userImage">
                            <img src={userWhite} alt="" />
                        </div>
                    </div>
                </div>}
                 */}
                <div className="SideBarItems">
                    <ul>
                        <NavLink to="/search"><li>Search</li></NavLink>
                        <NavLink to="/aboutus"><li>About Us</li></NavLink>
                        <NavLink to="/blogs"><li>Blogs</li></NavLink>
                        <NavLink to="/faq"><li>FAQ's</li></NavLink>
                        <NavLink to="/contact"><li>Contact Us</li></NavLink>
                    </ul>

                </div>
            </div>
        );
    }
}

export default SideNav;