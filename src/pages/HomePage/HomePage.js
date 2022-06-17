import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowsSlick from "../../components/ReactSlick/MultipleSlick/MultipleRowsSlick";
import { getDanhSachPhim } from "../../redux/actions/QuanLyFilmAction";
import { laythongTinLichChieuTheoRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import HomeMenu from "./HomeMenu/HomeMenu";

export default function HomePage() {
  const { arrFilm } = useSelector((state) => state.QuanLyFilmReducer);
  const { lichChieuTheoRap } = useSelector((state) => state.QuanLyRapReducer);

  const dispatch = useDispatch();
  // const renderFilm = () => {
  //   return arrFilm.map((film, index) => {
  //     return <Films key={index} />;
  //   });
  // };

  useEffect(() => {
    dispatch(getDanhSachPhim());
    dispatch(laythongTinLichChieuTheoRapAction());
  }, [dispatch]);

  return (
    <>
      <HomeCarousel />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRowsSlick arrFilm={arrFilm} />
          {/* <div className="flex flex-wrap -m-4 justify-center">
            {renderFilm()}
          </div> */}
        </div>
      </section>

      <div className="container px-5 mx-auto">
        <HomeMenu lichChieuTheoRap={lichChieuTheoRap} />
      </div>
    </>
  );
}
