import { useAuth } from '../hooks/useAuth';

const Header = ({ onAddClick }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await logout();
    }
  };

  return (
    <header className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">📚 Student Task Manager</h1>
          <p className="text-indigo-200 text-sm mt-1">
            {currentUser?.email || 'Stay organized, stay ahead'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onAddClick}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70"
          >
            <span className="text-xl">+</span>
            Add Task
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
