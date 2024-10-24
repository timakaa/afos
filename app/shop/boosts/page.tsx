import EnergyLimitBoost from "@/components/EnergyLimitBoost";
import MultitapBoost from "@/components/MultitapBoost";

const page = () => {
  return (
    <div className='flex flex-col gap-y-4 px-4 py-5'>
      <MultitapBoost />
      <EnergyLimitBoost />
    </div>
  );
};

export default page;
