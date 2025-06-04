import { useRef } from 'react';
import ApperIcon from '../ApperIcon';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

function FileUploadArea({ preview, dragOver, onDrop, onDragOver, onDragLeave, onFileSelect, onRemoveFile, onChooseClick }) {
  const fileInputRef = useRef(null);

  const handleChooseClick = () => {
    fileInputRef.current?.click();
    if (onChooseClick) onChooseClick();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
        dragOver 
          ? 'border-primary bg-primary/5' 
          : preview 
            ? 'border-green-300 bg-green-50' 
            : 'border-neutral-300 hover:border-primary/50'
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {preview ? (
        <div className="space-y-4">
          <img
            src={preview}
            alt="Preview"
            className="max-h-64 mx-auto rounded-xl shadow-soft object-cover"
          />
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={handleChooseClick}
              className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200"
            >
              <ApperIcon name="RefreshCw" size={16} />
              <span>Change Image</span>
            </Button>
            <Button
              onClick={onRemoveFile}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200"
            >
              <ApperIcon name="Trash2" size={16} />
              <span>Remove</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
            <ApperIcon name="Upload" size={32} className="text-white" />
          </div>
          <div>
            <Text className="text-lg font-medium text-neutral-700 mb-2">
              Drag and drop your photo here
            </Text>
            <Text className="text-neutral-500 mb-4">or</Text>
            <Button
              onClick={handleChooseClick}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-medium hover:opacity-90"
            >
              Choose from Gallery
            </Button>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
}

export default FileUploadArea;