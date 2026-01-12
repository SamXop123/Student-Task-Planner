const priorityConfig = {
  high: { label: 'High', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  low: { label: 'Low', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const isOverdue = (dateString, completed) => {
  if (!dateString || completed) return false;
  return new Date(dateString) < new Date();
};

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border px-4 py-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
        task.completed ? 'opacity-70 border-gray-200 bg-gray-50' : 'border-gray-100'
      } ${overdue ? 'outline outline-offset-2 outline-red-200' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task._id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-indigo-500'
          }`}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`font-semibold text-gray-900 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-0.5 text-xs font-medium ${priority.color}`}
            >
              <span className={`h-2 w-2 rounded-full ${priority.dot}`} />
              {priority.label} priority
            </span>
          </div>

          {task.description && (
            <p
              className={`mt-1 text-sm text-gray-600 leading-relaxed ${
                task.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center gap-4 text-xs">
            {task.dueDate && (
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                  overdue ? 'bg-red-50 text-red-600' : 'text-gray-500'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {overdue ? 'Overdue: ' : ''}
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

