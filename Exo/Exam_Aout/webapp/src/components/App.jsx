import React from 'react';

import { Layout, Menu } from 'antd'

const { Header, Content } = Layout



const App = () => {

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
          <Menu.Item>Jokes</Menu.Item>
          <Menu.Item>About</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '30px 50px' }}>
        <p>Add your content here</p>
      </Content>
    </Layout>
  )
}

export default App
