import { Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

const { Dragger } = Upload

export default function UploadArea({ imageList, setImageList }) {
  const props = {
    name: "image",
    multiple: true,
    action: "/images",

    onChange(info) {
      const { status } = info.file
      if (status === "done") {
        message.success(`${info.file.name} был успешно загружен`)
        setImageList([...imageList, info.file.name])
      } else if (status === "error") {
        message.error(
          `${info.file.name} не был загружен, т.к. произошла ошибка`
        )
      }
    },
  }

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Выберете или перетащите файлы в эту область для загрузки
      </p>
    </Dragger>
  )
}
