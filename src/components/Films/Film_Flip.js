import React from "react";
import "./Film_Flip.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function FilmFlip(props) {
  let { film } = props;
  return (
    <div className="flip-card m-2 mb-14">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={film.hinhAnh}
            alt="Avatar"
            style={{ width: 300, height: 300 }}
            className="object-cover object-center"
          />
        </div>
        <div
          className="flip-card-back relative"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
        >
          <div className="absolute top-0 left-0">
            <img
              src={film.hinhAnh}
              alt="Avatar"
              style={{ width: 300, height: 300 }}
              className="object-cover object-center"
            />
          </div>
          <div
            className="w-full h-full absolute flex justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div>
              <div className="cursor-pointer rounded-full">
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>
              <div className="text-2xl mt-2 font-bold">{film.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-300 text-center cursor-pointer my-2 text-success-50 font-bold">
        <NavLink
          to={`/detail/${film.maPhim}`}
          className="text-white w-full block py-2"
        >
          {" "}
          ĐẶT VÉ
        </NavLink>
      </div>
    </div>
  );
}
