import React, { Fragment, useEffect, useRef } from "react";
import { Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getDanhSachPhim,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyFilmAction";
import { NavLink } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

export default function Films() {
  const { arrFilmBackUp } = useSelector((state) => state.QuanLyFilmReducer);
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  useEffect(() => {
    dispatch(getDanhSachPhim());
  }, [dispatch]);

  console.log({ arrFilmBackUp });
  const { Search } = Input;

  const onSearch = (value) => {
    console.log(value);
    dispatch(getDanhSachPhim(value));
  };
  const handleChangeSearch = (e) => {
    let { value } = e.target;
    console.log("1", searchRef.current);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      dispatch(getDanhSachPhim(value));
    }, 500);
    console.log("3", searchRef.current);
  };

  const columns = [
    {
      title: "Ma Phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      width: "70px",
      render: (item, record, index) => {
        return (
          <Fragment key={index}>
            <img src={record.hinhAnh} width="50" height="50" alt={index} />
          </Fragment>
        );
      },
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      width: "200px",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
    },

    {
      title: "Mô tả",
      dataIndex: "moTa",
      sorter: (a, b) => {
        let moTaA = a.moTa.toLowerCase().trim();
        let moTaB = b.moTa.toLowerCase().trim();
        if (moTaA > moTaB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
      render: (item, record, index) => {
        return (
          <Fragment key={index}>
            {record.moTa.length > 100
              ? record.moTa.slice(0, 100) + "..."
              : record.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Hành Động",
      dataIndex: "maPhim",

      render: (item, record, index) => {
        return (
          <>
            <NavLink
              key={index}
              to={`/admin/films/edit/${record.maPhim}`}
              className="text-2xl text-yellow-500"
            >
              <EditOutlined />
            </NavLink>
            <span
              key={index}
              className="text-red-800 cursor-pointer"
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa phim" + record.tenPhim)) {
                  dispatch(xoaPhimAction(record.maPhim));
                }
              }}
            >
              <DeleteOutlined className="text-2xl text-red-800 ml-2" />
            </span>
            <NavLink
              key={index}
              to={`/admin/films/showtime/${record.maPhim}`}
              className="text-2xl text-blue-500 ml-2"
            >
              <CalendarOutlined />
            </NavLink>
          </>
        );
      },
    },
  ];

  const data = [...arrFilmBackUp];
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div>
      {" "}
      <h1 className="text-4xl">Quản lý phim</h1>
      <Search
        className="mb-5"
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={handleChangeSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
      ;
    </div>
  );
}
