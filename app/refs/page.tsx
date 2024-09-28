"use client";

import UserReferrals from "@/components/UserReferrals";
import { userStore } from "@/store/user.store";
import friendsPhoto from "@/public/friends.png";
import Image from "next/image";

const page = () => {
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

  return (
    <div className='py-5 px-4 pb-20'>
      <div className='my-10 flex flex-col items-center gap-y-5'>
        <div>
          <Image
            src={friendsPhoto}
            className='bg-zinc-800 p-4 rounded-full'
            alt='Friends'
            width={140}
            height={140}
          />
        </div>
        <h1 className='text-3xl font-extrabold'>Invite your friends!</h1>
        <div className='flex flex-col gap-y-2'>
          <div className='text-base text-zinc-500'>
            <span>+10K APHOS for each friend</span>
          </div>
          <div className='text-base text-zinc-500'>
            <span>+1K APHOS to invited friend</span>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleInvite}
          className='w-full btn btn-secondary py-3 font-bold text-lg'
        >
          Invite
        </button>
      </div>
      <div className='mt-5'>
        <UserReferrals />
      </div>
    </div>
  );
};

export default page;
