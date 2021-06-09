import { Form, Input, Button, message } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { postLogin } from '../utils';

class Login extends React.Component {

    onLoginFormSubmit = (formData) => { 
        postLogin(formData)
            .then((res) => {
                if (res.status === 200) {
                    const { data } = res;  
                    const userAuth = {
                        token: data.jwtToken,
                        firstname: data.firstName,
                        userid: data.id,
                    }
                    this.props.onLoggedIn(userAuth)
                    message.success("Login succeed! ");
                }
            })
            .catch((err) => {
                console.log("login failed: ", err.message);
                message.error("Login failed! ");
            });
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
                            <Form.Item 
                                name="email" 
                                rules={[{ required: true, message: 'Please enter your usename!' }]}>
                                <Input placeholder="" />
                            </Form.Item>

                            <p className="login-form-input-title" id="login-password-title">Password</p>
                            <Form.Item 
                                name="password" 
                                rules={[{ required: true, message: 'Please enter your password!' }]}>
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