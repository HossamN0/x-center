'use client';

import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyH4, TypographyP } from "@/components/ui/typography"
import { enrollInCourse } from "@/server/actions/course";
import { CourseData } from "@/types/api"
import { useTranslations } from "next-intl"
import Image from "next/image"
import toast from "react-hot-toast";

function CourseDetails({ data, session }: { data: CourseData; session: any }) {

    const t = useTranslations('coursesContent');
    const handleEnroll = async () => {
        if (data?.id) {
            const res = await enrollInCourse({ course_id: data?.id });
            if (res?.error) {
                return toast.error(res?.error);
            }
            if (res?.success) {
                toast.success(t('enroll_pending'));
            }
        }
    }
    return (
        <section className="p-section bg-primary">
            <div className="content-container">
                <div className="grid md:grid-cols-2 items-center gap-11">
                    <div className="order-last md:order-first">
                        <TypographyH2>{data?.title}</TypographyH2>
                        <TypographyH4>{data?.subtitle}</TypographyH4>
                        <TypographyP>{data?.description}</TypographyP>
                        <TypographyH4 className="bg-white w-fit rounded-2xl py-1 px-2 my-4">
                            {t('egp', { price: data?.price })}
                        </TypographyH4>
                    </div>
                    <div>
                        <div className="relative min-h-82 w-full rounded-2xl bg-accent-foreground overflow-hidden">
                            <Image src={data?.image} alt={data?.title} objectFit="contain" layout="fill" />
                        </div>
                        {(data?.enroll !== 'accepted' && session) &&
                            <Button onClick={handleEnroll} type="submit" disabled={data?.enroll === 'pending'} variant={'secondary'} className="w-full mt-6 py-5">
                                {data?.enroll === 'pending' ? t('pending') : t('enroll')}
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetails
