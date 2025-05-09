import PropTypes from 'prop-types';

function Button(props) {
  const { type, className, children, onClick, to, disabled } = props;
  return (
    <button
      to={to}
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;