import React, { Component } from 'react';
import './footer.css';
import TextField from '@material-ui/core/TextField';
import submitArrow from '../../components/images/send.png';
import { NavLink } from 'react-router-dom';
class Footer extends Component {
    state = {}
    render() {
        return (
            <div className="footerContainer">
                <div className="rightSection">
                    <div className="upperSection">
                        <div className="linksContainer">
                            <h3>Company</h3>
                            <ul>
                                <NavLink to="/location"><li>Location</li></NavLink>
                                <NavLink to="/aboutus"><li>About</li></NavLink>
                                <NavLink to="/testimonial"><li>Testimonials</li></NavLink>
                                <NavLink to="/carrer"><li>Careers</li></NavLink>
                                <NavLink to="/newsroom"><li>NewsRoom</li></NavLink>
                                <NavLink to="/faq"><li>FAQ's</li></NavLink>
                            </ul>
                        </div>
                        <div className="linksContainer linksAdjust2">
                            <h3>Partners</h3>
                            <ul>
                                <NavLink to="/vendorlogin"><li>Register</li></NavLink>
                                <li>Login</li>
                            </ul>
                        </div>
                        <div className="linksContainer linksAdjust3">
                            <h3>Legal</h3>
                            <ul>
                                <li>Privacy</li>
                                <li>Terms</li>
                                <li>Cookies</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lowerSection">
                        <div className="lowerText mobLowerTextAdjust">
                            <div></div>
                            <div>36, Mohan Nagar, Durg (Chhattisgarh) - 491001</div>
                        </div>
                        <div className="lowerText numberAdjust"><a href="tel: +91 8368844232">+91 8368844232</a></div>
                    </div>
                </div>
                <div className="middleSection">Copyright Hubshub Technology Services India Private Limited</div>
                <div className="leftSection">
                    <div className="subscribeContainer">
                        <div className="socicalMediaText">Follow us</div>
                        <div className="socialMediaContainer">
                            <div class="fab fa-facebook-f"></div>
                            <div class="fab fa-instagram"></div>
                            <div class="fab fa-twitter"></div>
                        </div>
                        <div className="subscribeHeadingText">Subscribe to our mailing list</div>
                        <div className="subscribeInputContainer">
                            <TextField
                                required
                                id="outlined-full-width"
                                label="Email-id"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <div className="rightArrowContainer">
                                <img src={submitArrow} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;