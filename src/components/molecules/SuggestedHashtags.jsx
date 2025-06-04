import Button from '../atoms/Button';
import Text from '../atoms/Text';

function SuggestedHashtags({ hashtags, onAddHashtag }) {
  return (
    <div className="mt-3">
      <Text className="text-xs text-neutral-500 mb-2">Suggested:</Text>
      <div className="flex flex-wrap gap-2">
        {hashtags.slice(0, 8).map((tag) => (
          <Button
            key={tag}
            onClick={() => onAddHashtag(tag)}
            className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full hover:bg-primary hover:text-white"
          >
            #{tag}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedHashtags;