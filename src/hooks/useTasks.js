import { useState, useEffect, useCallback, useRef } from 'react';
import { taskService } from '../services/api';

/*
This is custom hook for managing task state and API operations like Fetch, CRUD operations, filtering, sorting, optimistic updates etc
*/
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'dueDate',
    order: 'asc',
  });

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const safeSetState = (setter) => (value) => {
    if (isMounted.current) {
      setter(value);
    }
  };

  /*Fetch tasks from API with current filters*/
  const fetchTasks = useCallback(async () => {
    try {
      safeSetState(setLoading)(true);
      safeSetState(setError)(null);

      const response = await taskService.getTasks(filters);
      safeSetState(setTasks)(response.data || []);
    } catch (err) {
      const errorMessage = err.userMessage || err.response?.data?.error || 'Failed to fetch tasks';
      safeSetState(setError)(errorMessage);
      safeSetState(setTasks)([]);
    } finally {
      safeSetState(setLoading)(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);



  const addTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);

      // Add to local state immediately
      setTasks((prev) => [...prev, response.data]);

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.userMessage || 'Failed to add task';
      return { success: false, error: errorMessage };
    }
  };


  const updateTask = async (id, taskData) => {
    // Store previous state for rollback
    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, ...taskData } : task
      )
    );

    try {
      const response = await taskService.updateTask(id, taskData);

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task))
      );

      return { success: true, data: response.data };
    } catch (err) {
      setTasks(previousTasks);

      const errorMessage = err.userMessage || 'Failed to update task';
      return { success: false, error: errorMessage };
    }
  };



  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) {
      return { success: false, error: 'Task not found' };
    }

    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const response = await taskService.updateTask(id, { completed: !task.completed });

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? response.data : t))
      );

      return { success: true, data: response.data };
    } catch (err) {
      setTasks(previousTasks);

      const errorMessage = err.userMessage || 'Failed to update task';
      setError(errorMessage);

      setTimeout(() => {
        if (isMounted.current) setError(null);
      }, 3000);

      return { success: false, error: errorMessage };
    }
  };



  const deleteTask = async (id) => {
    const previousTasks = [...tasks];

    setTasks((prev) => prev.filter((task) => task._id !== id));

    try {
      await taskService.deleteTask(id);
      return { success: true };
    } catch (err) {
      setTasks(previousTasks);

      const errorMessage = err.userMessage || 'Failed to delete task';
      setError(errorMessage);

      setTimeout(() => {
        if (isMounted.current) setError(null);
      }, 3000);

      return { success: false, error: errorMessage };
    }
  };



  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };



  const clearError = () => {
    setError(null);
  };

  return {
    tasks,
    loading,
    error,
    filters,

    fetchTasks,
    addTask,
    updateTask,
    toggleComplete,
    deleteTask,
    updateFilters,
    clearError,
  };
};
