import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchData } from "@/lib/fetchData";
import { ContentResponse } from "@/types/ContentResponse";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function DynamicPathPage(context: { params: { path: string[] } }) {
    const params = await context.params;
    const session = await getServerSession(authOptions);
    const fullPath = params.path.join("/");

    const response = await fetchData<ContentResponse>(
        `http://localhost:5000/api/v1/repositories/${fullPath}`,
        session?.accessToken as string,
    );

    return <MarkdownRenderer markdown={response?.content || ""} />;
}