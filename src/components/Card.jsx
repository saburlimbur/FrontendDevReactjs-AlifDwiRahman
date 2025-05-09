import PropTypes from 'prop-types';

function Card({ className = '', children, onClick }) {
  return (
    <article className={className} onClick={onClick}>
      {children}
    </article>
  );
}

function Header({ className = '', children, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}

function Image({ className = '', src = '', alt = '' }) {
  return (
    <div className={className}>
      <img src={src} alt={alt} className={className} />
    </div>
  );
}

function Body({ className = '', children }) {
  return <div className={className}>{children}</div>;
}

function Badge({ className = '', children }) {
  return <div className={className}>{children}</div>;
}

function Footer({ className = '', children }) {
  return <footer className={className}>{children}</footer>;
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

Body.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Badge.propTypes = Body.propTypes;
Footer.propTypes = Body.propTypes;

Card.Header = Header;
Card.Image = Image;
Card.Body = Body;
Card.Footer = Footer;
Card.Badge = Badge;

export default Card;
