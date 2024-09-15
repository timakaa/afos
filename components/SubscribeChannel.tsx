const SubscribeChannel = () => {
  return (
    <div className='w-full bg-zinc-900 border border-zinc-800 py-4 rounded-lg px-5'>
      <div className='flex flex-col gap-y-2'>
        <div>
          <div className='text-xl text-center font-bold'>
            Join Our Community!
          </div>
        </div>
        <div>
          <a
            href='https://t.me/afoscoin'
            className='btn w-full block text-center text-lg btn-secondary px-5 py-2 font-bold'
          >
            Join
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscribeChannel;
