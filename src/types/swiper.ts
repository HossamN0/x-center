export interface SwiperProps {
    children: React.ReactNode;
    autoplay?: boolean;
    loop?: boolean;
    navigation?: boolean;
    ref?: any;
    height?: string;
    initialSlide?: number;
    showPagination?: boolean;
    spaceBetween?: number;
    centeredSlides?: boolean;
    slidesPerView?: any;
    breakpoints?: any;
    delay?: number;
}