import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import {
  CHUYEN_TAB,
  DAT_VE_HOAN_TAT,
  DAT_VE_PHIM,
  GET_CHI_TIET_PHONG_VE,
} from "../constants/QuanLyDatVeConstant";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const getChiTietPhongVe = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layDanhSachPhongVe(id);
      dispatch({ type: GET_CHI_TIET_PHONG_VE, payload: result.data.content });
    } catch (error) {
      console.log(error);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch) => {
    dispatch(displayLoadingAction());
    try {
      const result = await quanLyDatVeService.datVePhim(thongTinDatVe);

      await dispatch(getChiTietPhongVe(thongTinDatVe.maLichChieu));
      await dispatch({ type: DAT_VE_HOAN_TAT });
      await dispatch(hideLoadingAction());
      dispatch({ type: CHUYEN_TAB });
    } catch (error) {
      console.log(error);
    }
  };
};

export const datGheAction = (ghe) => {
  return async (dispatch, getState) => {
    await dispatch({ type: DAT_VE_PHIM, payload: ghe });
    //call api

    let arrGheDangDat = getState().QuanLyDatVeReducer.arrGheDangDat;
    let userLogin = getState().QuuanLyNguoiDungReducer.userLogin;
  };
};
