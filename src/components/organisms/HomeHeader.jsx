import ApperIcon from '../ApperIcon';
import Button from '../atoms/Button';

function HomeHeader({ onMessageClick, onNotificationClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-300 z-50 h-header">
      <div className="max-w-feed mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PixelPulse
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={onMessageClick}
            className="p-2 hover:bg-neutral-200 rounded-full"
          >
            <ApperIcon name="MessageCircle" size={24} />
          </Button>
          <Button 
            onClick={onNotificationClick}
            className="p-2 hover:bg-neutral-200 rounded-full"
          >
            <ApperIcon name="Heart" size={24} />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;