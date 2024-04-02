import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

const Controls = () => {
  return (
    <div className="flex flex-col mt-12">
      <div className="flex justify-center">
        <button className="w-28 h-28 rounded-full bg-slate-500">
          <PlayCircleOutlinedIcon className="w-28 h-28 fill-white" />
        </button>
      </div>

      <div className="flex flex-col items-end gap-4">
        <button className="flex items-center justify-center w-24 h-8 border border-zinc-400 rounded-3xl">
          <KeyboardDoubleArrowRightOutlinedIcon /> Skip
        </button>

        <button className="w-24 h-8 border border-zinc-400 rounded-3xl">
          Next
        </button>
      </div>
    </div>
  );
};

export default Controls;
