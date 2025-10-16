import { fetchSSR } from "@/lib/utils/fetch-ssr";
import CourseDetails from "./_components/course-details";
import CourseInstructor from "./_components/course_instructor";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseReviews from "./_components/course_reviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth";
import ReviewForm from "./_components/review-form";
import ChapterSection from "./_components/course_chapters";

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
    const session = await getServerSession(authOptions);
    if (data?.data?.length === 0) notFound();
    const enrolled = (data?.data?.enroll && data?.data?.enroll === 'accepted')
    console.log('course data', data?.data?.chapters);
    return (
        <main>
            <CourseDetails session={session?.user ?? null} data={data?.data} />
            <CourseInstructor data={data?.data?.instructor} />
            {(enrolled && data?.data?.chapters?.length > 0) &&
                <ChapterSection data={data?.data?.chapters} />
            }
            {data?.data?.reviews?.length > 0 &&
                <CourseReviews data={data?.data?.reviews} />
            }
            {enrolled &&
                <ReviewForm course_id={data?.data?.id} />
            }
        </main>
    )
}

export default CoursePage
