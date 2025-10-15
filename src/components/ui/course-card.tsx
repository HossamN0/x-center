import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Routes } from "@/constants/enum"
import { CourseData } from "@/types/api"
import TruncateText from "./truncateText"
import Link from "../link"

function CourseCard(
    {
        data,
        className
    }: {
        data: CourseData;
        className?: string
    }
) {

    const name = `${data?.instructor?.first_name} ${data?.instructor?.last_name}`

    return (
        <div className={`relative mx-auto ${className} rounded-2xl border border-white/20 overflow-hidden group transition-transform duration-300 hover:scale-[1.03]`}>
            <div className="absolute inset-0 p-[2px] bg-gradient-to-tr from-purple-500 to-orange-400 rounded-2xl">
                <div className="relative h-full rounded-2xl overflow-hidden">
                    <Image alt={data?.title} src={data?.image} layout="fill" objectFit="cover" />
                </div>
            </div>

            <div className="relative z-10 w-8/12 h-full p-3 flex flex-col justify-between backdrop-blur-lg bg-black/30 rounded-2xl overflow-hidden">
                <div className="absolute w-full h-full left-0 top-0 bg-black opacity-50 -z-10"></div>
                <div className="flex justify-between items-start text-gray-300">
                    <div>
                        <h3 className="text-lg font-semibold">{TruncateText({ text: `${data?.title}`, maxLength: 19 })}</h3>
                        <p className="text-xs text-gray-400">{TruncateText({ text: `${data?.subtitle}`, maxLength: 26 })}</p>
                    </div>
                    <span className="text-[10px] text-gray-400">{new Date(data?.created_at).getFullYear()}</span>
                </div>

                <div className="text-sm text-gray-400 mt-4 break-words">
                    {TruncateText({ text: data?.description, maxLength: 200 })}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-white bg-gradient-to-r from-purple-500 to-orange-400 py-1.5 px-3 rounded-full transition-all duration-300 hover:brightness-110">
                        {TruncateText({ text: name, maxLength: 10 })}
                    </div>

                    <Link href={`/${Routes.COURSES}/${data?.id}`} className="rtl:scale-x-[-1] w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all duration-300">
                        <ChevronRight />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CourseCard