import { Form, Input, Button, Modal, message } from 'antd';
import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

class Login extends React.Component {

    state = {
        isModalVisible: false,
    }

    hideModal = () => {
        this.setState({
            isModalVisible: false,
        })
        this.props.closeAlert();
    }

    showModal = () => {
        this.setState({
            isModalVisible: true,
        })
    }

    // parameter formData is the object captured by the form component, in the format below:
    // {
    //     username: xxx,
    //     password: xx
    // }
    // this function will send http request to server
    // the response message should contain a success or failure status, and username
    // when sucess response is received, return TOKEN and FIRSTNAME to parent component (Header) using callback
    // when failure response is received, display an error message
    onFinish = (formData) => {
        const { username, password } = formData;
        const opt = {
            method: 'post',
            url: `${BASE_URL}/signin`,
            data: {
                username: username,
                password: password
            },
            headers: { "Content-Type": "application/json"}
        };
        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    const { responseData } = res;  
                    this.hideModal();
                    this.props.onLoginSuccess(responseData);
                    message.success("Login succeed! ");
                }
            })
            .catch((err) => {
                this.hideModal();
                this.props.onLoginFailed();
                console.log("login failed: ", err.message);
                message.error("Login failed! ");
            });
    }

    handleRegisterLink = () => {
        this.hideModal();
        this.props.clickRegister();
    }

    render = () => {
        return (
            <>
                <Button id="login-btn"
                        type="text" 
                        onClick={this.showModal}>Login</Button>
                <Modal
                    className="login-modal"
                    title="Login"
                    visible={this.state.isModalVisible || this.props.showModal}
                    distroyOnClose={true}
                    maskClosable={true}
                    closable={false}
                    onCancel={this.hideModal}
                    footer={null}
                    okText={"Login"}
                    width={328}
                >
                    <Form className="login-form" onFinish={this.onFinish}>
                        <p className="login-form-input-title">Username</p>
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
                        <p id="no-account-link">I don't have an account, <span className="link-to-register" onClick={this.handleRegisterLink}>Register</span></p>
                    </Form>
                </Modal>
            </>
        )


    }
}

export default Login;