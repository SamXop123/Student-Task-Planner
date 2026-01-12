const EmptyState = ({ status, onAddClick }) => {
  const messages = {
    all: {
      title: 'No tasks yet',
      description: 'Get started by creating your first task!',
      icon: '📝',
    },
    pending: {
      title: 'No pending tasks',
      description: 'All caught up! Create a new task or check completed ones.',
      icon: '🎉',
    },
    completed: {
      title: 'No completed tasks',
      description: 'Complete some tasks to see them here.',
      icon: '✅',
    },
  };

  const content = messages[status] || messages.all;

  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-sm">
        {content.icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900">{content.title}</h3>
      <p className="mt-2 text-gray-500 max-w-md mx-auto">{content.description}</p>
      {status !== 'completed' && (
        <button
          onClick={onAddClick}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span className="text-lg">＋</span>
          Add Your First Task
        </button>
      )}
    </div>
  );
};

export default EmptyState;

