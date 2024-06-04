import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import swiperStyles from "../../styles/swiper.module.css";
import Navbar from "./../components/Navbar";
import { Plankton } from "../../../lib/interfaces";
import { getPlanktons } from "../../../lib/PlanktonsServices";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import fontStyles from "../../styles/font.module.css";
import bgStyles from "../../styles/bg.module.css";

interface DisplayPlanktonsProps {
  items: Plankton[];
}

const DisplayProduct: React.FC<DisplayPlanktonsProps> = ({ items }) => {
  if (!Array.isArray(items)) {
    return <p>No products available.</p>;
  }

  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      effect={"coverflow"}
      grabCursor={false}
      centeredSlides={true}
      slidesPerView={3}
      pagination={{ clickable: true }}
      navigation={{ clickable: true }}
      coverflowEffect={{
        rotate: 25,
        stretch: 0,
        depth: 1000,
        modifier: 1,
        slideShadows: true,
      }}
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      }}
      modules={[EffectCoverflow, Navigation, Pagination]}
      className={`${swiperStyles.swiper} -mt-10 sm:max-sm:text-xs md:max-md:h-screen xs:max-sm:text-xs xs:max-sm:w-[400px] `}
    >
      {items.map((item: Plankton) => (
        <SwiperSlide
          className={` ${swiperStyles.swiperSlide} rounded-lg bg-[#06191E] p-5 xs:max-sm:text-xs sm:max-sm:text-xs xs:max-sm:w-[400px] md:text-xl`}
        >
          <img className={swiperStyles.swiperSlideImg} src={item.picture} />
          <h2
            className={`text-[#EEEE] ${fontStyles.mainFont} text-2xl mb-5 xs:max-sm:text-sm sm:text-sm md:text-2xl`}
          >
            {item.name}
          </h2>
          <p
            className={`text-[#EEEE] ${fontStyles.secondaryFont} w-auto h-40 m-auto text-justify overflow-auto xs:max-sm:text-xs sm:text-xs md:text-[11pt]`}
          >
            {item.description}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default function listPlanktons() {
  const [plankton, setPlankton] = useState<Plankton[]>([]);

  useEffect(() => {
    const fetchPlankton = async () => {
      try {
        const plankton = await getPlanktons();
        setPlankton(plankton);
      } catch (error) {
        console.error("Failed to fetch the product:", error);
      }
    };

    fetchPlankton();
  }, []);

  return (
    <div className={bgStyles.backgroundImage}>
      <Navbar />
      <DisplayProduct items={plankton} />
    </div>
  );
}
