import ShopImageCard from "@/components/ui/ShopImageCard";
import { IoIosSearch } from "react-icons/io";

const ShopPics = () => {
  return (
    <div>
      <div className='flex justify-center px-4 mt-5'>
        <div className='flex items-center border border-zinc-700 rounded-lg bg-zinc-800 pr-4'>
          <input
            className='w-full py-2 px-4 bg-transparent outline-none'
            placeholder='Search Pack...'
            type='text'
          />
          <span className='text-lg'>
            <IoIosSearch />
          </span>
        </div>
      </div>
      <div className='flex flex-col px-4 py-5 gap-y-5'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <ShopImageCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default ShopPics;
