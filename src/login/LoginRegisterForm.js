import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";

import axios from "axios";
import "../api/mock";

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const messageApi = message;

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const onFinish = async (values) => {
    console.log("1", isLogin);
    if(isLogin){
      // 登录
      try {
        const response = await axios.post("/api/login", values);
        messageApi.success(response.data.message);
      } catch (error) {
        messageApi.error(error.response.data.message);
      }
    } else {
      // 注册
      try {
        const response = await axios.post("/api/register", values);
        messageApi.success(response.data.message);
      } catch (error) {
        messageApi.error(error.response.data.message);
      }
    }
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <Form
        labelCol={{ span: 6 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {isLogin ? (
          <>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入你的用户名!" }]}
            >
              <Input placeholder="用户名是admin" />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入你的密码!" }]}
            >
              <Input.Password placeholder="密码是123456" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入你的用户名!" }]}
            >
              <Input placeholder="用户名是admin" />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入你的密码!" }]}
            >
              <Input.Password placeholder="密码是123456" />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请确认你的密码!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="link" onClick={toggleForm}>
            {isLogin ? "立即注册" : "返回登录"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginRegisterForm;
