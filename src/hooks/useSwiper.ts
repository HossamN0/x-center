'use client'

import { useRef } from "react";

export const useSwiper = () => {
    const swiperRef = useRef<any>(null);

    const handleNext = ()=>{
        if(swiperRef.current){
            swiperRef.current.swiper.slideNext();
        }
    }

    const handlePrev = ()=>{
        if(swiperRef.current){
            swiperRef.current.swiper.slidePrev();
        }
    }

    return { swiperRef, handleNext, handlePrev }
}
