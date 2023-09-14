import PropTypes from "prop-types";

export function FormInput({
  value,
  setValue,
  label,
  type,
  options,
  onHandleChange,
}) {
  return (
    <div
      className={`${
        type === "checkbox" ? "flex items-center" : "flex flex-col mb-2"
      } `}
    >
      <label htmlFor={label} className="mr-2 text-sm font-medium">
        {label}
      </label>

      {type === "select" && (
        <select
          className="bg-gray-200 border border-gray-300 rounded-md p-1 mb-2 focus:outline-1 outline-gray-500 "
          type={type}
          value={value}
          id={label}
          name={label}
          onChange={onHandleChange(setValue)}
          required
        >
          {options.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </select>
      )}

      {type === "text" && (
        <input
          className="bg-gray-200 border border-gray-300 rounded-md p-1 mb-2 focus:outline-1 outline-gray-500 "
          type={type}
          value={value}
          id={label}
          name={label}
          onChange={onHandleChange(setValue)}
          required
        />
      )}

      {type === "checkbox" && (
        <input
          className={`bg-gray-200 border border-gray-300 rounded-md focus:outline-1 outline-gray-500 flex items-center w-6 h-6 `}
          type={type}
          value={value}
          checked={value}
          id={label}
          name={label}
          onChange={onHandleChange(setValue)}
        />
      )}
    </div>
  );
}

function Option({ value, label }) {
  Option.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
  };

  return <option value={value}>{label}</option>;
}

export default Option;
