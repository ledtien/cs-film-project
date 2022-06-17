import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import {
  GET_THONG_TIN_NGUOI_DUNG,
  USER_LOGIN_ACTION,
} from "../constants/QuanLyNguoiDungConstant";

export const dangNhapAction = (account) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(account);
      if (result.data.statusCode === 200) {
        dispatch({ type: USER_LOGIN_ACTION, payload: result.data.content });
        history.goBack();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const thongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (result.data.statusCode === 200) {
        dispatch({
          type: GET_THONG_TIN_NGUOI_DUNG,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
