import { TypographyH2, TypographyH4, TypographyP } from "@/components/ui/typography"
import { CourseData } from "@/types/api"
import { useTranslations } from "next-intl"
import Image from "next/image"

function CourseDetails({ data }: { data: CourseData }) {

    const t = useTranslations('coursesContent');

    return (
        <section className="p-section bg-primary">
            <div className="content-container">
                <div className="grid md:grid-cols-2 items-center gap-11">
                    <div className="order-last md:order-first">
                        <TypographyH2>{data?.title}</TypographyH2>
                        <TypographyH4>{data?.subtitle}</TypographyH4>
                        <TypographyP>{data?.description}</TypographyP>
                        <TypographyH4 className="bg-white w-fit rounded-2xl py-1 px-2 my-4">{t('egp', { price: data?.price })}</TypographyH4>
                    </div>
                    <div className="relative min-h-82 w-full rounded-2xl bg-accent-foreground overflow-hidden">
                        <Image src={data?.image} alt={data?.title} objectFit="contain" layout="fill" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetails
