const TaskSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/3 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded-lg" />
          <div className="h-8 w-8 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default TaskSkeleton;

