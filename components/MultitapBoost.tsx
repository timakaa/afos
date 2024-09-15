"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { useClickAway } from "../hooks/useClickAway";
import Modal from "./ui/Modal";

const MultitapBoost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [level] = useState(3);

  const infoButtonRef = useRef(null);
  const infoRef = useRef(null);

  useClickAway({
    func: () => setIsOpen(false),
    refs: [infoButtonRef, infoRef],
  });

  return (
    <>
      <div className='w-full bg-zinc-900 border border-zinc-800 py-4 rounded-lg px-5'>
        <div className='flex justify-between items-center'>
          <div>
            <div className='relative'>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className='text-zinc-400'
                ref={infoButtonRef}
              >
                <FiInfo />
              </button>
              <AnimatePresence mode='wait'>
                {isOpen ? (
                  <motion.div
                    initial='from'
                    animate='to'
                    exit='from'
                    variants={{
                      from: { y: "10px", opacity: 0 },
                      to: { y: "0", opacity: 1 },
                    }}
                    ref={infoRef}
                    transition={{
                      duration: 0.1,
                      ease: "easeInOut",
                      bounce: true,
                    }}
                    className='absolute w-[200px] -left-3 top-6 z-20 bg-zinc-950 border border-zinc-800 p-3 rounded-md'
                  >
                    <span>Increases the number of AFOS per click</span>
                    <br />
                    <br />
                    <span>1. 2 AFOS</span>
                    <br />
                    <span>2. 3 AFOS</span>
                    <br />
                    <span>3. 5 AFOS</span>
                    <br />
                    <span>4. 7 AFOS</span>
                  </motion.div>
                ) : (
                  ""
                )}
              </AnimatePresence>
            </div>
            <div className='text-xl font-bold'>Multitap</div>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='btn btn-primary px-5 py-2 font-bold'
            >
              Buy
            </button>
          </div>
        </div>
        <div className='grid grid-cols-4 gap-x-2 mt-4'>
          <div
            className={`h-2 w-full -skew-x-[50deg] ${
              level > 0 ? "bg-yellow-400" : "bg-zinc-700"
            }`}
          ></div>
          <div
            className={`h-2 w-full -skew-x-[50deg] ${
              level > 1 ? "bg-yellow-400" : "bg-zinc-700"
            }`}
          ></div>
          <div
            className={`h-2 w-full -skew-x-[50deg] ${
              level > 2 ? "bg-yellow-400" : "bg-zinc-700"
            }`}
          ></div>
          <div
            className={`h-2 w-full -skew-x-[50deg] ${
              level > 3 ? "bg-yellow-400" : "bg-zinc-700"
            }`}
          ></div>
        </div>
        <div className='flex justify-end mt-4 text-lg font-bold'>
          50 000 AFOS
        </div>
      </div>
      <Modal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        centerChildren
      >
        <div className='text-center bg-zinc-900 py-5'>
          <div className='font-bold'>
            Are you sure you want upgrade the Multitap?
          </div>
          <div className='text-zinc-400'>To level 4</div>
          <form
            className='flex justify-between px-4 mt-4'
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <button
                onClick={() => setIsModalOpen(false)}
                type='button'
                className='font-bold btn btn-error px-4 py-2'
              >
                Cancel
              </button>
            </div>
            <div>
              <button className='font-bold btn btn-primary px-6 py-2'>
                Buy
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default MultitapBoost;
