import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styleTra from "./Checkout.module.css";
import {
  datGheAction,
  datVeAction,
  getChiTietPhongVe,
} from "../../redux/actions/QuanLyDatVeAction";
import { NavLink, useParams } from "react-router-dom";
import "./Chechout.css";
import { DAT_VE_PHIM } from "../../redux/constants/QuanLyDatVeConstant";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs, Button } from "antd";
import { thongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import { connect } from "formik";
import { connection } from "../..";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import Icon, { HomeOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { phongVeDetail, arrGheDangDat, arrGheKhachDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChiTietPhongVe(id));

    //load danh sach ghe dat tu server - websocket
    // connection.on("loadDanhSachGheDaDat", (arrGheKhachDat) => {});
    // console.log("dsGheKhachDat", arrGheKhachDat);
  }, [dispatch]);

  const renderSeats = () => {
    return phongVeDetail?.danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      let indexGheDangDat = arrGheDangDat?.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      let classGheDaDuocDat = "";
      let classGheKhachDat = "";

      let indexGheKD = arrGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );

      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }
      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(datGheAction(ghe, id));
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-xl`}
          >
            {ghe.daDat ? "X" : ghe.stt}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="my-7 min-h-screen">
      <div className="grid grid-cols-12 ">
        <div className="col-span-9">
          <div className=" flex flex-col justify-center items-center">
            <div
              className="bg-black"
              style={{ width: "80%", height: "15px" }}
            ></div>
            <div className={`${styleTra.trapezoid} text-center text-2xl`}>
              Screen
            </div>
          </div>
          <div className="p-12">{renderSeats()}</div>
          <div className="flex justify-center">
            <table className="divide-y divide-gray-200 w-2/3">
              <thead className=" p-5 text-center">
                <tr className="text-center">
                  <th>GHẾ CHƯA ĐẶT</th>
                  <th>GHẾ ĐANG ĐẶT</th>
                  <th>GHẾ VIP</th>
                  <th>GHẾ ĐÃ ĐẶT</th>
                  <th>GHẾ BẠN ĐÃ ĐẶT</th>
                  <th>GHẾ KHÁCH ĐẶT</th>
                </tr>
              </thead>
              <tbody className="bg-white text-center">
                <tr>
                  <td>
                    <button className="ghe text-center">00</button>
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">00</button>
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">00</button>
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">00</button>
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">00</button>
                  </td>
                  <td>
                    <button className="ghe gheKhachDat text-center">00</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3 h-full ">
          <div className="px-5">
            <h1 className="text-center text-3xl text-green-500 py-2">
              <span>
                {" "}
                {arrGheDangDat
                  ?.reduce((tongTien, ghe) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </span>
            </h1>
            <hr />
            <div className="text-left py-2">
              <p className="text-xl font-bold">
                <span className="bg-red-700 text-white">C18</span>{" "}
                {phongVeDetail?.thongTinPhim?.tenPhim}
              </p>
              <p className="mb-0">
                {phongVeDetail?.thongTinPhim?.tenCumRap}. Address:{" "}
                {phongVeDetail?.thongTinPhim?.diaChi}
              </p>
              <p>
                {phongVeDetail?.thongTinPhim?.tenRap} -{" "}
                {phongVeDetail?.thongTinPhim?.ngayChieu} -{" "}
                {phongVeDetail?.thongTinPhim?.gioChieu}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-2">
              <div className="flex flex-wrap w-1/2 text-red-700 font-bold  items-center">
                GHẾ:
                {_.sortBy(arrGheDangDat, "stt")?.map((gheDC, index) => {
                  return (
                    <span
                      key={index}
                      className="ml-1 text-center text-base text-green-700"
                    >
                      {" "}
                      {gheDC.stt}
                    </span>
                  );
                })}
              </div>
              <div className=" text-red-700 font-bold  items-center">
                {arrGheDangDat
                  ?.reduce((tongTien, ghe) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </div>
            </div>
            <hr />
            <div className="py-2">
              <p className="text-gray-500 mb-0 text-xs">Email</p>
              <p className="">{userLogin.email}</p>
            </div>
            <hr />
            <div className="py-2">
              <p className="text-gray-500 mb-0 text-xs">Phone</p>
              <p>{userLogin.soDT}</p>
            </div>
            <hr />
          </div>
          {/* <div className="h-1/4"></div> */}
          <div className="text-center ">
            <button
              className="p-3 w-full bg-gray-500 text-xl text-white transition duration-250 ease-linear hover:bg-green-500 "
              onClick={() => {
                let thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = id;
                thongTinDatVe.danhSachVe = arrGheDangDat;
                dispatch(datVeAction(thongTinDatVe));
              }}
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyResult(props) {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thongTinNguoiDungAction());
  }, [dispatch]);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-900">
              Lịch sử đặt vé
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            {thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
              let seat = _.first(ticket.danhSachGhe);
              return (
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img
                      alt={ticket.hinhAnh}
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      src={ticket.hinhAnh}
                    />
                    <div className="flex-grow">
                      <h2 className="text-red-900 title-font font-bold text-xl">
                        {ticket.tenPhim}
                      </h2>
                      <p className="text-black">
                        <span className="text-black font-bold">
                          Giờ chiếu:{" "}
                        </span>{" "}
                        {moment(ticket.ngayDat).format("hh:mm A ~ DD/MM/YYYY")}
                      </p>
                      <p className="text-black">
                        <span className="text-black font-bold">Địa điểm: </span>
                        {seat.tenHeThongRap} - {seat.tenCumRap}
                      </p>
                      <p className="text-green-700 text-xl">
                        <span className="text-black font-bold">Ghế: </span>
                        {_.uniqBy(ticket.danhSachGhe, "tenGhe").map(
                          (ghe, index) => {
                            return (
                              <span key={index}> {`[${ghe.tenGhe}]`}</span>
                            );
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CheckoutMain(props) {
  const dispatch = useDispatch();
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    return () => {
      dispatch({ type: "CHUYEN_TAB_ACTIVE", payload: "1" });
    };
  }, [dispatch]);

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <div className="flex justify-center items-center">
          <button
            className="rounded-full border-2 border-gray-500 w-10 h-10 bg-slate-400 text-center"
            onClick={() => {
              history.push("/profile");
            }}
          >
            {userLogin.taiKhoan.substr(0, 1).toUpperCase()}
          </button>
          <div className="mt-2 ml-2">
            <p className="font-bold ">{userLogin.taiKhoan}</p>
          </div>
          <button
            className="rounded-sm border-gray-500 px-3 py-1 bg-slate-500 text-center text-white ml-5"
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/");
              window.location.reload();
            }}
          >
            LOG-OUT
          </button>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
  function callback(key) {
    dispatch({ type: "CHUYEN_TAB_ACTIVE", payload: key });
  }
  return (
    <div className="p-5">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey={`1`}
        activeKey={tabActive}
        onChange={callback}
      >
        <TabPane tab="01 CHỌN GHẾ VÀ THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <BuyResult />
        </TabPane>
        <TabPane
          tab={
            <div className="flex justify-center items-center mb-2">
              <NavLink to="/" className="text-black text-xl">
                <HomeOutlined />
              </NavLink>
            </div>
          }
          key="3"
        ></TabPane>
      </Tabs>
    </div>
  );
}
