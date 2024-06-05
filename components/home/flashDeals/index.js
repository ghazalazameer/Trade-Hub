import Countdown from '@/components/Countdown';
import styles from './styles.module.scss';
import FlashCard from './Card';

import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';
import { flashDealsArray } from '@/data/home';

export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
  <div className={styles.flashDeals__title}>
        <Countdown date={new Date(2023, 7, 25)} />
        <h3>
          <span>FLASH SALE</span>
          <img src="/images/limited.png" alt="" />
        </h3>
      </div>
    <Swiper
        slidesPerView={5}
        spaceBetween={250}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        <div className={styles.flashDeals__list}>
          {flashDealsArray.map((product, i) => (
            <SwiperSlide key={i}>
              <FlashCard product={product} />
            </SwiperSlide>
          ))}
        </div>        
      </Swiper>
    </div>
   
  )
}