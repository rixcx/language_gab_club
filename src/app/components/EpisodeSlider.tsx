'use client';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const data: string[] = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];

function App() {
  return (
    <>
      <Swiper
        spaceBetween={25}
        slidesPerView={1.5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((data) => (
          <SwiperSlide key={data}>
            <div style={{ background: "grey", height: "300px", }}>{data}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default App;