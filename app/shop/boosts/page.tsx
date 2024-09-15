import LuckerBoost from "@/components/LuckerBoost";
import MultitapBoost from "@/components/MultitapBoost";

const page = () => {
  return (
    <div className='flex flex-col gap-y-4 px-4 py-5'>
      <MultitapBoost />
      <LuckerBoost />
    </div>
  );
};

export default page;
