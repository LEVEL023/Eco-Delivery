import { Form, Input, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { Link } from 'react-router-dom';

class Register extends React.Component {

    onRegisterFormSubmit = (formData) => {
        console.log(formData)
        // const opt = {
        //     method: 'post',
        //     url: `${BASE_URL}/signin`,
        //     data: formData,
        //     headers: { "Content-Type": "application/json"}
        // };
        // axios(opt)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             const { responseData } = res;  
        //             this.hideModal();
        //             this.props.onLoginSuccess(responseData);
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
                <div className="register-container" >
                    <h1 className="register-title">Create a new account</h1>
                    <Form className="register-form" onFinish={this.onRegisterFormSubmit}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <p>First name</p>
                                <Form.Item className="register-first-name" name="first-name" rules={[{ required: true, message: 'required' }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <p>Last name</p>
                                <Form.Item className="register-last-name" name="last-name" rules={[{ required: true, message: 'required' }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                        </div>
                        <p>Email</p>
                        <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'required' }]}>
                            <Input placeholder="" />
                        </Form.Item>
                        <p>Username</p>
                        {/* <Form.Item name="username" rules={[{ required: true, message: 'required' }]}>
                            <Input placeholder="" />
                        </Form.Item> */}
                        <p>Password</p>
                        <Form.Item name="password" rules={[{ required: true, message: 'required' }]}>
                            <Input.Password placeholder="" />
                        </Form.Item>
                        <Form.Item>
                            <Button className="register-form-btn" type="primary" htmlType="submit">Register</Button>
                        </Form.Item>
                    </Form>
                    <div>I have an account, <Link to='/login'>Login</Link></div>
                </div>
            </div>
        )
    }
}

export default Register;