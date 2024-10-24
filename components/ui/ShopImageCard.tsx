import { FaRegStarHalf, FaStarHalf } from "react-icons/fa";
import testpack from "../../public/test_pack_blur.jpg";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";

const ShopImageCard = ({
  rate = 0,
  reviews = 0,
  name = "",
}: {
  rate: number;
  reviews: number;
  name: string;
}) => {
  const router = useRouter();

  return (
    <div className='w-full'>
      <div
        className='relative h-[300px] rounded-lg bg-center bg-no-repeat bg-cover'
        style={{ backgroundImage: `url(${testpack.src})` }}
      >
        <div className='w-full flex justify-center'>
          <div className='btn active:bg-yellow-500 btn-primary px-6 text-lg min-w-1/2 py-2 rounded-full absolute top-4 font-bold'>
            {name}
          </div>
          <button
            onClick={() => router.push(`/pack/${name.toLowerCase()}`)}
            className='btn btn-primary p-4 text-xl min-w-1/2 rounded-full absolute bottom-4 font-bold'
          >
            <IoEye />
          </button>
        </div>
      </div>

      <div className='flex items-center justify-between px-4'>
        <div className='flex justify-center items-center mt-2'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div className='flex' key={index}>
                <div className='w-[18px] overflow-hidden text-yellow-500 text-4xl cursor-pointer'>
                  {/* Calculate if the current half-star should be filled */}
                  {index * 2 < Math.floor(parseFloat(rate.toFixed(1)) * 2) ? (
                    <FaStarHalf />
                  ) : (
                    <FaRegStarHalf />
                  )}
                </div>
                <div className='w-[18px] -scale-x-100 text-yellow-500 overflow-hidden text-4xl cursor-pointer'>
                  {/* Calculate if the current half-star should be filled */}
                  {index * 2 + 1 <
                  Math.floor(parseFloat(rate.toFixed(1)) * 2) ? (
                    <FaStarHalf />
                  ) : (
                    <FaRegStarHalf />
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className='flex flex-col items-end pt-2'>
          <div className='text-xl font-bold'>
            {Math.floor(rate * 10) / 10}/5
          </div>
          <div className='text-xs text-gray-500'>{reviews} reviews</div>
        </div>
      </div>
    </div>
  );
};

export default ShopImageCard;
