import {
  Form,
  Input,
  Button,
  message,
  AutoComplete,
  InputNumber,
  Select,
} from "antd"
import UploadArea from "../components/Upload.js"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"

const { Option } = Select

export default function NewAppartmentScreen() {
  const [imageList, setImageList] = useState([])
  const history = useHistory()

  const onFinish = async (values) => {
    axios
      .post("/api/appartments/new", {
        ...values,
        pictures: imageList,
      })
      .then(() => {
        message.success("Успешно добавлено")
        history.push("/")
      })
      .catch((err) => {
        message.error(`Ошибка`)
      })
  }
  const [options, setOptions] = useState([])

  const onSearch = async (searchText) => {
    let options = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      { query: searchText, count: 5 },
      {
        headers: {
          ContentType: "application/json",
          Authorization: "Token 04f9da71b29ce730ccc80d87835e5fcadf166ba1",
        },
      }
    )
    if (options.data.suggestions.length > 0) {
      setOptions(options.data.suggestions)
    } else setOptions([])
  }

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        labelAlign={"left"}
        style={{ maxWidth: "600px" }}
      >
        <Form.Item name="address" label="Адрес">
          <AutoComplete
            options={options}
            onSearch={onSearch}
            placeholder="Поиск по улице, индексу"
          />
        </Form.Item>
        <Form.Item name="floor" label="Этаж">
          <InputNumber min={1} maxLength={3} style={{ width: 60 }} />
        </Form.Item>
        <Form.Item name="floors" label="Кол-во этажей в доме">
          <InputNumber min={1} maxLength={3} style={{ width: 60 }} />
        </Form.Item>
        <Form.Item name="rooms" label="Кол-во комнат">
          <Select all style={{ width: 200 }}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
            <Option value={6}>6 и более</Option>
            <Option value={9}>Свободная планировка</Option>
            <Option value={0}>Студия</Option>
          </Select>
        </Form.Item>
        <Form.Item name="m2" label="Общая площадь, м2">
          <InputNumber min={1} maxLength={8} style={{ width: 100 }} />
        </Form.Item>
        <Form.Item name="phone" label="Телефон">
          <Input style={{ width: 230 }} />
        </Form.Item>
        <Form.Item name="description" label="Описание, ключевые слова">
          <Input.TextArea autoSize allowClear />
        </Form.Item>
        <Form.Item name="pictures" label="Фотографии">
          <UploadArea imageList={imageList} setImageList={setImageList} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Применить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
