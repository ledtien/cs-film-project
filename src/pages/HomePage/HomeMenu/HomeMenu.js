import React, { Fragment, useState } from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function HomeMenu(props) {
  const [state, setState] = useState({
    tabPosition: "left",
  });
  const { TabPane } = Tabs;

  console.log(props);
  let { lichChieuTheoRap } = props;

  const renderThongTinLichChieu = () => {
    return lichChieuTheoRap.map((rap, index) => {
      return (
        <TabPane
          tab={
            <img
              src={rap.logo}
              alt={rap.maHeThongRap}
              className="rounded-full"
              width={`50`}
            />
          }
          key={index}
        >
          <Tabs tabPosition={state.tabPosition}>
            {rap.lstCumRap.map((cumrap, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      className="flex"
                      style={{ width: "500px" }}
                      width={`50`}
                    >
                      <div>
                        <img
                          src={cumrap.hinhAnh}
                          alt={cumrap.maCumRap}
                          width={`70`}
                        />
                      </div>
                      <div className="text-left ml-2" style={{ flex: 1 }}>
                        <p className="text-green-600 mb-0">
                          {cumrap.tenCumRap}
                        </p>
                        <p
                          className="text-gray-500 mb-0"
                          style={{
                            // wordBreak: "break-all",
                            whiteSpace: "normal",
                          }}
                        >
                          {cumrap.diaChi}
                        </p>
                        <p className="text-red-500 mb-0">Chi Tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  <div className="overflow-auto" style={{ height: "100vh" }}>
                    {cumrap.danhSachPhim.map((phim, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="flex">
                            <div className="">
                              <img
                                src={phim.hinhAnh}
                                alt={phim.maPhim}
                                width={`150`}
                              />
                            </div>
                            <div className="text-left ml-2" style={{ flex: 1 }}>
                              <h1 className="text-2xl text-">{phim.tenPhim}</h1>
                              <p className="text-gray-500 ">{cumrap.diaChi}</p>
                              <div className="grid grid-cols-6 gap-3 overflow-auto h-20">
                                {phim.lstLichChieuTheoPhim.map(
                                  (lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className={`text-orange-400 `}
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                          <hr className="m-5" />
                        </Fragment>
                      );
                    })}
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <>
      <Tabs tabPosition={state.tabPosition}>{renderThongTinLichChieu()}</Tabs>
    </>
  );
}
