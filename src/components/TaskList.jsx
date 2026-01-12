import TaskCard from './TaskCard';
import TaskSkeleton from './TaskSkeleton';

const TaskList = ({ tasks, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, idx) => (
          <TaskSkeleton key={`skeleton-${idx}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
