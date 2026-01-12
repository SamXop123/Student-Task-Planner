
const buildTaskFilter = (query = {}) => {
  const filter = {};

  const status = (query.status || 'all').toLowerCase();
  if (status === 'pending') filter.completed = false;
  else if (status === 'completed') filter.completed = true;

  return filter;
};


const sortTasks = (tasks = [], { sortBy = 'dueDate', order = 'asc' } = {}) => {
  const sortOrder = order === 'desc' ? -1 : 1;

  const priorityRank = { high: 3, medium: 2, low: 1 };

  return tasks.sort((a, b) => {
    if (sortBy === 'priority') {
      const ar = priorityRank[a.priority] || 0;
      const br = priorityRank[b.priority] || 0;
      return (ar - br) * sortOrder; // asc: low->high, desc: high->low
    }

    // default: dueDate; nulls last in asc, first in desc (adjust if desired)
    const av = a.dueDate ? new Date(a.dueDate).getTime() : null;
    const bv = b.dueDate ? new Date(b.dueDate).getTime() : null;

    if (av === null && bv === null) return 0;
    if (av === null) return 1; 
    if (bv === null) return -1;

    return (av - bv) * sortOrder;
  });
};

module.exports = {
  buildTaskFilter,
  sortTasks,
};
