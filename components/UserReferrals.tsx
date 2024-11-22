"use client";

import { userStore } from "@/store/user.store";
import React from "react";
import ReferralCard from "./ui/ReferralCard";

const UserReferrals = () => {
  const { referrals, referredBy } = userStore((state) => state.user);
  return (
    <div>
      {referredBy && (
        <div className='mb-5'>
          You were referred by @{referredBy.username}
          <span className='text-zinc-400'>({referredBy.telegramId})</span>
        </div>
      )}
      <div>
        <h2 className='text-xl font-semibold'>Your Referrals</h2>
      </div>
      <div className='flex flex-col gap-y-4 mt-3'>
        {referrals && referrals.length ? (
          referrals.map((referral, index) => (
            <ReferralCard
              key={referral.telegramId}
              referral={referral}
              index={index}
            />
          ))
        ) : (
          <div className='text-center text-lg font-semibold mt-5'>
            You have no referrals yet
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReferrals;
