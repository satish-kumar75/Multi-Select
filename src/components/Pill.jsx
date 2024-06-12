import PropTypes from "prop-types";

const Pill = ({ image, text, onClick }) => {
  return (
    <>
      <span className="user-pill" onClick={onClick}>
        <img src={image} alt={text} />
        <span>{text} ×</span>
      </span>
    </>
  );
};

Pill.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Pill;
