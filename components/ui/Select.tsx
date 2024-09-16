"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "@/hooks/useClickAway";
import { MdOutlineExpandMore } from "react-icons/md";

const Select = ({
  options,
  state,
  setState,
  defaultTitle,
  disabled = false,
}: {
  options: Record<"value" | "label", string>[] | undefined;
  state: string | null;
  setState: Dispatch<SetStateAction<string | null>>;
  defaultTitle?: string;
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickAway({
    func: () => setIsOpen(false),
    refs: [buttonRef, containerRef],
  });

  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={`w-full ${
          disabled ? "bg-zinc-700 text-zinc-300" : "bg-zinc-800"
        } flex justify-between items-center relative  rounded-md p-2 border border-zinc-700`}
      >
        <span className='font-bold'>
          {options?.find((el) => el.value === state)?.label ||
            defaultTitle ||
            "All"}
        </span>
        <span
          className={`duration-100 text-xl ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <MdOutlineExpandMore />
        </span>
      </button>
      <AnimatePresence mode='wait'>
        {isOpen ? (
          <motion.div
            ref={containerRef}
            initial='from'
            animate='to'
            exit='from'
            variants={{ from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.1 }}
            className='absolute rounded-md max-h-[300px] overflow-y-auto top-14 z-20 w-full bg-zinc-800 border border-zinc-700'
          >
            <button
              onClick={() => {
                setState(null);
                setIsOpen(false);
              }}
              className={`p-2 text-start block w-full ${
                null == state ? "bg-zinc-900" : ""
              }`}
            >
              {defaultTitle || "All"}
            </button>
            {options?.map((opt, index) => (
              <button
                key={index}
                className={`p-2 text-start block w-full ${
                  opt.value === state ? "bg-zinc-900" : ""
                }`}
                onClick={() => {
                  setState(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
