'use client'

import Radio from "@/components/form-fields/radio"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { TypographyH2 } from "@/components/ui/typography"
import { submitExam } from "@/server/actions/course"
import { Question } from "@/types/api"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

function QuestionsSection({ questions }: { questions: Question[] }) {

    const [degree, setDegree] = useState<number | null>(null);
    const t = useTranslations("form");
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({
        defaultValues: {
            exam_id: questions[0]?.exam_id
        }
    });
    const onSubmit: SubmitHandler<any> = async (data) => {
        const res = await submitExam({ data });
        if (res?.success) {
            setDegree(res?.data?.your_score)
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const response = res as any
            if (response?.your_score !== null && response?.your_score !== undefined) {
                setDegree(response?.your_score!);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            toast.error(response?.message);
        }
    }
    return (
        <section className="p-section">
            <div className="content-container">
                {(typeof degree === "number") &&
                    <TypographyH2 className="mt-10 text-green-800 text-center my-20">{t("your_score", { score: degree })}</TypographyH2>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ul className="space-y-10">
                        {questions.map((question, index: number) => {
                            const answerRegister = register(`answers[${index}][answer_id]`, {
                                required: t("required", { field: question.question }),
                            });
                            return (
                                <li key={question?.id}>
                                    <TypographyH2>{index + 1} - {question?.question}</TypographyH2>
                                    {question?.image &&
                                        <div className="relative w-80 h-80 rounded-md overflow-hidden">
                                            <Image src={question?.image} alt={question?.question} layout="fill" objectFit="cover" />
                                        </div>
                                    }
                                    <div>
                                        {question?.answers?.map((answer) =>
                                            <div key={answer.id} className="w-fit">
                                                <input
                                                    value={question.id}
                                                    type="hidden"
                                                    {...register(`answers[${index}][question_id]`)}
                                                />
                                                <Radio
                                                    key={answer.id}
                                                    label={answer.answer}
                                                    value={answer.id}
                                                    name={`answers[${index}][answer_id]`}
                                                    register={() => answerRegister}
                                                    watch={watch}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {(errors?.answers as any)?.[index]?.answer_id && (
                                        <Label className="text-red-500 mt-3 font-normal">
                                            {(errors.answers as any)[index].answer_id.message}
                                        </Label>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                    <Button type="submit" className="mt-10">{t("submit")}</Button>
                </form>
            </div>
        </section>
    )
}

export default QuestionsSection