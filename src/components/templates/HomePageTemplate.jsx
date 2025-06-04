import { AnimatePresence } from 'framer-motion';
import HomeHeader from '../organisms/HomeHeader';
import StoriesBar from '../organisms/StoriesBar';
import FeedPost from '../organisms/FeedPost';
import FeedItemPlaceholder from '../molecules/FeedItemPlaceholder';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import MobileNavigation from '../organisms/MobileNavigation';
import UploadPostModal from '../organisms/UploadPostModal';
import CommentModal from '../organisms/CommentModal';

function HomePageTemplate({ 
  posts, 
  loading, 
  error, 
  onLoadPosts, 
  onLikePost, 
  onSavePost, 
  onCommentPost, 
  onPlaceholderClick, 
  onRefreshFeed,
  showUploadModal,
  onCloseUploadModal,
  onUploadSuccess,
  showCommentModal,
  onCloseCommentModal,
  activePost,
  comments,
  commentText,
  onCommentTextChange,
  onSubmitComment,
  onDeleteComment
}) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <HomeHeader 
        onMessageClick={() => onPlaceholderClick("Messages")} 
        onNotificationClick={() => onPlaceholderClick("Notifications")} 
      />

      <StoriesBar onStoryClick={onPlaceholderClick} />

      <main className="max-w-feed mx-auto px-0 md:px-4 pb-20">
        <div className="space-y-6 pt-6">
          {loading && posts.length === 0 ? (
            <FeedItemPlaceholder />
          ) : (
            <AnimatePresence>
              {posts?.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  onLike={onLikePost}
                  onSave={onSavePost}
                  onComment={onCommentPost}
                  onShare={onPlaceholderClick}
                  onPlaceholderClick={onPlaceholderClick} 
                />
              ))}
            </AnimatePresence>
          )}

          {error && (
            <div className="text-center py-8">
              <Text className="text-red-500">{error}</Text>
              <Button
                onClick={onLoadPosts}
                className="mt-2 px-4 py-2 bg-primary text-white rounded-lg"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </main>

      <UploadPostModal
        isOpen={showUploadModal}
        onClose={onCloseUploadModal}
        onUpload={onUploadSuccess}
      />

      <CommentModal
        isOpen={showCommentModal}
        onClose={onCloseCommentModal}
        activePost={activePost}
        comments={comments}
        commentText={commentText}
        onCommentTextChange={onCommentTextChange}
        onSubmitComment={onSubmitComment}
        onDeleteComment={onDeleteComment}
      />

      <MobileNavigation
        onHomeClick={onRefreshFeed}
        onSearchClick={() => onPlaceholderClick("Explore")}
        onUploadClick={() => onUploadSuccess(true)}
        onNotificationsClick={() => onPlaceholderClick("Notifications")}
        onProfileClick={() => onPlaceholderClick("Profile")}
      />
    </div>
  );
}

export default HomePageTemplate;