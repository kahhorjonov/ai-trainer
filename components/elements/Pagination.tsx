// "use client";

// import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
// import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
// import { Typography } from "@mui/material";
// import { useRouter, useSearchParams } from "next/navigation";

// interface Props {
//   itemCount: number;
//   pageSize: number;
//   currentPage: number;
// }

// const Pagination = ({ currentPage, pageSize, itemCount }: Props) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const pageCount = Math.ceil(itemCount / pageSize);
//   //   if (pageSize <= 1) return null;

//   const changePage = (page: number) => {
//     const params = new URLSearchParams(searchParams);

//     params.set("page", page.toString());
//     params.set("pageSize", pageSize.toString());
//     router.push("?" + params.toString());
//   };

//   return (
//     <div className="flex flex-col mt-12">
//       <div className="flex items-center gap-2">
//         <Typography className="text-xl">
//           Page {currentPage} of {pageCount}
//         </Typography>
//       </div>

//       <div className="flex justify-center">
//         <button className="w-28 h-28 rounded-full bg-slate-500">
//           <PlayCircleOutlinedIcon className="!w-24 !h-24 !fill-white" />
//         </button>
//       </div>

//       <div className="flex flex-col items-end gap-4">
//         <button
//           disabled={currentPage >= pageCount}
//           className="w-24 h-8 border border-zinc-400 rounded-3xl"
//           onClick={() => changePage(currentPage + 1)}
//         >
//           Next
//         </button>

//         <button className="flex items-center justify-center w-24 h-8 border border-zinc-400 rounded-3xl">
//           <KeyboardDoubleArrowRightOutlinedIcon /> Skip
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
