import InviteFriendsTask from "./InviteFriendsTask";
import JoinCommunityTask from "./JoinCommunityTask";

const TasksList = () => {
  return (
    <>
      <div className='py-5 px-4 pb-20'>
        <h2 className='text-xl font-semibold'>Tasks List</h2>
        <div className='mt-5 flex flex-col gap-y-5'>
          <JoinCommunityTask />
          <InviteFriendsTask />
        </div>
      </div>
    </>
  );
};

export default TasksList;
