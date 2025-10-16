'use client'

import StarRating from "@/components/form-fields/rating-radio";
import Textarea from "@/components/form-fields/text-area";
import { Button } from "@/components/ui/button";
import { courseReview } from "@/server/actions/course";
import { ReviewFormProps } from "@/types/api";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ReviewForm({ course_id }: { course_id: number }) {

    const t = useTranslations("form");
    const { register, handleSubmit, formState: { errors } } = useForm<ReviewFormProps>({
        defaultValues: { course_id: course_id }
    });
    const onSubmit: SubmitHandler<ReviewFormProps> = async (data) => {
        console.log(data)
        const res = await courseReview({ data });
        if (res?.error) {
            return toast.error(res?.error);
        }
        if (res?.success) {
            toast.success(t('rating.rating_success'));
        }
    }
    return (
        <section className="p-section">
            <form onSubmit={handleSubmit(onSubmit)} className="content-container space-y-7">
                <Textarea
                    label={t("rating.description")}
                    name="description"
                    placeholder={t("rating.descPlaceholder")}
                    register={register}
                    errors={errors}
                    text="text-md"
                />
                <StarRating
                    label={t("rating.rating")}
                    name="review_num"
                    register={register}
                    required={true}
                    errors={errors}
                    defaultValue={0}
                    size="md"
                />
                <Button>{t('submit')}</Button>
            </form>
        </section>
    )
}

export default ReviewForm
