import Link from "@/components/link";
import { truncateText } from "@/components/ui/truncateText";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import { Chapter } from "@/types/api"
import { useTranslations } from "next-intl";

function ChapterSection({ data }: { data: Chapter[] }) {
    const t = useTranslations('coursesContent');
    return (
        <section className="p-section">
            <div className="content-container">
                <TypographyH2>{t('chapters')}</TypographyH2>
                <ul className="space-y-4 mt-7">
                    {data?.map((chapter) =>
                        <li key={chapter?.id}>
                            <Link target='_blank' href={chapter?.content}><TypographyH3 className="break-words break-all whitespace-pre-line">- {truncateText(chapter?.title, 50)}</TypographyH3></Link>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
}

export default ChapterSection
