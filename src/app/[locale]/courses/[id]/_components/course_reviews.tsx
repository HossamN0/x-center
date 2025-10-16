import RatingStars from "@/components/ui/ratingStars"
import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { Review } from "@/types/api"

function CourseReviews({ data }: { data: Review[] }) {
    return (
        <section>
            <div className="content-container p-section">
                <div>
                    <TypographyH2>Reviews</TypographyH2>
                    <ul className="text-white space-y-5">
                        {data?.map((review) => (
                            <li key={review?.id} className="bg-primary-foreground rounded-2xl flex-center flex-col gap-4 p-6 md:p-10">
                                <TypographyP>{review?.description}</TypographyP>
                                <RatingStars num={review?.review_num as number} />
                                <TypographyP>- {review?.student?.first_name} {review?.student?.last_name}</TypographyP>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default CourseReviews
