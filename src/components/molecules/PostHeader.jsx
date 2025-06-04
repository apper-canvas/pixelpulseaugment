import ApperIcon from '../ApperIcon';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

function PostHeader({ userAvatar, username, location }) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar
          src={userAvatar}
          alt="User"
          className="w-8 h-8"
        />
        <div>
          <Text className="font-medium text-sm">@{username}</Text>
          <Text className="text-xs text-neutral-400">{location}</Text>
        </div>
      </div>
      <Button className="p-1">
        <ApperIcon name="MoreHorizontal" size={16} />
      </Button>
    </div>
  );
}

export default PostHeader;