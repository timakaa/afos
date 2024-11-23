"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

const CountDown = () => {
  const targetDate = useMemo(() => new Date("2024-12-10T00:00:00"), []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = useCallback(() => {
    const difference = +targetDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  return (
    <div>
      <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
        <div className='flex flex-col'>
          <span className='countdown font-semibold font-mono text-5xl'>
            <span
              className='font-bold'
              // @ts-expect-error ts bug
              style={{ "--value": timeLeft.days }}
            ></span>
          </span>
          days
        </div>
        <div className='flex font-semibold flex-col'>
          <span className='countdown font-mono text-5xl'>
            <span
              className='font-bold'
              // @ts-expect-error ts bug
              style={{ "--value": timeLeft.hours }}
            ></span>
          </span>
          hours
        </div>
        <div className='flex font-semibold flex-col'>
          <span className='countdown font-mono text-5xl'>
            <span
              className='font-bold'
              // @ts-expect-error ts bug
              style={{ "--value": timeLeft.minutes }}
            ></span>
          </span>
          min
        </div>
        <div className='flex font-semibold flex-col'>
          <span className='countdown font-mono text-5xl'>
            <span
              className='font-bold'
              // @ts-expect-error ts bug
              style={{ "--value": timeLeft.seconds }}
            ></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default CountDown;
