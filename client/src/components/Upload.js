import ImgCrop from "antd-img-crop"
import { Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

// const { Dragger: Upload } = Upload

export default function UploadArea({ imageList, setImageList }) {
  const props = {
    name: "image",
    action: "/api/images",
    listType: "picture-card",

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
    <ImgCrop>
      <Upload {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Выберете файлы для загрузки</p>
      </Upload>
    </ImgCrop>
  )
}
