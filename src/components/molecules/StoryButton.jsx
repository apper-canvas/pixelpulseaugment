import Button from '../atoms/Button';
import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';

function StoryButton({ onClick, imgSrc, altText, username }) {
  return (
    <Button
      onClick={onClick}
      className="flex-shrink-0 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent p-0.5 mb-1">
        <div className="w-full h-full rounded-full bg-white p-0.5">
          <Avatar
            src={imgSrc}
            alt={altText}
            className="w-full h-full"
          />
        </div>
      </div>
      <Text className="text-xs text-neutral-400">{username}</Text>
    </Button>
  );
}

export default StoryButton;