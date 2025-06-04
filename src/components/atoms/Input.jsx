function Input({ value, onChange, placeholder, className = "", type = "text", onKeyPress, disabled = false }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`focus:outline-none focus:border-primary ${className}`}
      onKeyPress={onKeyPress}
      disabled={disabled}
    />
  );
}

export default Input;