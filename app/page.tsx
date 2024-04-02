import MainPage from "@/components/templates/MainPage";
import { Script, Status } from "@prisma/client";

interface ScriptQuery {
  status: Status;
  orderBy: keyof Script;
  page: string;
}

interface Props {
  searchParams: ScriptQuery;
}

export default function Home({ searchParams }: Props) {
  return (
    <main className="flex min-h-screen max-w-screen flex-col items-center justify-between">
      <MainPage searchParams={searchParams} />
    </main>
  );
}
