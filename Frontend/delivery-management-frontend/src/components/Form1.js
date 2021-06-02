import React from "react";
// import ReactDOM from "react-dom";
import { Form, Input, InputNumber, Button } from 'antd';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    // number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Form1 = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} 
    name="nest-messages" 
    onFinish={onFinish} 
    validateMessages={validateMessages}
    className="Form_Password">
      
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
        <Button type="primary" htmlType="submit" className="EditButton1">
          Edit
        </Button>
        <Button 
            type="primary" 
            className="SaveButton1" 
            style={{
                margin: '0 30px', 
            }}>
          Save
        </Button>
      </Form.Item>

      <Form.Item
        name={['user', 'name']}
        label="Username"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item> */}

      {/* <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item> */}

      {/* <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item> */}

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
        <Button type="primary" htmlType="submit" className="EditButton2">
          Edit
        </Button>
        <Button 
            type="primary" 
            className="SaveButton2" 
            style={{
                margin: '0 30px',
            }}>
          Save
        </Button>
      </Form.Item>

    </Form>
  );
};

// ReactDOM.render(<Demo />, mountNode);

export default Form1;
