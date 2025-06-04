function TextArea({ value, onChange, placeholder, className = "", maxLength }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none ${className}`}
    />
  );
}

export default TextArea;