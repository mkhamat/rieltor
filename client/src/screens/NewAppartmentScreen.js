import {
  Form,
  Input,
  Button,
  message,
  AutoComplete,
  InputNumber,
  Select,
  Image,
  Popconfirm,
} from "antd"
import UploadArea from "../components/Upload.js"
import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import dotenv from "dotenv"
dotenv.config()

const { Option } = Select

export default function NewAppartmentScreen() {
  const [imageList, setImageList] = useState([])
  const history = useHistory()
  const { id } = useParams()
  const [form] = Form.useForm()

  useEffect(() => {
    ;(async () => {
      if (id) {
        axios.get(`/appartments/${id}`).then((res) => {
          form.setFieldsValue(res.data)
          setImageList([...res.data.pictures])
        })
      }
    })()
  }, [])

  const onFinish = async (values) => {
    axios
      .request({
        url: "/appartments/" + `${id ? "edit/" + id : "new"}`,
        method: id ? "PUT" : "POST",
        data: {
          ...values,
          pictures: imageList,
        },
      })
      .then(() => {
        message.success(`Успешно добавлено`)
        history.push("/")
      })
      .catch((err) => {
        message.error(`Ошибка`)
      })
  }

  const handleDelete = async (image) => {
    let array = [...imageList]
    await axios
      .delete(`/images/${id}/${image}`)
      .then((res) => {
        if (res.status === 200) {
          message.success("Успешно удалено")
          if (imageList.length === 1) {
            setImageList([])
          } else {
            array.splice(res.data.index, 1)
            setImageList([...array])
          }
        }
      })
      .catch(() => {
        let index = imageList.indexOf(image)
        if (imageList.length === 1) {
          setImageList([])
        } else {
          array.splice(index, 1)
          setImageList([...array])
        }
      })
  }

  const [options, setOptions] = useState([])

  const onSearch = async (searchText) => {
    console.log(process.env.REACT_APP_DADATA_TOKEN)
    let options = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      { query: searchText, count: 5 },
      {
        headers: {
          ContentType: "application/json",
          Authorization: `Token ${process.env.REACT_APP_DADATA_TOKEN}`,
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
        form={form}
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
        {id && (
          <Image.PreviewGroup>
            {imageList.map((image) => {
              return (
                <Popconfirm
                  onConfirm={() => handleDelete(image)}
                  title="Удалить?"
                  okText="Удалить"
                  cancelText="Отмена"
                >
                  <a>
                    <Image
                      style={{ maxWidth: 100 }}
                      src={`/static/${image}`}
                      fallback="data:image/png;base64,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"
                      preview={false}
                    />
                  </a>
                </Popconfirm>
              )
            })}
          </Image.PreviewGroup>
        )}
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
