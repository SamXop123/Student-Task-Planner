import { useState, useEffect } from 'react';

const EditTaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    completed: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populates form when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        completed: task.completed || false,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      completed: formData.completed,
      ...(formData.dueDate && { dueDate: new Date(formData.dueDate).toISOString() }),
    };

    const result = await onSubmit(task._id, taskData);

    setIsSubmitting(false);

    if (result.success) {
      onCancel();
    } else {
      setErrors({ submit: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="edit-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="edit-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="edit-priority" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="edit-priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
      </div>

      <div>
        <label htmlFor="edit-dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          id="edit-dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="edit-completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="edit-completed" className="text-sm font-medium text-gray-700">
          Mark as completed
        </label>
      </div>

      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;

