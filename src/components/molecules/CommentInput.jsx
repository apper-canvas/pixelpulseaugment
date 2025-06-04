import Avatar from '../atoms/Avatar';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

function CommentInput({ value, onChange, onSubmit, disabled, avatarSrc }) {
  return (
    <div className="border-t border-neutral-200 p-4">
      <div className="flex space-x-3">
        <Avatar
          src={avatarSrc}
          alt="You"
          className="w-8 h-8"
        />
        <div className="flex-1 flex space-x-2">
          <Input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Add a comment..."
            className="flex-1 border border-neutral-300 rounded-full px-4 py-2 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          />
          <Button
            onClick={onSubmit}
            disabled={disabled}
            className="px-4 py-2 bg-primary text-white rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CommentInput;