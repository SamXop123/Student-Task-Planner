import { useState } from 'react';
import {
  Header,
  AddTaskForm,
  EditTaskForm,
  FilterBar,
  TaskList,
  EmptyState,
  Modal,
  LoadingSpinner,
} from '../components';
import { useTasks } from '../hooks/useTasks';

function Dashboard() {
  const {
    tasks,
    loading,
    error,
    filters,
    addTask,
    updateTask,
    toggleComplete,
    deleteTask,
    updateFilters,
    clearError,
  } = useTasks();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState(null);

  // Show temporary notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddClick = () => setIsAddModalOpen(true);
  const handleAddClose = () => setIsAddModalOpen(false);

  const handleEditClick = (task) => setEditingTask(task);
  const handleEditClose = () => setEditingTask(null);

  // Handle add task with notification
  const handleAddTask = async (taskData) => {
    const result = await addTask(taskData);
    if (result.success) {
      showNotification('Task added successfully!');
    }
    return result;
  };

  // Handle update task with notification
  const handleUpdateTask = async (id, taskData) => {
    const result = await updateTask(id, taskData);
    if (result.success) {
      showNotification('Task updated successfully!');
    }
    return result;
  };

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const result = await deleteTask(id);
      if (result.success) {
        showNotification('Task deleted successfully!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onAddClick={handleAddClick} />

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all transform animate-slide-in ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Filter Bar */}
        <FilterBar filters={filters} onFilterChange={updateFilters} />

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
            <span className="text-red-600">{error}</span>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Task List / Loading / Empty State */}
        {loading ? (
          <div className="flex justify-center py-6">
            <LoadingSpinner />
          </div>
        ) : tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggle={toggleComplete}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState status={filters.status} onAddClick={handleAddClick} />
        )}

        {/* Task Count */}
        {!loading && tasks.length > 0 && (
          <p className="text-center text-sm text-gray-500">
            Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </p>
        )}
      </main>

      {/* Add Task Modal */}
      <Modal isOpen={isAddModalOpen} onClose={handleAddClose} title="Add New Task">
        <AddTaskForm onSubmit={handleAddTask} onCancel={handleAddClose} />
      </Modal>

      {/* Edit Task Modal */}
      <Modal isOpen={!!editingTask} onClose={handleEditClose} title="Edit Task">
        {editingTask && (
          <EditTaskForm
            task={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={handleEditClose}
          />
        )}
      </Modal>
    </div>
  );
}

export default Dashboard;

