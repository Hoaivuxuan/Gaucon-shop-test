import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { Button } from 'reactstrap';
//
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'vuxuanhoai',
            password: '123456',
        }
    }

    handleOnChangeInput = (event) => {
        console.log(event.target.value)
    }

    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 username'>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Email'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeInput(event)}
                            ></input>
                            <span id="errorEmailText" class="errorEmailText"></span>
                        </div>
                        <div className='col-12 password'>
                            <input type='password' className='form-control' placeholder='Password'></input>
                            <span id="errorPassText" class="errorPassText"></span>
                        </div>
                        <div className='col-12'>
                            <button className="col-12 btn-login btn-login-form" type="submit" value="login">Login</button>
                        </div>
                        <div className='col-12 forgot-text'>
                            <a className='f-text' href='/'>Forgot password</a>
                        </div>
                        <div className='col-12 note-text'>
                            <span className='or-text'>Or login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <div className='login-google'>
                                <FontAwesomeIcon className='google' icon={faGoogle}/> 
                            </div>
                            <div className='login-facebook'>
                                <FontAwesomeIcon className='facebook' icon={faFacebook}/>   
                            </div>
                        </div>
                        <div className='register'>
                            Don't have an account yet?
                            <a className='create-acc' href='/'> Create one here!</a>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
