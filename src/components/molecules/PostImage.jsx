import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

function PostImage({ src, alt, isLiked, onDoubleClick }) {
  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt}
        className="w-full h-96 object-cover cursor-pointer"
        onDoubleClick={onDoubleClick}
      />
      {isLiked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text-red-500"
          >
            <ApperIcon name="Heart" size={80} fill="currentColor" />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default PostImage;