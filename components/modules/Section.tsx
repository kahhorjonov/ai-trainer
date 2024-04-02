import CarouselCards from "@/components/elements/CarouselCards";
import prisma from "@/prisma/client";
import { Container } from "@mui/material";
import { Status } from "@prisma/client";

interface ScriptQuery {
  status: Status;
  page: string;
}

interface Props {
  searchParams: ScriptQuery;
}

const Section = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 1;

  const script = await prisma.script.findMany({
    // where: { status: "CHECKING" },
    skip: (page - 1) * pageSize,
    take: 1,
  });

  // const scripts = await prisma.script.findMany({
  //   where: { status: "CHECKING" },
  //   skip: (page - 1) * pageSize,
  //   take: 5,
  // });

  const scriptCount = await prisma.script.count({
    where: { status: "CHECKING" },
  });

  const totalCount = await prisma.script.count({});

  return (
    <Container>
      <div className="w-full flex flex-col gap-4 mt-12">
        <CarouselCards
          script={script[0]}
          page={page}
          pageSize={pageSize}
          scriptCount={scriptCount}
          totalCount={totalCount}
        />
      </div>
    </Container>
  );
};

export const dynamic = "force-dynamic";

export default Section;
