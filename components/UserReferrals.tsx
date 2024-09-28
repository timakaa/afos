"use client";

import { userStore } from "@/store/user.store";
import React from "react";
import ReferralCard from "./ui/ReferralCard";

const UserReferrals = () => {
  const { referrals, referredBy } = userStore((state) => state.user);
  const user = userStore((state) => state.user);
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
        <ReferralCard referral={user} index={0} />
        <ReferralCard referral={user} index={1} />
        <ReferralCard referral={user} index={2} />
        <ReferralCard referral={user} index={3} />
        <ReferralCard referral={user} index={4} />
        <ReferralCard referral={user} index={5} />
        <ReferralCard referral={user} index={6} />
        <ReferralCard referral={user} index={7} />
        <ReferralCard referral={user} index={8} />
        <ReferralCard referral={user} index={9} />
        <ReferralCard referral={user} index={10} />
        <ReferralCard referral={user} index={11} />
        <ReferralCard referral={user} index={12} />
        <ReferralCard referral={user} index={13} />
        <ReferralCard referral={user} index={14} />
        <ReferralCard referral={user} index={15} />
        {referrals.map((referral, index) => (
          <ReferralCard
            key={referral.telegramId}
            referral={referral}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default UserReferrals;
