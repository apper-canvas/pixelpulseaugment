import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import Button from '../atoms/Button';

function PostActions({ post, onLike, onComment, onShare, onSave }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => onLike(post.id)}
            className={`transition-colors ${post.isLiked ? 'text-red-500' : 'text-neutral-500'}`}
          >
            <ApperIcon 
              name="Heart" 
              size={24} 
              fill={post.isLiked ? "currentColor" : "none"}
              className={post.isLiked ? "heart-beat" : ""}
            />
          </Button>
          <Button
            onClick={() => onComment(post.id)}
            className="text-neutral-500"
          >
            <ApperIcon name="MessageCircle" size={24} />
          </Button>
          <Button
            onClick={onShare}
            className="text-neutral-500"
          >
            <ApperIcon name="Send" size={24} />
          </Button>
        </div>
        <Button
          onClick={() => onSave(post.id)}
          className={`transition-colors ${post.isSaved ? 'text-neutral-900' : 'text-neutral-500'}`}
        >
          <ApperIcon 
            name="Bookmark" 
            size={24} 
            fill={post.isSaved ? "currentColor" : "none"}
          />
        </Button>
      </div>

      <p className="font-medium text-sm mb-2">
        {post.likeCount} likes
      </p>
    </div>
  );
}

export default PostActions;