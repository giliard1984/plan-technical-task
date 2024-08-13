import React, { useContext } from "react";
import { Row, Col, Layout, theme, ConfigProvider, Input, FloatButton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { AppContext } from "@contexts/AppContext";

import styles from "./Default.module.scss";

const { Header, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const { token: { borderRadiusLG } } = theme.useToken(); // antd token

  // retrieved states and methods associated with the app context
  const {
    setSearchValue
  } = useContext(AppContext);

  return (
    <ConfigProvider
      theme={{ components: { Layout: { bodyBg: "#f4f2ee", headerBg: "#fff" } } }}
    >
      <Layout>
        <Header className={styles.header}>
          <Row gutter={[0, 0]} justify="center" align="middle">
            <Col flex="100px" className={styles.imageWrapper}>
              <img
                alt="plan-com-image"
                src="./plan-com-logo.svg"
              />
            </Col>
            <Col flex="1180px" className={styles.headerText}>
              Senior React Developer - Technical task
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col flex="1280px" className={styles.input}>
              <ConfigProvider theme={{ components: { Input: { colorTextPlaceholder: "#E8E8E8" }}}}>
                <Input
                  className={styles.myInput}
                  size="large"
                  variant="borderless"
                  placeholder="Search for a video..."
                  addonBefore={<SearchOutlined style={{ color: "#fff"}} />}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </ConfigProvider>
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>
          <div
            className={styles.outletWrapper}
            style={{ borderRadius: borderRadiusLG }}
          >
            <Outlet />
            <FloatButton.BackTop duration={550} visibilityHeight={800} />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DefaultLayout;
