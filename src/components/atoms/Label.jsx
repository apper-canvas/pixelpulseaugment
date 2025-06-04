function Label({ children, className = "" }) {
  return (
    <label className={`block text-sm font-medium text-neutral-700 mb-2 ${className}`}>
      {children}
    </label>
  );
}

export default Label;