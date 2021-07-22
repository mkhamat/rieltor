import { Col, Input, InputNumber, Pagination, Row, Select } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import AppartmentCard from "../components/AppartmentCard"

const { Option } = Select

export default function AppartmentScreen({ user }) {
  const [apps, setApps] = useState([])

  const [filter, setFilter] = useState({
    search: null,
    rooms: null,
    floor: null,
    m2: null,
    m22: null,
  })

  const [pageState, setPageState] = useState({
    current: 1,
    count: 0,
    limit: 9,
  })

  const handleChange = (p) => {
    fetch(p)
  }

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
      <Pagination
        onChange={handleChange}
        current={pageState.current}
        pageSize={pageState.limit}
        total={pageState.count}
      />
      <Input
        style={{ margin: "1em 0", width: 150 }}
        placeholder="Общий поиск"
        onChange={(e) => {
          setFilter({ ...filter, search: e.target.value })
        }}
      />
      <Select
        placeholder="Кол-во комнат"
        style={{ margin: "1em 0", width: 150 }}
        allowClear
        onChange={(value) => {
          setFilter({ ...filter, rooms: value })
        }}
      >
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
        <Option value={6}>6 и более</Option>
        <Option value={9}>Свободная планировка</Option>
        <Option value={0}>Студия</Option>
      </Select>
      <InputNumber
        min={1}
        type="number"
        maxLength={3}
        style={{ margin: "1em 0", width: 60 }}
        placeholder="Этаж"
        onChange={(value) => {
          setFilter({ ...filter, floor: value })
        }}
      />
      <InputNumber
        min={1}
        type="number"
        maxLength={8}
        style={{ margin: "1em 0", width: 100 }}
        placeholder="Площадь>"
        onChange={(value) => {
          setFilter({ ...filter, m2: value })
        }}
      />
      <InputNumber
        min={1}
        type="number"
        maxLength={8}
        style={{ margin: "1em 0", width: 100 }}
        placeholder="<Площадь"
        onChange={(value) => {
          setFilter({ ...filter, m22: value })
        }}
      />
      <div>
        <Row gutter={16}>
          {apps.map((app) => {
            return (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
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
