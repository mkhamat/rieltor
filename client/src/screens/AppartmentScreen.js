import { Collapse, Image } from "antd"
import {
  PhoneOutlined,
  FieldTimeOutlined,
  WalletOutlined,
  TagOutlined,
} from "@ant-design/icons"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import pricentype from "../utils/priceAndType.js"

export default function AppartmentScreen() {
  const params = useParams()
  const [info, setInfo] = useState({})

  useEffect(() => {
    ;(async () => {
      axios.get(`/api/appartments/${params.id}`).then((res) => {
        console.log(res.data)
        setInfo(res.data)
      })
    })()
  }, [params.id])

  const pnt = pricentype(info.price, info.price_type)
  const pictures = info.pictures?.map((pic, i) => {
    return (
      <Image
        key={i}
        style={{
          display: "inline-block",
          backgroundSize: "cover",
          width: 124,
          height: 124,
          border: "solid white",
        }}
        src={`/static/${pic}`}
      />
    )
  })

  return (
    <>
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold" }}
      >{`${info.rooms}-комн., ${info.m2} м², ${info.floor} из ${info.floors} этаж`}</h1>
      <Image.PreviewGroup>{pictures}</Image.PreviewGroup>
      <p style={{ fontWeight: "bold", fontSize: "1.2rem", paddingTop: "1rem" }}>
        {info.address}
      </p>
      <p>
        {info.price_type === "rent" ? (
          <>
            <FieldTimeOutlined /> Аренда
          </>
        ) : (
          <>
            <WalletOutlined /> Продажа
          </>
        )}
      </p>
      <p>
        <TagOutlined /> Цена: {pnt.priceFormat}
      </p>
      <Collapse ghost>
        <Collapse.Panel
          header={
            <>
              <PhoneOutlined /> Номер телефона
            </>
          }
        >
          {info.numbers?.length > 0 ? (
            info.numbers.map((number) => {
              return (
                <p>
                  {number.number} - {number.name}
                </p>
              )
            })
          ) : (
            <p>{info.phone}</p>
          )}
        </Collapse.Panel>
      </Collapse>
      <p>{info.description}</p>
    </>
  )
}
