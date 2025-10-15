import Link from '@/components/link'
import DotGrid from '@/components/react-bits/DotGrid'
import { buttonVariants } from '@/components/ui/button'
import SwiperCourses from '@/components/ui/swiper-course'
import { TypographyH2 } from '@/components/ui/typography'
import { Routes } from '@/constants/enum'
import { fetchSSR } from '@/lib/utils/fetch-ssr'
import { getTranslations } from "next-intl/server"

async function CourseSection() {

    const data = await fetchSSR('/course');
    const t = await getTranslations('coursesContent')

    return (
        <section className="p-section relative bg-primary-foreground overflow-hidden">
            <div className="absolute inset-0 z-0">
                <DotGrid
                    dotSize={10}
                    gap={15}
                    baseColor="#023047"
                    activeColor="#8ECAE6"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            <div className="relative z-10 content-container">
                <div className='flex justify-between items-center'>
                    <TypographyH2 className="mb-8 text-white">{t('recentCourses')}</TypographyH2>
                    <Link href={`/${Routes.COURSES}`} className={`${buttonVariants()}`}>{t('allcourses')}</Link>
                </div>
                {data?.data?.length > 0 ?
                    <SwiperCourses data={data} />
                    :
                    <TypographyH2 className='flex-center min-h-[400px] text-white'>{t('noCourses')}</TypographyH2>
                }
            </div>
        </section>
    )
}

export default CourseSection