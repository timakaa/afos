"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";

const DownModal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const handleBodyOverflow = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        if (window.innerWidth > 768) {
          document.body.style.paddingRight = "8px";
        }
      } else {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0";
      }
    };

    handleBodyOverflow();

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode='wait'>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 bg-black bg-opacity-70 z-[999]'
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className='fixed bottom-0 max-h-[70vh] overflow-y-auto left-0 w-full bg-zinc-800 p-5 rounded-t-3xl'
          >
            {children}
          </motion.div>
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default DownModal;
