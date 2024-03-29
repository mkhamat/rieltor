import {
  BackTop,
  Col,
  Collapse,
  Input,
  InputNumber,
  Pagination,
  Radio,
  Row,
  Select,
} from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import AppartmentCard from "../components/AppartmentCard"

export default function AppartmentScreen({ user }) {
  const [apps, setApps] = useState([])

  const [filter, setFilter] = useState({
    address: null,
    m2: null,
    m22: null,
    price_type: null,
    property_object: null,
    property_type: null,
    priceFrom: null,
    priceTo: null,
    roomsFrom: null,
    roomsTo: null,
    floorFrom: null,
    floorTo: null,
    phone: null,
  })

  const [pageState, setPageState] = useState({
    current: 1,
    count: 0,
    limit: 12,
  })

  const handleChange = (p) => {
    fetch(p)
  }

  const selectOptions = [
    { value: "Офис", name: "Офис" },
    { value: "Здание", name: "Здание" },
    { value: "Помещение с/н", name: "Помещение с/н" },
    { value: "Склад", name: "Склад" },
    { value: "Гараж", name: "Гараж" },
    { value: "Коммерческая земля", name: "Коммерческая земля" },
    { value: "Квартира", name: "Квартира" },
    { value: "Дом", name: "Дом" },
    { value: "Участок", name: "Участок" },
  ]

  const fetch = async (p) => {
    let response = await axios.post(
      `/api/appartments`,
      {
        filter: filter,
        pageState: { ...pageState, current: p },
      },
      {
        headers: {
          ContentType: "application/json",
        },
      }
    )
    setPageState({ ...response.data.pageState })
    setApps(response.data.apps)
  }

  useEffect(() => {
    fetch()
  }, [filter])

  return (
    <>
      <BackTop />
      <Pagination
        showSizeChanger={false}
        onChange={handleChange}
        current={pageState.current}
        pageSize={pageState.limit}
        total={pageState.count}
        responsive={true}
      />
      <Collapse ghost>
        <Collapse.Panel header="Поиск и фильтрация">
          <Input
            style={{ margin: ".5em 0", width: 150 }}
            placeholder="Общий поиск"
            onChange={(e) => {
              setFilter({ ...filter, address: e.target.value })
            }}
          />
          <Input.Group>
            <Radio.Group
              onChange={(e) => {
                setFilter({ ...filter, price_type: e.target.value })
              }}
            >
              <Radio.Button value="rent">Аренда</Radio.Button>
              <Radio.Button value="sell">Продажа</Radio.Button>
            </Radio.Group>
          </Input.Group>
          <Input.Group>
            <Radio.Group style={{ marginTop: '.5rem' }}
              onChange={(e) => {
                setFilter({ ...filter, property_type: e.target.value })
              }}
            >
              <Radio.Button value="housing">Жилая</Radio.Button>
              <Radio.Button value="commercial">Коммерческая</Radio.Button>
            </Radio.Group>
          </Input.Group>
          <Input
            placeholder="Номер телефона"
            style={{ marginTop: ".5rem", width: 150 }}
            onChange={({ target }) => {
              setFilter({ ...filter, phone: target.value })
            }}
          />
          <Input.Group>
            <Select
              options={selectOptions}
              style={{ marginTop: ".5rem", width: "100%" }}
              placeholder="Типы объекта"
              onChange={(value) =>
                setFilter({
                  ...filter,
                  property_object: value.length ? value : null,
                })
              }
              mode={"multiple"}
              allowClear
            />
          </Input.Group>
          <Input.Group>
            <InputNumber
              placeholder="Комнаты >"
              style={{ marginTop: ".5rem", width: 100 }}
              onChange={(value) => {
                setFilter({ ...filter, roomsFrom: value })
              }}
            />
            <InputNumber
              placeholder="< Комнаты"
              style={{ marginTop: ".5rem", width: 100 }}
              onChange={(value) => {
                setFilter({ ...filter, roomsTo: value })
              }}
            />
          </Input.Group>
          <Input.Group>
            <InputNumber
              min={1}
              type="number"
              maxLength={3}
              style={{ marginTop: ".5rem", width: 100 }}
              placeholder="Этаж >"
              onChange={(value) => {
                setFilter({ ...filter, floorFrom: value })
              }}
            />
            <InputNumber
              min={1}
              type="number"
              maxLength={3}
              style={{ marginTop: ".5rem", width: 100 }}
              placeholder="< Этаж"
              onChange={(value) => {
                setFilter({ ...filter, floorTo: value })
              }}
            />
          </Input.Group>
          <Input.Group>
            <InputNumber
              min={1}
              type="number"
              maxLength={8}
              style={{ marginTop: ".5rem", width: 100 }}
              placeholder="Площадь >"
              onChange={(value) => {
                setFilter({ ...filter, m2: value })
              }}
            />
            <InputNumber
              min={1}
              type="number"
              maxLength={8}
              style={{ marginTop: ".5rem", width: 100 }}
              placeholder="< Площадь"
              onChange={(value) => {
                setFilter({ ...filter, m22: value })
              }}
            />
          </Input.Group>
          <Input.Group>
            <InputNumber
              min={1}
              type="number"
              style={{ marginTop: ".5rem", width: 100 }}
              placeholder="Цена >"
              onChange={(value) => {
                setFilter({ ...filter, priceFrom: value })
              }}
            />
            <InputNumber
              min={1}
              type="number"
              style={{ marginTop: ".5rem", width: 100 }}
              placeholder="< Цена"
              onChange={(value) => {
                setFilter({ ...filter, priceTo: value })
              }}
            />
          </Input.Group>
        </Collapse.Panel>
      </Collapse>
      <div>
        <Row gutter={16} align="middle">
          {apps.map((app) => {
            return (
              <Col
                style={{
                  margin: "1rem 0",
                }}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                xxl={{ span: 6 }}
                key={app._id}
              >
                <AppartmentCard
                  p={pageState.current}
                  fetch={fetch}
                  user={user}
                  props={app}
                />
              </Col>
            )
          })}
        </Row>
      </div>
      <Pagination
        onChange={handleChange}
        current={pageState.current}
        pageSize={pageState.limit}
        total={pageState.count}
      />
    </>
  )
}
