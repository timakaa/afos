import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Modal from "./Modal";
import CircleLoader from "./CircleLoader/CircleLoader";
import Image from "next/image";

const ConfirmModal = ({
  isVisible,
  setIsVisible,
  title,
  description,
  onConfirm,
  isLoading,
  btnClass,
  btnText,
  price,
}: {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string | ReactNode;
  onConfirm: () => void;
  isLoading?: boolean;
  btnClass?: string;
  btnText?: string;
  price?: number;
}) => {
  return (
    <Modal centerChildren isVisible={isVisible} setIsVisible={setIsVisible}>
      <div className='text-center bg-zinc-900 py-5 mx-2 rounded-lg relative'>
        <div className={`font-bold ${price ? "pt-3" : ""}`}>{title}</div>
        {description && <div className={`text-zinc-400`}>{description}</div>}
        {price && (
          <div className='absolute flex items-center gap-x-2 justify-center -top-5 left-1/2 -translate-x-1/2 bg-yellow-500 p-2 px-4 rounded-full'>
            <span className='font-semibold'>
              {new Intl.NumberFormat("id-ID").format(price)}
            </span>
            <Image
              src='/aphos_logo_remove_bg.png'
              alt='aphos'
              width={16}
              height={16}
              className='-translate-y-[1px]'
            />
          </div>
        )}
        <form
          className='flex justify-between px-4 mt-4'
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <button
              onClick={() => setIsVisible(false)}
              type='button'
              className='font-bold btn btn-error px-4 py-2'
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              disabled={isLoading}
              onClick={onConfirm}
              className={`font-bold btn flex justify-center items-center ${
                btnClass ? btnClass : ""
              } min-h-[40px] btn-primary px-6 py-2 ${
                isLoading ? "btn-loading" : ""
              }`}
            >
              {isLoading ? (
                <CircleLoader />
              ) : (
                <span>{btnText ? btnText : "Confirm"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
