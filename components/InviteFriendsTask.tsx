"use client";

import { userStore } from "@/store/user.store";
import React, { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import CircleLoader from "./ui/CircleLoader/CircleLoader";
import DownModal from "./ui/DownModal";
import Image from "next/image";
import aphosLogo from "@/public/aphos_logo.png";
import toast from "react-hot-toast";

const InviteFriendsTask = () => {
  const { telegramId } = userStore((state) => state.user);
  const INVITE_URL = `https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}/start`;

  const handleInvite = () => {
    const inviteLink = `${INVITE_URL}?startapp=${telegramId}`;
    const shareText = `Играй со мной в APHOS и посмотри на своих одноклассниц 👀`;

    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink,
    )}&text=${encodeURIComponent(shareText)}`;

    window.open(fullUrl, "_blank");
  };

  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const {
    user: { tasks },
    setTasks,
  } = userStore();

  const userPassedTask = tasks?.find((task) => task.name === "invite_friends");

  const handleCheck = async () => {
    setIsChecking(true);
    try {
      const response = await fetch("/api/tasks/inviteFriends", {
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
      } else {
        toast.error("You have not invited 5 friends yet.");
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
          <div className='bg-black rounded-full font-bold w-12 h-12 flex justify-center items-center'>
            2x
          </div>
          <div>
            <div className='text-xl font-bold'>Invite 5 Friends</div>
            <div className='mt-1 flex items-center gap-x-2'>
              <span>+50K</span>
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
          <div className='text-3xl font-bold'>Invite 5 Friends!</div>
          <div className='mt-5'>
            <button
              onClick={handleInvite}
              className='btn btn-secondary py-2 px-10 font-bold'
            >
              Invite
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

export default InviteFriendsTask;
