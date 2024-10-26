import PropTypes from 'prop-types';

export const AuthButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
> = ({ children, ...props }) => (
  <button
    className="rounded-radius-03 bg-Grey-100 text-white text-14 font-semibold h-spacing-12 disabled:bg-Grey-100 disabled:text-white disabled:cursor-not-allowed primary-btn"
    {...props}
  >
    {children}
  </button>
);

AuthButton.propTypes = {
  children: PropTypes.node.isRequired,
};
