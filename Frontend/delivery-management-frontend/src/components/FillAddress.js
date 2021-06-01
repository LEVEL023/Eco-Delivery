import React, { useState, useRef } from 'react';

import { Steps, Button, message, Form, Input, Checkbox, Row, Col } from 'antd';

const { Step } = Steps;

const steps = [
  {
    title: 'Sender Address',
    content: 'First-content',
  },
  {
    title: 'Receipient Address',
    content: 'Second-content',
  },
  {
    title: 'Review Order',
    content: 'Last-content',
  },
];

const FillAddress = (props) => {
  const [current, setCurrent] = useState(0);
  const [sender, setSender] = useState({});
  const [receipent, setReceipent] = useState({});
  const senderFirstName = useRef(null);
  const senderLastName = useState(null);
  const senderPhone = useState(null);
  const senderEmail = useState(null);
  const senderAddress = useState(null);
  const senderZipcode = useState(null);

  const receipentFirstName = useRef(null);
  const receipentLastName = useState(null);
  const receipentPhone = useState(null);
  const receipentEmail = useState(null);
  const receipentAddress = useState(null);
  const receipentZipcode = useState(null);
  

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div style = {{margin : "auto", marginTop : "80px", width: "90%"}}>
        <div style = {{display:"flex"}}>
            <Steps current={current} direction="vertical" style = {{flex : "1 1 0"}}>
                {steps.map(item => (
                <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            { current === 0 && <div className="steps-content">{
                // sender address
                <div  style = {{marginLeft : "50px", marginRight : "50px"}}>
                    <Input.Group size="medium">
                        <Row gutter={15}>
                            <Col span={12}>
                                First Name
                            <Input defaultValue="" ref = {senderFirstName} />
                            </Col>
                            <Col span={12}>
                                Last Name
                                <Input defaultValue="" ref = {senderLastName}/>
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={15}>
                            <Col span={12}>
                                Phone
                            <Input defaultValue="" ref = {senderPhone}/>
                            </Col>
                            <Col span={12}>
                                Email
                                <Input defaultValue="" ref = {senderEmail} />
                            </Col>
                        </Row>
                        <br />
                        <Col span = {24}>
                            Address line
                            <Input defaultValue = "" ref = {senderAddress}/>
                        </Col>
                        <br />
                        <br />
                        <Col span = {24}>
                            Zip Code
                            <Input defaultValue = "" ref = {senderZipcode}/>
                        </Col>
                    </Input.Group>
                    <br />
                </div>
                
            }</div> }
            { current === 1 && <div className="steps-content" >{
                // receipent address
                <div  style = {{marginLeft : "50px", marginRight : "50px"}}>
                    <Input.Group size="medium">
                        <Row gutter={15}>
                            <Col span={12}>
                                First Name
                            <Input defaultValue=""  ref = {receipentFirstName}/>
                            </Col>
                            <Col span={12}>
                                Last Name
                                <Input defaultValue="" ref = {receipentLastName} />
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={15}>
                            <Col span={12}>
                                Phone
                            <Input defaultValue="" ref = {receipentPhone} />
                            </Col>
                            <Col span={12}>
                                Email
                                <Input defaultValue="" ref = {receipentEmail} />
                            </Col>
                        </Row>
                        <br />
                        <Col span = {24}>
                            Address line
                            <Input defaultValue = "" ref = {receipentAddress} />
                        </Col>
                        <br />
                        <br />
                        <Col span = {24}>
                            Zip Code
                            <Input defaultValue = "" ref = {receipentZipcode} />
                        </Col>
                    </Input.Group>
                    <br />
                </div>
            }</div> }
            { current === 2 && <div className="steps-content">{
                // Review Order
                <div style = {{marginLeft : "50px", marginRight : "50px", fontSize : "16px"}}>
                    <div className = "review-content" >
                        <div className = "one">
                            From:
                        </div>
                        <div className = "two">
                            {sender.name} <br/>
                            {sender.address} <br/>
                            {sender.phone} <br/>
                            {sender.email} <br/>
                        </div>
                    </div>
                    <br />
                    <div className = "review-content">
                        <div className = "one">
                            To:
                        </div>
                        <div className="two">
                            {receipent.name} <br/>
                            {receipent.address} <br/>
                            {receipent.phone} <br/>
                            {receipent.email} <br/>
                        </div>
                    </div>
                    <br />

                    <div className = "review-content">
                        <div className = "one">
                            Delivery Method:
                        </div>
                        <div className="two">
                            Drone
                        </div>
                    </div>

                    <div className = "review-content">
                        <div className = "one">
                            Delivery By:
                        </div>
                        <div className="two">
                            May 21 2021
                        </div>
                    </div>

                    <div className = "review-content">
                        <div className = "one">
                            Payment Total:
                        </div>
                        <div className="two">
                            100 USD
                        </div>
                    </div>
                </div>

            }</div> }
        </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button style = {{backgroundColor : "green"}} type="primary" onClick={
              () => {
                  // store refs to sender state and receipient state
                  if (current === 0) {
                      const curSender = {
                        name : senderFirstName.current.state.value + ' ' + senderLastName.current.state.value,
                        address: senderAddress.current.state.value,
                        phone : senderPhone.current.state.value,
                        email : senderEmail.current.state.value
                      }
                    setSender(curSender);
                  } else if (current === 1) {
                    const curRecipent = {
                        name : receipentFirstName.current.state.value + ' ' + receipentLastName.current.state.value,
                        address: receipentAddress.current.state.value,
                        phone : receipentPhone.current.state.value,
                        email : receipentEmail.current.state.value
                    }
                    setReceipent(curRecipent);
                  }
                  next();
                }
            }>
            Continue
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button style = {{backgroundColor : "green"}} type="primary" onClick={
                () => {
                    console.log(sender);
                    console.log(receipent);
                    message.success('Processing complete!')
                }
            }>
            Submit
          </Button>
        )}
        {current > 0 && (
          <Button style = {{backgroundColor : "green"}} style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default FillAddress;