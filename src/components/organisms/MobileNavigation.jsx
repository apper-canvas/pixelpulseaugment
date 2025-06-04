import ApperIcon from '../ApperIcon';
import Button from '../atoms/Button';

function MobileNavigation({ onHomeClick, onSearchClick, onUploadClick, onNotificationsClick, onProfileClick }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-300 h-nav z-40">
      <div className="max-w-feed mx-auto h-full flex items-center justify-around px-4">
        <Button 
          onClick={onHomeClick}
          className="p-3 hover:bg-neutral-100 rounded-full"
        >
          <ApperIcon name="Home" size={24} />
        </Button>
        <Button 
          onClick={onSearchClick}
          className="p-3 hover:bg-neutral-100 rounded-full"
        >
          <ApperIcon name="Search" size={24} />
        </Button>
        <Button
          onClick={onUploadClick}
          className="p-3 hover:bg-neutral-100 rounded-full"
        >
          <ApperIcon name="Plus" size={24} />
        </Button>
        <Button 
          onClick={onNotificationsClick}
          className="p-3 hover:bg-neutral-100 rounded-full"
        >
          <ApperIcon name="Heart" size={24} />
        </Button>
        <Button 
          onClick={onProfileClick}
          className="p-3 hover:bg-neutral-100 rounded-full"
        >
          <ApperIcon name="User" size={24} />
        </Button>
      </div>
    </nav>
  );
}

export default MobileNavigation;