import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

export default function Carousel({ fotos }) {
  return (
    <Swiper
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      <SwiperSlide>
        <img src={fotos[0]} className="w-100" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={fotos[1]} className="w-100" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={fotos[2]} className="w-100" />
      </SwiperSlide>
    </Swiper>
  );
}
