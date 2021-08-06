import * as React from "react"
import { Form, Input, Button } from "antd"

interface IRegistrationFormProps {
    handleSubmit: (...args: any[]) => void
}

const Registration: React.FC<IRegistrationFormProps> = ({ handleSubmit }) => {
    return (
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input placeholder="Введите имя" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                <Input placeholder="Введите почту" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password placeholder="Введите пароль" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Registration
