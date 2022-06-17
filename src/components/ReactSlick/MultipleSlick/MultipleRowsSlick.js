import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LAY_PHIM_DANG_CHIEU,
  LAY_PHIM_SAP_CHIEU,
  LAY_TAT_CA_PHIM,
} from "../../../redux/constants/QuanLyFilmConstant";
import styleSlick from "./MultipleRowsSlick.module.css";
import Slider from "react-slick";
import FilmFlip from "../../Films/Film_Flip";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleSlick["slick-next"]} `}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default function MultipleRowsSlick(props) {
  const dispatch = useDispatch();
  let { all, dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyFilmReducer
  );

  let activeClassDC = dangChieu ? "active_film" : "none_active_film";
  let activeClassSC = sapChieu ? "active_film" : "none_active_film";
  let activeClassAll = all ? "active_film" : "none_active_film";

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((film, index) => {
      return <FilmFlip className="mt-2" key={index} film={film} />;
    });
  };

  return (
    <div>
      <button
        className={`px-8 py-3 font-semibold border rounded border-orange-300 ${styleSlick[activeClassAll]}`}
        onClick={() => {
          dispatch({ type: LAY_TAT_CA_PHIM });
        }}
      >
        TẤT CẢ
      </button>
      <button
        className={`px-8 py-3 font-semibold border rounded border-orange-300   ml-2 ${styleSlick[activeClassDC]} `}
        onClick={() => {
          dispatch({ type: LAY_PHIM_DANG_CHIEU });
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        className={`px-8 py-3 font-semibold border rounded border-orange-300   ml-2 ${styleSlick[activeClassSC]} `}
        onClick={() => {
          dispatch({ type: LAY_PHIM_SAP_CHIEU });
        }}
      >
        PHIM SẮP CHIẾU
      </button>
      <Slider {...settings}>{renderFilm()}</Slider>
    </div>
  );
}
