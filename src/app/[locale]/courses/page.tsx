import DotGrid from "@/components/react-bits/DotGrid"
import CourseCard from "@/components/ui/course-card"
import SearchComponent from "@/components/api-components/search-component";
import { fetchSSR } from "@/lib/utils/fetch-ssr"
import { CourseData } from "@/types/api"
import PaginationComponent from "@/components/api-components/pagination-component";
import { TypographyH2 } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";

async function CoursesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const params = await searchParams;
    const page = params.page || "1";
    const search = params.search || "";
    const t = await getTranslations()

    const data = await fetchSSR(`/course?page=${page}&limit=6&search=${search}`);

    return (
        <section className="p-section relative min-h-screen bg-primary-foreground overflow-hidden">
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

            <div className="content-container relative z-10">
                <TypographyH2 className="mb-8 text-white">{t('coursesContent.allcourses')}</TypographyH2>
                <SearchComponent />
                <ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 my-20">
                    {data?.data?.length > 0 && data?.data?.map((item: CourseData, index: number) =>
                        <li key={index}>
                            <CourseCard className="h-[300px] max-w-[350px]" data={item} />
                        </li>
                    )}
                </ul>
                {data?.data?.length === 0 && <TypographyH2 className='flex-center min-h-[400px] text-white'>{t('coursesContent.noCourses')}</TypographyH2>}
                {data?.pagination?.total > 0 &&
                    <PaginationComponent data={data?.pagination} />
                }
            </div>
        </section>
    )
}

export default CoursesPage
