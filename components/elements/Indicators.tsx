"use client";

import VolumeDownOutlinedIcon from "@mui/icons-material/VolumeDownOutlined";
import { Script } from "@prisma/client";
import classNames from "classnames";

interface Props {
  script: Script;
}

const Indicators = ({ script }: Props) => {
  return (
    <div
      className={classNames({
        "justify-between": true,
        "w-24 flex items-center px-2 py-1 border border-zinc-500 rounded-3xl":
          true,
      })}
    >
      <VolumeDownOutlinedIcon className="w-6 h-6 !fill-zinc-500" />

      <div className="!flex !justify-center !items-center !w-6 !h-6 !rounded-full !bg-zinc-500 !text-white text-sm">
        <p>{script.id}</p>
      </div>
    </div>
  );
};

export default Indicators;
