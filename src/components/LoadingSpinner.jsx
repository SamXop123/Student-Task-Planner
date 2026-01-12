const LoadingSpinner = ({ label = 'Loading tasks...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-sm text-gray-500">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-indigo-100" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      </div>
      <span>{label}</span>
    </div>
  );
};

export default LoadingSpinner;
