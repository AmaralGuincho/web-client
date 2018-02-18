import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import './App.css'
import Funcionario from '../containers/Funcionario'
import NotFound from '../components/NotFound'

const { SubMenu } = Menu
const { Header, Sider, Footer } = Layout

const menuItems = [
  {
    routeName: '/funcionario',
    icon: 'user',
    text: 'Funcionario',
    component: Funcionario
  }
]

const makeSubmenu = menuItem => (
  <SubMenu
    key={`${menuItem.routerName}-submenu`}
    title={
      <span>
        <Icon type={menuItem.icon} />
        {menuItem.text}
      </span>
    }
  >
    <Menu.Item key={`${menuItem.routeName}1`}>
      <Link to={menuItem.routeName}> Consultar </Link>
    </Menu.Item>
    <Menu.Item key={`${menuItem.routeName}2`}>
      <Link to={`${menuItem.routeName}/create`}> Cadastrar </Link>
    </Menu.Item>
    <Menu.Item key={`${menuItem.routeName}3`}> Editar</Menu.Item>
  </SubMenu>
)

const makeRoutes = route => (
  <Route path={route.routeName}
    component={route.component}
    key={`${route.routeName}-router`}
  />
)

const App = () => (
  <Layout className='app-shell'>
    <Header className='header'>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key='1'>Dashboard</Menu.Item>
        <Menu.Item key='2'>Acompanhar Serviços</Menu.Item>
        <Menu.Item key='3'>Novo Serviço</Menu.Item>
      </Menu>
    </Header>

    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {/* Render Submenu Itens */}
          {menuItems.map(makeSubmenu)}
        </Menu>
      </Sider>

      <Layout style={{ padding: '0 24px 24px' }}>
        <Switch>
          {/* Dinamicaly render react-router routes */}
          {menuItems.map(makeRoutes)}

          <Route exact component={NotFound} />
        </Switch>

        <Footer style={{ textAlign: 'center' }}>
          Amaral Guincho © 2018
        </Footer>
      </Layout>

    </Layout>
  </Layout>
)
export default App
