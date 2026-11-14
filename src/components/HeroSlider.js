"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    img: "https://picsum.photos/seed/studio-photo/1600/900",
    title: "Find the perfect light for your next shoot",
    text: "Cyc walls, natural-light lofts and pro photo studios, ready to book by the hour.",
  },
  {
    img: "https://picsum.photos/seed/studio-sound/1600/900",
    title: "Record your sound in a space built for it",
    text: "Podcast lounges and music suites with treated rooms and pro-grade gear.",
  },
  {
    img: "https://picsum.photos/seed/studio-stage/1600/900",
    title: "Turn your vision into production",
    text: "Sound stages and art workshops from verified hosts, with transparent pricing.",
  },
];

export default function HeroSlider() {
  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-[70vh] min-h-[480px]"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div
              className="relative h-full w-full bg-cover bg-center bg-neutral"
              style={{ backgroundImage: `url(${s.img})` }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start gap-5 text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold max-w-3xl leading-tight">
                  {s.title}
                </h1>
                <p className="text-base sm:text-lg max-w-xl text-white/85">{s.text}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/studios" className="btn btn-primary btn-lg">Explore Studios</Link>
                  <Link href="/add-studio" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}