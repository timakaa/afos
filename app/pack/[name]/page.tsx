import RatePack from "@/components/RatePack";
import PackImageCard from "@/components/ui/PackImageCard";
import BackButton from "@/components/ui/BackButton";

const PackPage = ({ params }: { params: { name: string } }) => {
  return (
    <div className='pb-20 px-4'>
      <div className='flex justify-between items-center'>
        <div className='pt-6'>
          <BackButton />
        </div>
        <h1 className='text-white font-bold text-center text-2xl mt-4'>
          {params.name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h1>
        <div></div>
      </div>
      <div className='mb-6'>
        <RatePack />
      </div>
      <div className='flex flex-col gap-y-5'>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <PackImageCard key={index} price={200000} />
          ))}
      </div>
    </div>
  );
};

export default PackPage;
