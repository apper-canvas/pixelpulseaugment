import Button from '../atoms/Button';
import ApperIcon from '../ApperIcon';

function ModalHeader({ title, onClose }) {
  return (
    <div className="border-b border-neutral-200 p-4 flex items-center justify-between">
      <h3 className="font-medium">{title}</h3>
      <Button
        onClick={onClose}
        className="p-1 hover:bg-neutral-100 rounded"
      >
        <ApperIcon name="X" size={20} />
      </Button>
    </div>
  );
}

export default ModalHeader;