import React, { useContext } from "react";
import { Row, Col, Layout, theme, ConfigProvider, Input, FloatButton, Switch } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { AppContext } from "@contexts/AppContext";

import styles from "./Default.module.scss";

const { Header, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const { token: { borderRadiusLG } } = theme.useToken(); // antd token

  // retrieved states and methods associated with the app context
  const {
    isInteractive,
    setIsInteractive,
    setSearchValue
  } = useContext(AppContext);

  return (
    // defining the layout theme
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
            <Col flex="980px" className={styles.headerText}>
              Senior React Developer - Technical task
            </Col>
            <Col flex="200px">
              <Row>
                <Col span={6}>
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    onChange={()=> setIsInteractive(!isInteractive)}
                  />
                </Col>
                <Col span={18}>
                  <span>{isInteractive ? "Interactive enabled" : "Marked as static"}</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col flex="1280px" className={styles.input}>
              {/* defining the input theme */}
              <ConfigProvider theme={{ components: { Input: { colorTextPlaceholder: "#E8E8E8" }}}}>
                <Input
                  className={styles.myInput}
                  size="large"
                  variant="borderless"
                  placeholder="Search for a video..."
                  addonBefore={<SearchOutlined style={{ color: "#fff" }} />}
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
