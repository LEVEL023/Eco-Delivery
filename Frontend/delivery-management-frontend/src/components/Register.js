import { Form, Input, Button, message } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { postRegister } from '../utils';

class Register extends React.Component {

    onRegisterFormSubmit = (formData) => {
        postRegister(formData)
            .then((res) => {
                if (res.status === 200) {
                    const { data } = res;  
                    const userAuth = {
                        token: data.jwtToken,
                        firstname: data.firstName, 
                        userid: data.id,
                    }
                    this.props.onRegistered(userAuth)
                    message.success("Register succeed! ");
                }
            })
            .catch((err) => {
                console.log("Register failed: ", err.message);
                message.error("Register failed! ");
            });
    }

    render = () => {
        return (
            <div className="main-background" >
                <div className="register-container" >
                    <h1 className="register-title">Create a new account</h1>
                    <Form 
                        className="register-form" 
                        onFinish={this.onRegisterFormSubmit}>
                        <div className="first-last-names-container">
                            <div className="first-name-container">
                                <p>First name</p>
                                <Form.Item 
                                    className="register-first-name" 
                                    name="firstName" 
                                    rules={[{ required: true, message: 'required' }]}>
                                    <Input/>
                                </Form.Item>
                            </div>
                            <div className="last-name-container">
                                <p>Last name</p>
                                <Form.Item 
                                    className="register-last-name" 
                                    name="lastName" 
                                    rules={[{ required: true, message: 'required' }]}>
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <p>Email</p>
                        <Form.Item 
                            name="email" 
                            rules={[{ required: true, type: 'email', message: 'required' }]}>
                            <Input />
                        </Form.Item>

                        <p>Password</p>
                        <Form.Item 
                            name="password" 
                            rules={[{ required: true, message: 'required' }]}>
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                className="register-form-btn" 
                                type="primary" 
                                htmlType="submit">Register</Button>
                        </Form.Item>
                    </Form>
                    <div>I have an account, <Link to='/login'>Login</Link></div>
                </div>
            </div>
        )
    }
}

export default Register;