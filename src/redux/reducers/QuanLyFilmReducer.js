import {
  LAY_DANH_SACH_PHIM,
  LAY_PHIM_DANG_CHIEU,
  LAY_PHIM_SAP_CHIEU,
  LAY_TAT_CA_PHIM,
  LAY_THONG_TIN_PHIM,
} from "../constants/QuanLyFilmConstant";

const initialState = {
  arrFilm: [
    {
      maPhim: 10147,
      tenPhim: "Doctor Strange 2019",
      biDanh: "doctor-strange-2019",
      trailer: "https://www.youtube.com/watch?v=kmXjPbN-rYU",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/doctor-strange-2019_gp01.jpg",
      moTa: "Doctor Strange: Phù thủy tối thượng là một phim của điện ảnh Hoa Kỳ dựa trên nhân vật cùng tên của hãng Marvel Comics, sản xuất bởi Marvel Studios và phân phối bởi Walt Disney Studios Motion Pictures. Đây là bộ phim thứ 14 trong Marvel Cinematic Universe.",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-03-04T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: true,
      sapChieu: false,
    },
  ],

  dangChieu: false,
  sapChieu: false,
  all: true,
  arrFilmBackUp: [],
  thongTinPhim: {},
};

export const QuanLyFilmReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LAY_DANH_SACH_PHIM: {
      console.log(payload);
      state.arrFilm = payload;
      state.arrFilmBackUp = state.arrFilm;

      return { ...state };
    }

    case LAY_PHIM_DANG_CHIEU: {
      state.sapChieu = false;
      state.dangChieu = true;
      state.all = false;
      state.arrFilm = state.arrFilmBackUp.filter(
        (item) =>
          item.dangChieu === state.dangChieu && item.sapChieu === state.sapChieu
      );

      return { ...state };
    }

    case LAY_PHIM_SAP_CHIEU: {
      state.dangChieu = false;
      state.sapChieu = true;
      state.all = false;
      state.arrFilm = state.arrFilmBackUp.filter(
        (item) =>
          item.dangChieu === state.dangChieu && item.sapChieu === state.sapChieu
      );

      return { ...state };
    }

    case LAY_TAT_CA_PHIM: {
      state.all = true;
      state.dangChieu = false;
      state.sapChieu = false;
      state.arrFilm = state.arrFilmBackUp;
      return { ...state };
    }

    case LAY_THONG_TIN_PHIM: {
      return { ...state, thongTinPhim: payload };
    }
    default:
      return state;
  }
};
