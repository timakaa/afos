import Image from "next/image";
import aphosPng from "@/public/main_button.png";
import TasksList from "@/components/TasksList";

const page = () => {
  return (
    <>
      <div className='my-14'>
        <div className='flex items-center flex-col'>
          <Image src={aphosPng} alt='APHOS Logo' width={140} height={140} />
          <h1 className='text-3xl font-extrabold'>Earn more APHOS</h1>
        </div>
      </div>
      <TasksList />
    </>
  );
};

export default page;
