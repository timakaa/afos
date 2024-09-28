import MainClickButton from "@/components/MainClickButton";

export default async function Home() {
  return (
    <div className='bg-gradient-main h-screen justify-center flex items-center relative overflow-hidden'>
      <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
      <div className='absolute inset-0 flex items-center justify-center z-0'>
        <div className='radial-gradient-overlay'></div>
      </div>
      <MainClickButton />
    </div>
  );
}
