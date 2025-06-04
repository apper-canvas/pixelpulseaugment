function Avatar({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
    />
  );
}

export default Avatar;