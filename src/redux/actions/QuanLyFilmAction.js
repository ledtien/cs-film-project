import { quanLyPhimService } from "../../services/quanLyPhimService";
import {
  LAY_DANH_SACH_PHIM,
  LAY_THONG_TIN_PHIM,
} from "../constants/QuanLyFilmConstant";
import { history } from "../../App";

export const getDanhSachPhim = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachFilm(tenPhim);

      dispatch({ type: LAY_DANH_SACH_PHIM, payload: result.data.content });
    } catch (error) {
      console.log(error);
    }
  };
};

export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      console.log("result", result.data.content);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.layThongTinPhim(maPhim);
      console.log("result", result.data.content);
      dispatch({ type: LAY_THONG_TIN_PHIM, payload: result.data.content });
    } catch (errors) {
      console.log(errors.response.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      console.log("result", result.data.content);
      dispatch(getDanhSachPhim());
      history.push("/admin/films");
    } catch (errors) {
      console.log(errors.response.data);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.xoaPhim(maPhim);
      console.log("result", result.data.content);
      dispatch(getDanhSachPhim());
    } catch (errors) {
      console.log(errors.response.data);
    }
  };
};
