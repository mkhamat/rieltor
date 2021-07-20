import { Form, Input, Button, message } from "antd"
import axios from "axios"
import { useHistory } from "react-router-dom"

export default function LoginScreen({ user, setUser }) {
  const history = useHistory()
  async function onFinish(values) {
    await axios
      .post("/users/login", values)
      .then(({ data }) => {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))
        history.push("/")
      })
      .catch((err) => {
        message.error("Неправильное имя пользователя или пароль")
      })
  }
  return (
    <Form
      name="login"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      labelAlign={"left"}
    >
      <Form.Item
        name="login"
        label="Имя пользователя"
        rules={[{ required: true, message: "Введите имя пользователя" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Вход
        </Button>
      </Form.Item>
    </Form>
  )
}
