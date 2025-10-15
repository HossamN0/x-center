import { TypographyH1, TypographyH4 } from "@/components/ui/typography"
import { useTranslations } from "next-intl"

function HeroSection() {

    const t = useTranslations('heroSection');

    return (
        <section className="bg-[url('/assets/images/bg-main.webp')] bg-cover bg-center relative z-[1]">
            <div className="absolute top-0 left-0 w-full h-full bg-primary-foreground/75 -z-[1]"></div>
            <div className="content-container flex flex-col justify-center items-center min-h-[90vh]">
                <TypographyH1 className="text-white">
                    {t('title')}
                </TypographyH1>
                <TypographyH4 className="text-gray-300 my-4 max-w-[700px] text-center">
                    {t('description')}
                </TypographyH4>
            </div>
        </section>
    )
}

export default HeroSection
