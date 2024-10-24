import testpack from "../../public/test_pack_blur.jpg";
import aphos_logo from "../../public/aphos_logo_remove_bg.png";
import Image from "next/image";
import { priceFormatter } from "@/lib/priceFormatter";
import BuyImageButton from "../BuyImageButton";

const PackImageCard = ({ price }: { price: number | string }) => {
  return (
    <>
      <div className='w-full'>
        <div
          className='relative h-[300px] rounded-lg bg-center bg-no-repeat bg-cover'
          style={{ backgroundImage: `url(${testpack.src})` }}
        >
          <div className='w-full flex justify-center'>
            <div className='btn active:bg-yellow-500 btn-primary px-6 text-lg min-w-1/2 py-2 flex items-center rounded-full gap-x-2 absolute top-4 font-bold'>
              <div>{priceFormatter.format(Number(price))}</div>
              <div>
                <Image
                  src={aphos_logo}
                  alt='aphos_logo'
                  width={15}
                  height={15}
                />
              </div>
            </div>
            <BuyImageButton price={price} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PackImageCard;
