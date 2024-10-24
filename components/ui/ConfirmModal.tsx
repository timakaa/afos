import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Modal from "./Modal";
import CircleLoader from "./CircleLoader/CircleLoader";
import { title } from "process";

const ConfirmModal = ({
  isVisible,
  setIsVisible,
  title,
  description,
  onConfirm,
  isLoading,
  btnClass,
  btnText,
}: {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string | ReactNode;
  onConfirm: () => void;
  isLoading?: boolean;
  btnClass?: string;
  btnText?: string;
}) => {
  return (
    <Modal centerChildren isVisible={isVisible} setIsVisible={setIsVisible}>
      <div className='text-center bg-zinc-900 py-5'>
        <div className='font-bold'>{title}</div>
        {description && <div className='text-zinc-400'>{description}</div>}
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
