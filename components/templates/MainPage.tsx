import { Script, Status } from "@prisma/client";
import Header from "../modules/Header";
import Section from "../modules/Section";

interface ScriptQuery {
  status: Status;
  orderBy: keyof Script;
  page: string;
}

interface Props {
  searchParams: ScriptQuery;
}

const MainPage = ({ searchParams }: Props) => {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Section searchParams={searchParams} />
    </div>
  );
};

export default MainPage;
