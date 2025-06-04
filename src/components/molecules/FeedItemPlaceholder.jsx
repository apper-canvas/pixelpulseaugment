function FeedItemPlaceholder({ count = 3 }) {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white border border-neutral-300 animate-pulse md:rounded-lg overflow-hidden shadow-card">
          <div className="p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral-200 rounded w-24 mb-1"></div>
              <div className="h-3 bg-neutral-200 rounded w-16"></div>
            </div>
          </div>
          <div className="h-96 bg-neutral-200"></div>
          <div className="p-4">
            <div className="h-4 bg-neutral-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-neutral-200 rounded w-48"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedItemPlaceholder;