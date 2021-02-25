import React, { Component } from 'react';
import './header.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import userWhite from '../images/userWhite.png';
import { NavLink } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import SideNav from '../SideNavigation/SideNav';

import * as Cookie from 'js-cookie'
import { customerName, public_url } from '../../Apis/base'
class Header extends Component {
    state = {
        menuActive: false,
        displayed: false,
    }
    componentDidMount() {
        window.onscroll = function () { myFunction() };

        var navbar = document.getElementById("navbar");
        var sticky = navbar.offsetTop;

        function myFunction() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }
    }
    toggleMenu = () => {
        let menuState = !this.state.menuActive;
        this.setState({
            menuActive: menuState
        });
    }

    render() {
        const Yes = () => {
            return window.location.replace(`${public_url}logout`);
        };
        let menu;
        if (this.state.menuActive) {
            menu = <div className="dropDownTextContainer">
                <NavLink to="/customerdashboard"><div>View Profile</div></NavLink>
                <div onClick={() => Yes()}>Sign-Out</div>
            </div>
        } else {
            menu = "";
        }
        return (
            <div className="HeaderContainer" id="navbar">
                <div className="logoContainer">
                    <NavLink to="/"><img src={logo} alt="" /></NavLink>
                </div>
                <div class="fas fa-bars adjustBars" onClick={() => this.setState({
                    ...this.state,
                    displayed: true
                })}>

                </div>
                {this.state.displayed ?
                    <SideNav
                        close={() => {
                            this.setState({ ...this.state, displayed: false })
                        }
                        }
                    /> : null}
                <div className="navbarContainer">
                    <ul>
                        <NavLink to="/search"><li>Search</li></NavLink>
                        <NavLink to="/aboutus"><li>About Us</li></NavLink>
                        <NavLink to="/blogs"><li>Blogs</li></NavLink>
                        <NavLink to="/faq"><li>FAQ's</li></NavLink>
                        <NavLink to="/contact"><li>Contact Us</li></NavLink>
                    </ul>

                </div>
                {this.props.SignIn && <NavLink to="/login"><div className="signInContainer">
                    <div className="userImage">
                        <img src={user} alt="" />
                    </div>
                    <div className="signInText">Sign-in</div>
                </div></NavLink>}
                {this.props.activeName && <div className="profileButtonContainer">
                    <div className="afterSignInContainer" onClick={() => this.toggleMenu()}>
                        <div className="userImage">
                            <img src={userWhite} alt="" />
                        </div>
                        <div className="signInText">{Cookie.get(customerName)}</div>
                    </div>
                    <div className="dropDownContainer">
                        <CSSTransitionGroup
                            transitionName="menu"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            {menu}
                        </CSSTransitionGroup>
                    </div>
                </div>}
            </div>
        );
    }
}

export default Header;