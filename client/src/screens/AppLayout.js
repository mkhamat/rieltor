import { Layout, Menu } from "antd"
import {
  UserOutlined,
  OrderedListOutlined,
  UploadOutlined,
  LoadingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"

import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom"

import { useEffect, useState } from "react"
import NewAppartmentScreen from "./NewAppartmentScreen"
import AppartmentsScreen from "./AppartmentsScreen"
import AppartmentScreen from "./AppartmentScreen.js"
import LoginScreen from "./LoginScreen"
import axios from "axios"

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export default function AppLayout() {
  const path = useLocation().pathname
  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false)

  const [user, setUser] = useState({
    login: null,
    admin: null,
    token: null,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      let user = JSON.parse(localStorage.getItem("user"))
      if (user?.token) {
        let auth = await axios.post("/users/auth", { token: user.token })
        setUser(auth.data)
        setLoading(false)
      } else {
        history.push("/login")
        setLoading(false)
      }
    })()
  }, [history])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser({ login: null, admin: null, token: null })
    history.push("/")
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="md"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu theme="dark" selectedKeys={[path]} mode="inline">
          {user.login && (
            <>
              <SubMenu key="user" title={user.login} icon={<UserOutlined />}>
                <Menu.Item
                  onClick={handleLogout}
                  key="logout"
                  icon={<LogoutOutlined />}
                >
                  Выход
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="/" icon={<OrderedListOutlined />}>
                <Link to="/">Квартиры</Link>
              </Menu.Item>
            </>
          )}
          {user.admin && (
            <Menu.Item key="/newappartment" icon={<UploadOutlined />}>
              <Link to="/newappartment">Новая квартира</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <h1
          style={{ fontSize: "24px", fontWeight: "600", padding: "0.5em 1em" }}
        >
          {(path === "/" && "Квартиры") ||
            (path === "/newappartment" && "Новая квартира") ||
            (path === "/login" && "Вход в систему")}
        </h1>
        <Content style={{ margin: "0 16px", maxWidth: "1400px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {loading ? (
              <LoadingOutlined style={{ fontSize: "5rem" }} spin />
            ) : (
              <Switch>
                <Route path="/login">
                  {user.login ? (
                    <Redirect to="/" />
                  ) : (
                    <LoginScreen user={user} setUser={setUser} />
                  )}
                </Route>
                <Route path="/appartments/:id">
                  {user.login ? <AppartmentScreen /> : <Redirect to="/" />}
                </Route>
                <Route path="/newappartment">
                  {user.admin ? (
                    <NewAppartmentScreen />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/editappartment/:id">
                  {user.admin ? (
                    <NewAppartmentScreen />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/">
                  {user.login ? (
                    <AppartmentsScreen user={user} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
              </Switch>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>©2021</Footer>
      </Layout>
    </Layout>
  )
}
