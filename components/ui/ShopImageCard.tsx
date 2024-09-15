import testpack from "../../public/test_pack_blur.jpg";

const ShopImageCard = () => {
  return (
    <div className='w-full'>
      <div
        className='relative h-[300px] rounded-lg bg-center bg-no-repeat bg-cover'
        style={{ backgroundImage: `url(${testpack.src})` }}
      >
        <button className='btn btn-primary w-full py-2 absolute bottom-4 rounded-none font-bold'>
          Watch Sofa
        </button>
      </div>
    </div>
  );
};

export default ShopImageCard;
