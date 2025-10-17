import { fetchSSR } from "@/lib/utils/fetch-ssr";
import QuestionsSection from "./_components/questions";

async function ExamPage({
    params,
}: {
    params: { id: string }
}) {

    const { id } = await params;
    const data = await fetchSSR(`/course/exam/${id}`);

    return (
        <main>
            {data?.questions?.length > 0 &&
                <QuestionsSection questions={data?.questions} />
            }
        </main>
    )
}

export default ExamPage
