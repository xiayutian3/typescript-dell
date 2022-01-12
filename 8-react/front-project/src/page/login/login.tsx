import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
//版本更新后并没有这个
// import {WrappedFormUtils} from 'antd/lib/form/Form'

import './login.css'


// interface FormFields {
//   password: string;
// }
// interface Props {
//   form:WrappedFormUtils<FormFields>;
// }

const NormalLoginForm = () => {
  const onFinish = (values:any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
};

// ReactDOM.render(<NormalLoginForm />, mountNode);
export default NormalLoginForm;
