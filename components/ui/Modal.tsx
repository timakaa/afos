import { AnimatePresence } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

const Modal = ({
  children,
  isVisible,
  setIsVisible,
  centerChildren = false,
  childrenCl,
}: {
  children?: ReactNode;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  centerChildren?: boolean;
  childrenCl?: string;
}) => {
  useEffect(() => {
    const handleBodyOverflow = () => {
      if (isVisible) {
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
  }, [isVisible]);

  return (
    <AnimatePresence mode='wait'>
      {isVisible ? (
        <>
          <div
            onClick={() => setIsVisible(false)}
            className='overflow-auto top-0 left-0 w-full h-full fixed bg-black bg-opacity-70 z-[999] text-t-text-primary'
          >
            <div
              className={`${
                centerChildren
                  ? "top-1/2 -translate-y-1/2 flex justify-center"
                  : ""
              } my-0 flex flex-col relative max-w-[600px] mx-auto ${childrenCl}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default Modal;
