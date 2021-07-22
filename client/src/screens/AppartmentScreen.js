import { Carousel, Collapse, Image } from "antd"
import { PhoneOutlined } from "@ant-design/icons"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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
  }, [])

  function rooms() {
    if (info.rooms <= 6) {
      return `${info.rooms}-комн.`
    } else if (info.rooms === 9) {
      return "Свободная планировка"
    } else if (info.rooms === 0) {
      return "Студия"
    }
  }

  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{`${rooms()}, ${
        info.m2
      } м², ${info.floor}/${info.floors} этаж`}</h1>
      <Carousel style={{ maxWidth: 500 }} dotPosition={"top"}>
        {info.pictures?.map((pic, i) => {
          return (
            <Image
              style={{
                margin: "auto",
                // maxWidth: 300,
                // height: i > 0 ? 100 : null,
                // margin: "5px",
              }}
              src={`/static/${pic}`}
            />
          )
        })}
      </Carousel>
      <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{info.address}</p>
      <Collapse ghost>
        <Collapse.Panel
          header={
            <>
              <PhoneOutlined /> Номер телефона
            </>
          }
        >
          <p>{info.phone}</p>
        </Collapse.Panel>
      </Collapse>
      <p>{info.description}</p>
    </>
  )
}
