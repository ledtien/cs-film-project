import React, { Fragment, useEffect } from "react";
import detailStyle from "./Detail.module.css";
import { Progress } from "antd";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { layThongTinLichChieuPhimAction } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";

export default function Detail(props) {
  const { filmDetail } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(layThongTinLichChieuPhimAction(id));
  }, [dispatch]);

  const { TabPane } = Tabs;
  return (
    <>
      <div
        className={`${detailStyle.backGroundBlur}`}
        style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}
      ></div>
      <div
        style={{
          backgroundColor: "rgba(0,0,0, 0.4)",
          position: "absolute",
          height: "300vh",
        }}
        className="top-0 left-0 right-0 bottom-0"
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="grid mt-40 grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="flex">
              <img
                src={filmDetail.hinhAnh}
                alt={filmDetail.maPhim}
                style={{ width: "300px", height: "450px" }}
              />
              <div className="ml-2 flex items-center">
                <div>
                  <p className="text-red-300">
                    Ngày chiếu:{" "}
                    {moment(filmDetail.ngayKhoiChieu).format("MM-DD HH:mm A")}
                  </p>
                  <p className="text-4xl text-white">{filmDetail.tenPhim}</p>
                  <p className="text-lg text-gray-300">{filmDetail.moTa}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 text-center">
            <Progress
              type="circle"
              percent={`${filmDetail.danhGia * 10}`}
              width={120}
              strokeColor="green"
            />
            <p className="text-white mt-2 text-lg">
              Rating: {filmDetail.danhGia}/10
            </p>
          </div>
        </div>

        <div className="mt-10 mb-40 container px-5 mx-auto bg-white rounded-sm">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch chiếu" key="1">
              <div className="container px-5 py-10 mx-auto">
                <Tabs tabPosition={"left"}>
                  {filmDetail?.heThongRapChieu?.map((rap, index) => {
                    return (
                      <TabPane
                        tab={
                          <div className="flex justify-center items-center">
                            <div>
                              <img
                                src={rap.logo}
                                alt={rap.maHeThongRap}
                                width={50}
                              />
                            </div>
                            <p className="ml-2 mt-3">{rap.tenHeThongRap}</p>
                          </div>
                        }
                        key={index}
                      >
                        {rap.cumRapChieu?.map((item, index) => {
                          return (
                            <Fragment key={index}>
                              <div className="flex">
                                <div className="">
                                  <img
                                    src={item.hinhAnh}
                                    alt={item.maCumRap}
                                    width={`50`}
                                  />
                                </div>
                                <div
                                  className="text-left ml-2"
                                  style={{ flex: 1 }}
                                >
                                  <h1 className="text-xl text-">
                                    {item.tenCumRap}
                                  </h1>
                                  <p className="text-gray-500 ">
                                    {item.diaChi}
                                  </p>
                                  <div className="grid grid-cols-10 overflow-auto h-7">
                                    {item.lichChieuPhim?.map(
                                      (lichChieu, index) => {
                                        return (
                                          <NavLink
                                            className={`text-orange-400 mb-0`}
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
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}
