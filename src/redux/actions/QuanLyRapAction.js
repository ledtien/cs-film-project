import { quanLyRapService } from "../../services/QuanLyRapService";
import {
  GET_THONG_TIN_LICH_CHIEU_THEO_RAP,
  GET_THONG_TIN_PHIM,
} from "../constants/QuanLyRapConstant";

export const laythongTinLichChieuTheoRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuTheoRap();

      dispatch({
        type: GET_THONG_TIN_LICH_CHIEU_THEO_RAP,
        payload: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const layThongTinLichChieuPhimAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);

      dispatch({
        type: GET_THONG_TIN_PHIM,
        payload: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
