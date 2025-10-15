'use client'

import SwiperUi from './swiper'
import { SwiperSlide } from 'swiper/react'
import CourseCard from './course-card'
import { CourseData } from '@/types/api'

function SwiperCourses({ data }: { data: { data: CourseData[] } }) {
    return (
        <SwiperUi spaceBetween={40}>
            {data?.data?.length > 0 && data?.data?.map((item: CourseData, index: number) => (
                <SwiperSlide className='max-w-[300px]'>
                    <CourseCard className='w-full h-[320px]' key={index} data={item} />
                </SwiperSlide>
            ))}
        </SwiperUi>
    )
}

export default SwiperCourses
