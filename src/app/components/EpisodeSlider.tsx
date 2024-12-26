'use client';
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface Episode {
  [x: string]: any;
}

interface EpisodeSliderProps {
  episodes: Episode[]; // サーバーコンポーネントから渡されるデータの型
}

export const EpisodeSlider = ({ episodes }: EpisodeSliderProps) => {
  return (
    <>
      <Swiper
        spaceBetween={25}
        slidesPerView={1.5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {episodes .map((episode) => (
          <SwiperSlide key={episode.id}>
            <div style={{ background: "grey", height: "100%", }}>
            <p>#{episode.properties.number.number}</p>
            <p>{episode.properties.title.title[0].plain_text}</p>
            <p>{episode.id}</p>
            <p>{episode.properties.date.date.start}</p>
            <p>{episode.paragraph}</p>
            <Link href={`/episode/${episode.properties.slug.rich_text[0].plain_text}/${episode.id}`}>【Listen】</Link>
            
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}