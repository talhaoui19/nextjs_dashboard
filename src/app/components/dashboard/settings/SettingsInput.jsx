const SettingsInput = ({
  label,
  type = "text",
  placeholder,
  value,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute right-8 bottom-9 bg-white px-2 text-[14px] text-[#232323]">
        {label}
      </span>

      {icon && <span className="absolute left-4 top-3">{icon}</span>}

      <input
        type={type}
        placeholder={placeholder}
        className={`--sett-input ${icon ? "pl-10" : ""}`}
        value={value}
        {...props}
      />
    </div>
  );
};

export default SettingsInput;
