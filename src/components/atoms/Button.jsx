function Button({ children, onClick, className = "", disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`transition-colors ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;