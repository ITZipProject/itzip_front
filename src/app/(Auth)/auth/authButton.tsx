import PropTypes from 'prop-types';

export const AuthButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
> = ({ children, ...props }) => (
  <button
    className="primary-btn bg-Grey-100 h-spacing-12 disabled:bg-Grey-100 disabled:text-white disabled:cursor-not-allowed rounded-radius-03 text-white font-semibold text-14"
    {...props}
  >
    {children}
  </button>
);

AuthButton.propTypes = {
  children: PropTypes.node.isRequired,
};
