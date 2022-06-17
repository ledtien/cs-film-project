import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
import "./HomeCarousel.css";

export default function HomeCarousel() {
  const { carouselBanners } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarouselAction());
  }, []);

  const contentStyle = {
    height: "700px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <Carousel autoplay effect="fade">
      {carouselBanners.map((banner, index) => {
        return (
          <div key={index}>
            <div
              style={{
                ...contentStyle,
                backgroundImage: `url(${banner.hinhAnh})`,
              }}
            >
              <img
                src={banner.hinhAnh}
                className="w-full opacity-0"
                alt={banner.maBanner}
              />
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
