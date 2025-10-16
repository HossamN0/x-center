import { fetchSSR } from "@/lib/utils/fetch-ssr";
import CourseDetails from "./_components/course-details";
import CourseInstructor from "./_components/course_instructor";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseReviews from "./_components/course_reviews";

export async function generateMetadata({
    params,
}: {
    params: { id: string }
}): Promise<Metadata> {
    const { id } = await params;
    const data = await fetchSSR(`/course/${id}`);
    const course = data?.data;

    if (data?.data?.length === 0) {
        return {
            title: "Course Not Found | My Platform",
            description: "This course could not be found.",
        };
    }

    return {
        title: `${course.title} | X-Center`,
        description: course.description,
        openGraph: {
            title: `${course.title} | X-Center`,
            description: course.description,
            images: [{
                url: course.image,
                alt: course.title,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${course.title} | X-Center`,
            description: course.description,
            images: [{
                url: course.image,
                alt: course.title,
            }]
        }
    }
}

async function CoursePage({
    params,
}: {
    params: { id: string }
}) {

    const { id } = await params;
    const data = await fetchSSR(`/course/${id}`);
    if (data?.data?.length === 0) notFound();
    return (
        <main>
            <CourseDetails data={data?.data} />
            <CourseInstructor data={data?.data?.instructor} />
            {data?.data?.reviews?.length > 0 &&
                <CourseReviews data={data?.data?.reviews} />
            }
        </main>
    )
}

export default CoursePage
