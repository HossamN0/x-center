'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper.css'
import { Swiper } from 'swiper/react';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules';
import { SwiperProps } from '@/types/swiper';


const SwiperUi = ({ delay = 3000, breakpoints, slidesPerView = 'auto', centeredSlides = false, showPagination = false, children, autoplay = false, loop = false, ref, height = '400px', initialSlide = 0, spaceBetween = 30 }: SwiperProps) => {

    // SwiperSlide

    return (
        <Swiper
            slidesPerView={slidesPerView}
            ref={ref}
            spaceBetween={spaceBetween}
            modules={[Pagination, Mousewheel, Autoplay]}
            pagination={showPagination ? { clickable: true } : false}
            style={{ height: height, width: '100%' }}
            loop={loop}
            autoplay={autoplay ? { delay, disableOnInteraction: false } : false}
            initialSlide={initialSlide}
            centeredSlides={centeredSlides}
            mousewheel={{ forceToAxis: true }}
            breakpoints={breakpoints || null}
            dir="ltr"
        >
            {children}
        </Swiper>
    )
}

export default SwiperUi
