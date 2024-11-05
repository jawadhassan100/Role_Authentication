import "./ButtonToggle.css";

const ButtonToggle = ({ onClick, isDarkMode }) => {
  return (
    <label className="switch">
      <input type="checkbox" onChange={onClick} checked={isDarkMode} />
      <span className="slider"></span>
    </label>
  );
};

export default ButtonToggle;
