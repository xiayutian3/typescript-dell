import { Form, Input, Button ,message} from "antd";
import { LockOutlined } from "@ant-design/icons";
//版本更新后并没有这个
// import {WrappedFormUtils} from 'antd/lib/form/Form'

import axios from "axios";
import qs from "qs";
import "./login.css";
import { Component } from "react";
import { Navigate } from "react-router-dom";

// interface FormFields {
//   password: string;
// }
// interface Props {
//   form:WrappedFormUtils<FormFields>;
// }

class NormalLoginForm extends Component {
  //定义数据
  state = {
    isLogin: false,
  };

  onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    axios
      .post("/api/login", qs.stringify({ password: values.password }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        if(res.data?.data){
          this.setState({ isLogin: true });
        }else{
          message.error('登录失败')
        }
        console.log('res: ', res);
      });
  };

  render() {
    const { isLogin } = this.state;
    return isLogin ? (
      <Navigate to="/" />
    ) : (
      <div className="login-page">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// ReactDOM.render(<NormalLoginForm />, mountNode);
export default NormalLoginForm;
