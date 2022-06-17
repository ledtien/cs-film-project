import { GET_CAROUSEL } from "../constants/CarouselConstant";

const initialState = {
  carouselBanners: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const CarouselReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CAROUSEL: {
      return { ...state, carouselBanners: payload };
    }
    default:
      return state;
  }
};
