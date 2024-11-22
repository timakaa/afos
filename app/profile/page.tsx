import SubscribeChannel from "@/components/SubscribeChannel";
import MyImages from "@/components/MyImages";
import { getSession } from "@/lib/session";

const page = async () => {
  const session = await getSession();

  return (
    <div className='px-4 py-5 pb-20'>
      <div className='text-5xl font-bold'>Hello</div>
      <div className='text-4xl font-bold'>@{session?.user?.username}</div>
      <hr className='border-b-[2px] my-6 border-b-zinc-400 border-t-0' />
      <SubscribeChannel />
      <MyImages />
    </div>
  );
};

export default page;
