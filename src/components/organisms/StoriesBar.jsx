import StoryButton from '../molecules/StoryButton';

function StoriesBar({ onStoryClick }) {
  return (
    <div className="mt-header bg-white border-b border-neutral-300">
      <div className="max-w-feed mx-auto px-4 py-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {[1,2,3,4,5,6,7,8].map(i => (
            <StoryButton
              key={i}
              onClick={() => onStoryClick("Stories")}
              imgSrc={`https://images.unsplash.com/photo-150000000${i}?w=64&h=64&fit=crop&crop=face`}
              altText={`Story ${i}`}
              username={`user${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoriesBar;