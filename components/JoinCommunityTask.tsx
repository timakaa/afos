"use client";

import { userStore } from "@/store/user.store";
import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import CircleLoader from "./ui/CircleLoader/CircleLoader";
import DownModal from "./ui/DownModal";
import Image from "next/image";
import telegramLogo from "@/public/telegram-logo.png";
import aphosLogo from "@/public/aphos_logo.png";
import toast from "react-hot-toast";

const JoinCommunityTask = () => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const {
    user: { tasks },
    setTasks,
    setCoins,
  } = userStore();

  const userPassedTask = tasks?.find((task) => task.name === "join_community");

  const handleCheck = async () => {
    setIsChecking(true);
    try {
      const response = await fetch("/api/tasks/joinCommunity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.isMember) {
        setIsJoinOpen(false);
        if (data.userTasks) {
          setTasks(data.userTasks);
        }
        if (data.coins) {
          setCoins(data.coins);
        }
      } else {
        toast.error("You have not joined the community yet.");
        setIsJoinOpen(false);
      }
    } catch (error) {
      toast.error("An error occurred during the check.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          if (userPassedTask) {
            setIsJoinOpen(false);
          } else {
            setIsJoinOpen(true);
          }
        }}
        className='border flex justify-between items-center border-zinc-800 bg-zinc-900 cursor-pointer rounded-xl p-5'
      >
        <div className='flex gap-x-3 items-center'>
          <div>
            <Image
              src={telegramLogo}
              alt='Telegram Logo'
              width={50}
              height={50}
            />
          </div>
          <div>
            <div className='text-xl font-bold'>Join Our Community</div>
            <div className='mt-1 flex items-center gap-x-2'>
              <span>+20K</span>
              <span>
                <Image
                  src={aphosLogo}
                  alt='APHOS Logo'
                  width={30}
                  height={30}
                  className='rounded-full'
                />
              </span>
            </div>
          </div>
        </div>
        <div>
          {userPassedTask ? (
            <span className='text-green-500 text-3xl flex-shrink-0'>
              <IoIosCheckmark />
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <DownModal isOpen={isJoinOpen} setIsOpen={setIsJoinOpen}>
        <div className='flex flex-col items-center my-5'>
          <div className='text-3xl font-bold'>Join Our Community!</div>
          <div className='mt-5'>
            <button
              onClick={() =>
                window.open(process.env.NEXT_PUBLIC_COMMUNITY_LINK, "_blank")
              }
              className='btn btn-secondary py-2 px-10 font-bold'
            >
              Join
            </button>
          </div>
          <div className='mt-10'>
            <button
              onClick={handleCheck}
              disabled={isChecking}
              className='btn btn-success rounded-lg min-h-[65px] min-w-[200px] flex items-center justify-center font-extrabold text-2xl'
            >
              {isChecking ? <CircleLoader /> : <span>Check</span>}
            </button>
          </div>
        </div>
      </DownModal>
    </>
  );
};

export default JoinCommunityTask;
