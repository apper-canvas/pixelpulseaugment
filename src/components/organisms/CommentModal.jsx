import { motion, AnimatePresence } from 'framer-motion';
import ModalHeader from '../molecules/ModalHeader';
import PostInfo from '../molecules/PostInfo';
import CommentList from './CommentList';
import CommentInput from '../molecules/CommentInput';

function CommentModal({ isOpen, onClose, activePost, comments, commentText, onCommentTextChange, onSubmitComment, onDeleteComment }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader title="Comments" onClose={onClose} />

            {activePost && (
              <PostInfo
                imageUrl={activePost.mediaUrl}
                caption={activePost.caption}
                likeCount={activePost.likeCount}
              />
            )}

            <CommentList comments={comments} onDeleteComment={onDeleteComment} />

            <CommentInput
              value={commentText}
              onChange={(e) => onCommentTextChange(e.target.value)}
              onSubmit={onSubmitComment}
              disabled={!commentText.trim()}
              avatarSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommentModal;