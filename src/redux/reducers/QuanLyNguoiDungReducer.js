import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import {
  GET_THONG_TIN_NGUOI_DUNG,
  USER_LOGIN_ACTION,
} from "../constants/QuanLyNguoiDungConstant";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user,
  thongTinNguoiDung: {},
};

export const QuanLyNguoiDungReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case USER_LOGIN_ACTION: {
      localStorage.setItem(USER_LOGIN, JSON.stringify(payload));
      localStorage.setItem(TOKEN, payload.accessToken);
      return { ...state, userLogin: payload };
    }

    case GET_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: payload };
    }
    default:
      return state;
  }
};
