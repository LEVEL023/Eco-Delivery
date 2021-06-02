import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';

const { Option } = Select;

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

const Form3 = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form className="Form_Address" name="complex-form" onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          
      <Form.Item label="Address 1">
        <Input.Group compact>
                    
          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input style={{ width: '100%' }} placeholder="Input street" />
          </Form.Item>

        </Input.Group>
      </Form.Item>

      <Form.Item label="Address 2">
        <Input.Group compact>
                    
          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input style={{ width: '100%' }} placeholder="Input street" />
          </Form.Item>

        </Input.Group>
      </Form.Item>

       <Form.Item label=" " colon={false} wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
        <Button type="primary" htmlType="submit" className="SaveButton3">
          Save
        </Button>
      </Form.Item>

    </Form>
  );
};

// ReactDOM.render(<Demo />, mountNode);

export default Form3;
