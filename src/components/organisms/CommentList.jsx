import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

function CommentList({ comments, onDeleteComment }) {
  return (
    <div className="flex-1 overflow-y-auto max-h-60 px-4">
      {comments?.map((comment) => (
        <div key={comment.id} className="py-3 border-b border-neutral-100 last:border-b-0">
          <div className="flex items-start space-x-3">
            <Avatar
              src={comment.authorAvatar}
              alt={comment.authorName}
              className="w-6 h-6"
            />
            <div className="flex-1">
              <Text className="text-sm">
                <span className="font-medium">{comment.authorName}</span> {comment.text}
              </Text>
              <div className="flex items-center space-x-4 mt-1">
                <Text className="text-xs text-neutral-400">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </Text>
                {comment.authorName === "You" && (
                  <Button
                    onClick={() => onDeleteComment(comment.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;