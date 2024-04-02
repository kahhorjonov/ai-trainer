"use client";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import VolumeDownOutlinedIcon from "@mui/icons-material/VolumeDownOutlined";
import { Typography } from "@mui/material";
import { Script } from "@prisma/client";
import axios from "axios";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  script: Script;
  page: number;
  pageSize: number;
  scriptCount: number;
  totalCount: number;
}

const CarouselCards = ({
  script,
  page,
  pageSize,
  scriptCount,
  totalCount,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(script?.description);
  const [isPlaying, setIsPlaying] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);

  const pageCount = Math.ceil(scriptCount / pageSize);
  //   if (pageSize <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    router.push("?" + params.toString());
  };

  const changeScript = async (description: string) => {
    setDescription(description);
  };

  const changeScriptStatus = async (id: string) => {
    try {
      description &&
        (await axios.patch(`/api/scripts/${id}`, { description: description }));
      toast.success("Changes saved");
      changePage(page + 1);
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    setDescription(script?.description);
  }, [script]);

  return (
    <>
      <div className="flex flex-col items-center p-8">
        <div className="w-full flex items-center justify-between">
          <div className="max-w-[50rem] mx-auto">
            <Swiper
              // allowSlideNext={false}
              // allowSlidePrev={false}
              // freeMode={false}
              slidesPerView={1}
              slidesPerGroup={1}
              centeredSlides
            >
              <SwiperSlide className="relative flex justify-center items-center">
                <div className="flex justify-center items-center text-light w-[48rem] h-96 bg-slate-500 p-6 rounded-md overflow-y-auto">
                  {editing ? (
                    <textarea
                      value={description}
                      className="w-full h-[95%] max-h-[95%] min-h-[80%] rounded-md"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  ) : (
                    <p className="text-white text-xl text-center pt-6">
                      {description}
                    </p>
                  )}
                </div>

                <div className="absolute top-2 right-6 flex items-center justify-center gap-2">
                  {editing && scriptCount > 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckOutlinedIcon
                        className="fill-white"
                        onClick={() => {
                          changeScript(description);
                          setEditing(false);
                        }}
                      />
                      <DoNotDisturbAltOutlinedIcon
                        className="fill-white"
                        onClick={() => {
                          setDescription(script?.description);
                          setEditing(false);
                        }}
                      />
                    </div>
                  ) : (
                    scriptCount > 0 && (
                      <EditOutlinedIcon
                        className="fill-white"
                        onClick={() => setEditing(true)}
                      />
                    )
                  )}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="w-1/5 flex flex-col justify-end gap-2">
            <div
              className={classNames({
                "justify-between": true,
                "w-24 flex items-center px-2 py-1 border border-zinc-500 rounded-3xl":
                  true,
              })}
            >
              <VolumeDownOutlinedIcon className="w-6 h-6 !fill-zinc-500" />

              <div className="!flex !justify-center !items-center !w-6 !h-6 !rounded-full !bg-zinc-500 !text-white text-sm">
                <p>{scriptCount > 0 ? page : 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col mt-12">
          <div className="flex flex-col justify-center items-start gap-2">
            <Typography className="text-xl">
              Ready for checking {scriptCount}
            </Typography>

            <Typography className="text-xl">
              Page {page} of {totalCount}
            </Typography>

            <Typography className="text-xl">
              Total count {totalCount}
            </Typography>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-slate-500" />
            <audio
              ref={audioRef}
              src={script.audioUrl || ""}
              onEnded={() => setIsPlaying(false)} // Set isPlaying to false when audio ends
            />

            {isPlaying ? (
              <PauseCircleOutlinedIcon
                className="!w-24 !h-24 !fill-white absolute cursor-pointer"
                onClick={pauseAudio}
              />
            ) : (
              <PlayCircleOutlinedIcon
                className="!w-24 !h-24 !fill-white absolute cursor-pointer"
                onClick={playAudio}
              />
            )}
          </div>

          {/* <div className="flex justify-center">
            <audio
              src={script.audioUrl || ""}
              className="w-28 h-28 rounded-full bg-slate-500"
            >
              <PlayCircleOutlinedIcon className="!w-24 !h-24 !fill-white" />
            </audio>
          </div> */}

          <div className="flex flex-col items-end gap-4">
            <button
              disabled={scriptCount <= 0 || scriptCount === page}
              className="w-24 h-8 border border-zinc-400 rounded-3xl"
              onClick={() => changeScriptStatus(script.id.toString())}
            >
              Next
            </button>

            <button
              className="flex items-center justify-center w-24 h-8 border border-zinc-400 rounded-3xl"
              disabled={scriptCount <= 0}
              onClick={() => {
                changePage(page + 1);
              }}
            >
              <KeyboardDoubleArrowRightOutlinedIcon />
              Skip
            </button>
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export const dynamic = "force-dynamic";

export default CarouselCards;
