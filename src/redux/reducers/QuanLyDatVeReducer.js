import {
  CHUYEN_TAB,
  DAT_VE_HOAN_TAT,
  DAT_VE_PHIM,
  GET_CHI_TIET_PHONG_VE,
} from "../constants/QuanLyDatVeConstant";

const initialState = {
  phongVeDetail: {},
  arrGheDangDat: [],
  tabActive: "1",
  arrGheKhachDat: [{ maGhe: 93801 }, { maGhe: 93802 }],
};

export const QuanLyDatVeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHI_TIET_PHONG_VE: {
      return { ...state, phongVeDetail: payload };
    }

    case DAT_VE_PHIM: {
      let gheDuocChon = [...state.arrGheDangDat];
      let index = gheDuocChon.findIndex(
        (gheDC) => gheDC.maGhe === payload.maGhe
      );
      if (index !== -1) {
        gheDuocChon.splice(index, 1);
      } else {
        gheDuocChon.push(payload);
      }
      return { ...state, arrGheDangDat: gheDuocChon };
    }

    case DAT_VE_HOAN_TAT: {
      state.arrGheDangDat = [];
      return { ...state };
    }

    case CHUYEN_TAB: {
      return { ...state, tabActive: "2" };
    }

    case "CHUYEN_TAB_ACTIVE": {
      return { ...state, tabActive: payload };
    }
    default:
      return state;
  }
};
