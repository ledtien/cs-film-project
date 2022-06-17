import { GET_CAROUSEL } from "../constants/CarouselConstant";
import { quanLyPhimService } from "../../services/quanLyPhimService";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachBanner();

      dispatch({ type: GET_CAROUSEL, payload: result.data.content });
    } catch (error) {
      console.log(error);
    }
  };
};
