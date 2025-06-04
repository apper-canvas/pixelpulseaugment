import Text from '../atoms/Text';

function PostCaption({ username, caption, hashtags }) {
  return (
    <div className="space-y-1">
      <Text className="text-sm">
        <span className="font-medium">@{username}</span> {caption}
      </Text>
      {hashtags?.length > 0 && (
        <Text className="text-sm text-blue-600">
          {hashtags.map(tag => `#${tag}`).join(' ')}
        </Text>
      )}
    </div>
  );
}

export default PostCaption;