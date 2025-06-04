import { motion } from 'framer-motion';
import PostHeader from '../molecules/PostHeader';
import PostImage from '../molecules/PostImage';
import PostActions from '../molecules/PostActions';
import PostCaption from '../molecules/PostCaption';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

function FeedPost({ post, onLike, onSave, onComment, onShare, onPlaceholderClick }) {
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-neutral-300 md:rounded-lg overflow-hidden shadow-card"
    >
      <PostHeader 
        userAvatar={`https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face`}
        username="pixeluser"
        location="Los Angeles, CA"
      />

      <PostImage 
        src={post.mediaUrl}
        alt={post.caption}
        isLiked={post.isLiked}
        onDoubleClick={() => onLike(post.id)}
      />

      <PostActions 
        post={post}
        onLike={onLike}
        onComment={onComment}
        onShare={() => onPlaceholderClick("Share")}
        onSave={onSave}
      />

      <div className="p-4 pt-0">
        <PostCaption 
          username="pixeluser"
          caption={post.caption}
          hashtags={post.hashtags}
        />

        {post.commentCount > 0 && (
          <Button
            onClick={() => onComment(post.id)}
            className="text-neutral-400 text-sm mt-2 hover:text-neutral-600"
          >
            View all {post.commentCount} comments
          </Button>
        )}

        <Text className="text-xs text-neutral-400 mt-2">
          {new Date(post.timestamp).toLocaleDateString()}
        </Text>
      </div>
    </motion.div>
  );
}

export default FeedPost;