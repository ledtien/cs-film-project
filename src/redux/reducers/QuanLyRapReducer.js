import {
  GET_THONG_TIN_LICH_CHIEU_THEO_RAP,
  GET_THONG_TIN_PHIM,
} from "../constants/QuanLyRapConstant";

const initialState = {
  lichChieuTheoRap: [],
  filmDetail: {},
};

export const QuanLyRapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_THONG_TIN_LICH_CHIEU_THEO_RAP:
      return { ...state, lichChieuTheoRap: payload };

    case GET_THONG_TIN_PHIM: {
      return { ...state, filmDetail: payload };
    }
    default:
      return state;
  }
};
