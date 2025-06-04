import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';

function PostInfo({ imageUrl, caption, likeCount }) {
  return (
    <div className="border-b border-neutral-200 p-4">
      <div className="flex space-x-3">
        <img
          src={imageUrl}
          alt={caption}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <Text className="text-sm">{caption}</Text>
          <Text className="text-xs text-neutral-400 mt-1">
            {likeCount} likes
          </Text>
        </div>
      </div>
    </div>
  );
}

export default PostInfo;