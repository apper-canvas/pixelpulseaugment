import Button from '../atoms/Button';
import ApperIcon from '../ApperIcon';

function ActionButton({ iconName, onClick, className = "", size = 24, fill = "none" }) {
  return (
    <Button 
      onClick={onClick}
      className={`p-2 hover:bg-neutral-200 rounded-full transition-colors ${className}`}
    >
      <ApperIcon name={iconName} size={size} fill={fill} />
    </Button>
  );
}

export default ActionButton;