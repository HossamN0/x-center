import { TypographyH2, TypographyH3, TypographyP } from "@/components/ui/typography";
import { ApiUser } from "@/types/api"
import { useTranslations } from "next-intl";

function CourseInstructor({ data }: { data: ApiUser }) {
    const t = useTranslations('coursesContent');
    return (
        <section className="bg-primary/40 p-section">
            <div className="content-container">
                <TypographyH2>{t('instructor')}</TypographyH2>
                <div className="mt-4 p-6 bg-primary rounded-2xl border border-white/20">
                    <TypographyH3>{`${data?.first_name} ${data?.last_name}`}</TypographyH3>
                    <TypographyP className="!my-2">{data?.email}</TypographyP>
                    <TypographyP className="!my-2">{data?.phone}</TypographyP>
                </div>
            </div>
        </section>
    )
}

export default CourseInstructor
