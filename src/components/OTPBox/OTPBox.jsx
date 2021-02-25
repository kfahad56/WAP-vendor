import React, { Component } from 'react';
import './otpbox.css';
import close from '../../components/images/close.png';
import $ from 'jquery';

import * as OtpApi from '../../Apis/Otp'
class OPTBox extends Component {
    state = {
        matches: window.matchMedia("(min-width: 480px)").matches,
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
        digit5: "",
        digit6: "",
        token: "",
        error: "",
        success: ""
    }
    componentDidMount() {
        $('.otpAdjustContainer').find('input').each(function () {
            $(this).attr('maxlength', 1);
            $(this).on('keyup', function (e) {
                var parent = $($(this).parent());

                if (e.keyCode === 8 || e.keyCode === 37) {
                    var prev = parent.find('input#' + $(this).data('previous'));

                    if (prev.length) {
                        $(prev).select();
                    }
                } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                    var next = parent.find('input#' + $(this).data('next'));

                    if (next.length) {
                        $(next).select();
                    } else {
                        if (parent.data('autosubmit')) {
                            parent.submit();
                        }
                    }
                }
            });
        });
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 480px)").addListener(handler);
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value, error: '', success: '' })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ token: nextProps.token })
    }

    handleSubmit = () => {
        let otp = "" + this.state.digit1 + this.state.digit2 + this.state.digit3 + this.state.digit4 + this.state.digit5 + this.state.digit6
        let otpManager = new OtpApi.OTP({
            token: this.props.token,
            fingerprint: this.props.token,
            otp: otp
        })

        OtpApi.verifyOtp(
            otpManager,
            () => {
                this.setState({ success: "Successful" })
            },
            (data) => {
                this.setState({
                    error: data
                })
            }
        )
    }

    resendOTP = () => {
        // let otp = "" + this.state.digit1 + this.state.digit2 + this.state.digit3 + this.state.digit4 + this.state.digit5 + this.state.digit6
        let otpManager = new OtpApi.OTP({
            token: this.props.token,
        })

        OtpApi.resendOtp(
            otpManager,
            () => { this.setState({ success: "Successful" }) },
            () => { alert('error') }
        )
    }

    render() {
        return (
            <div>
                {!this.state.matches && (<React.Fragment>
                    <div className="optBoxContainer1" >
                        <div className="closeButtonContainer" onClick={this.props.close}>
                            <img src={close} alt="" />
                        </div>
                        <div className="loginHeadText">Help us Verify !!</div>
                        <p>
                            Please enter the 6 digit OTP sent on your registered mobile no.
                </p>
                        <div className="otpAdjustContainer" method="get" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                            <input type="text" id="digit-1" name="digit1" data-next="digit-2" onChange={this.handleChange} />
                            <input type="text" id="digit-2" name="digit2" data-next="digit-3" data-previous="digit-1" onChange={this.handleChange} />
                            <input type="text" id="digit-3" name="digit3" data-next="digit-4" data-previous="digit-2" onChange={this.handleChange} />
                            <div className="divideBorder"></div>
                            <input type="text" id="digit-4" name="digit4" data-next="digit-5" data-previous="digit-3" onChange={this.handleChange} />
                            <input type="text" id="digit-5" name="digit5" data-next="digit-6" data-previous="digit-4" onChange={this.handleChange} />
                            <input type="text" id="digit-6" name="digit6" data-previous="digit-5" />
                        </div>
                        <div className="resendText" onClick={() => this.resendOTP()}>Re-send OTP</div>
                        <div className="proceedButton" onClick={() => this.handleSubmit()}>
                            <div className="btnText">Submit</div>
                        </div>
                    </div>
                </React.Fragment>)}
                {this.state.matches && (<React.Fragment>
                    <div className="optBoxContainer" >
                        <div className="closeButtonContainer" onClick={this.props.close}>
                            <img src={close} alt="" />
                        </div>
                        <div className="loginHeadText">Help us Verify !!</div>
                        <p>
                            Please enter the 6 digit OTP sent on your registered mobile no.
                </p>
                        <div className="otpAdjustContainer" method="get" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                            <input type="text" id="digit-1" name="digit-1" data-next="digit-2" onChange={(e) => this.handleChange('digit1', e.target.value)} />
                            <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" onChange={(e) => this.handleChange('digit2', e.target.value)} />
                            <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" onChange={(e) => this.handleChange('digit3', e.target.value)} />
                            <div className="divideBorder"></div>
                            <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" onChange={(e) => this.handleChange('digit4', e.target.value)} />
                            <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" onChange={(e) => this.handleChange('digit5', e.target.value)} />
                            <input type="text" id="digit-6" name="digit-6" data-previous="digit-5" onChange={(e) => this.handleChange('digit6', e.target.value)} />
                        </div>
                        <div className="resendText" onClick={() => this.resendOTP()}>Re-send OTP</div>
                        <div className="error">{this.state.error}</div>
                        <div className="success">{this.state.success}</div>
                        <div className="proceedButton">
                            <div className="btnText" onClick={() => this.handleSubmit()}>Submit</div>
                        </div>
                    </div>
                </React.Fragment>)}

            </div>

        );
    }
}

export default OPTBox;