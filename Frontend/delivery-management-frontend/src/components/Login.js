import { Form, Input, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { Link } from 'react-router-dom';
import {TOKEN_KEY} from '../constants';

class Login extends React.Component {


    onLoginFormSubmit = (formData) => { 
        const { username, password } = formData;
        const fakeToken = {
            token: '123',
            firstname: 'Jane',
            userid: '1',
        }
        this.props.onLoggedIn(fakeToken)
        // const opt = {
        //     method: 'post',
        //     url: `${BASE_URL}/signin`,
        //     data: {
        //         username: username,
        //         password: password
        //     },
        //     headers: { "Content-Type": "application/json"}
        // };
        // axios(opt)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             const { responseData } = res;  
        //             this.props.handleLoggedin(responseData);
        //             message.success("Login succeed! ");
        //         }
        //     })
        //     .catch((err) => {
        //         this.hideModal();
        //         this.props.onLoginFailed();
        //         console.log("login failed: ", err.message);
        //         message.error("Login failed! ");
        //     });
    }

    render = () => {
        return (
            <div className="main-background" >
                <div className="login-container" >
                    <h1 className="login-title">Login</h1>
                    <Form  
                        className="login-form" 
                        onFinish={this.onLoginFormSubmit}>
                            <p className="login-form-input-title">Email</p>
                            <Form.Item name="usename" rules={[{ required: true, message: 'Please enter your usename!' }]}>
                                <Input placeholder="" />
                            </Form.Item>
                            <p className="login-form-input-title" id="login-password-title">Password</p>
                            <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                                <Input.Password placeholder="" />
                            </Form.Item>
                            <Form.Item className="login-form-btn-item">
                                <Button className="login-form-btn" type="primary" htmlType="submit">Login</Button>
                            </Form.Item>
                            <p id="no-account-link">I don't have an account, <Link to="/register">Register</Link></p>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login;