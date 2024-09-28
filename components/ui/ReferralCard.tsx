import { IUserData } from "@/interfaces/User.interface";
import aphosLogo from "@/public/aphos_logo.png";
import Image from "next/image";

const ReferralCard = ({
  referral,
  index,
}: {
  referral: IUserData;
  index: number;
}) => {
  return (
    <div className='border border-zinc-800 bg-zinc-900 rounded-lg p-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <div className='text-xl font-bold'>{index + 1}.</div>
          <div className='flex flex-col'>
            <div className='text-lg'>@{referral.username || "No_username"}</div>
            <div className='text-sm text-zinc-400'>({referral.telegramId})</div>
          </div>
        </div>
        <div className='justify-end flex items-center gap-x-2'>
          <span>+10K</span>
          <span>
            <Image
              src={aphosLogo}
              className='rounded-full'
              alt='aphos'
              width={20}
              height={20}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;
