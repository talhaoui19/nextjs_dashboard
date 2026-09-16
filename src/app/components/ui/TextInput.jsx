const TextInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  icon,
  className = "",
  inputClassName = "",
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="--label">
        {label}
      </label>

      {icon && <span className="absolute left-4 top-3">{icon}</span>}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        className={`--input ${icon ? "pl-10" : ""} ${inputClassName}`}
        {...props}
      />
    </div>
  );
};

export default TextInput;
