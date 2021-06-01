import { Form, Input, Button, Modal, message } from 'antd';
import React from 'react';

class Register extends React.Component {
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

    handleLoginLinkClicked = () => {
        this.hideModal();
        this.props.clickLogin();
    }

    render = () => {
        return (
            <>
                <Button id="register-btn" type="text" onClick={this.showModal} style={{ marginRight: '40px' }}>Register</Button>
                <Modal
                    className="register-modal"
                    title="Register"
                    visible={this.state.isModalVisible || this.props.showModal}
                    distroyOnClose={true}
                    maskClosable={true}
                    closable={false}
                    onCancel={this.hideModal}
                    footer={null}
                    okText={"Login"}
                    width={328}
                >
                    <Form className="register-form" onFinish={this.onFinish}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <p>First name</p>
                                <Form.Item className="register-first-name" name="first-name" rules={[{ required: true, message: 'Please enter your first name!' }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <p>Last name</p>
                                <Form.Item className="register-last-name" name="last-name" rules={[{ required: true, message: 'Please enter your last name!' }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                        </div>
                        <p>Email</p>
                        <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please enter your email!' }]}>
                            <Input placeholder="" />
                        </Form.Item>
                        <p>Username</p>
                        <Form.Item name="username" rules={[{ required: true, message: 'Please enter your usename!' }]}>
                            <Input placeholder="" />
                        </Form.Item>
                        <p>Password</p>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                            <Input.Password placeholder="" />
                        </Form.Item>
                        <Form.Item>
                            <Button className="register-form-btn" type="primary" htmlType="submit">Register</Button>
                        </Form.Item>
                    </Form>
                    <div>I have an account, <span onClick={this.handleLoginLinkClicked} className="link-to-login">Login</span></div>
                </Modal>
            </>
        );


    }
}

export default Register;