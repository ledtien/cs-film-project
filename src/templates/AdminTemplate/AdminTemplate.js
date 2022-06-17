import React, { Fragment, useEffect, useState } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./AdminTemplate.css";
import SubMenu from "antd/lib/menu/SubMenu";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { useSelector } from "react-redux";
import { history } from "../../App";
import _ from "lodash";

export const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  const { Header, Content, Footer, Sider } = Layout;
  let [state, setState] = useState({ collapsed: false });
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  };
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setState({
      collapsed,
    });
  };

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <div className="flex justify-end items-center mr-2">
          <button
            className="rounded-full border-2 border-gray-500 w-10 h-10 bg-white flex justify-center items-center"
            onClick={() => {
              history.push("/profile");
            }}
          >
            <span> {userLogin.taiKhoan.substr(0, 1).toUpperCase()}</span>
          </button>
          <div className="mt-2 ml-2">
            <p className="font-bold text-black ">{userLogin.taiKhoan}</p>
          </div>
          <button
            className="rounded-sm border-gray-500 bg-slate-500 px-1  text-black ml-5 flex justify-center items-center"
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/");
              window.location.reload();
            }}
          >
            <span>LOG-OUT</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này");
    return <Redirect to="/" />;
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này");
    return <Redirect to="/" />;
  }

  //   const items = [
  //     getItem("Option 1", "1", <PieChartOutlined />),
  //     getItem("Option 2", "2", <DesktopOutlined />),
  //     getItem("User", "sub1", <UserOutlined />, [
  //       getItem("Tom", "3"),
  //       getItem("Bill", "4"),
  //       getItem("Alex", "5"),
  //     ]),
  //     getItem("Team", "sub2", <TeamOutlined />, [
  //       getItem("Team 1", "6"),
  //       getItem("Team 2", "8"),
  //     ]),
  //     getItem("Files", "9", <FileOutlined />),
  //   ];
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout
              style={{
                minHeight: "100vh",
              }}
            >
              <Sider
                collapsible
                collapsed={state.collapsed}
                onCollapse={onCollapse}
              >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="/admin/users">Users</NavLink>
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                    <Menu.Item key="10" icon={<FileOutlined />}>
                      <NavLink to="/admin/films">Films</NavLink>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<FileOutlined />}>
                      <NavLink to="/admin/films/add">Add new</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="3" icon={<DesktopOutlined />}>
                    <NavLink to="/admin/showtime">Showtime</NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{
                    padding: 0,
                    height: 80,
                  }}
                >
                  <div>{operations}</div>
                </Header>
                <Content
                  style={{
                    margin: "0 16px",
                  }}
                >
                  <Breadcrumb
                    style={{
                      margin: "16px 0",
                    }}
                  >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      minHeight: 360,
                    }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                >
                  Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
