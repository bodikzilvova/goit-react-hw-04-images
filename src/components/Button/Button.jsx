import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ handleLoadMore }) => {
  return (
    <button onClick={handleLoadMore} type="button" className={styles.Button}>
      Load more...
    </button>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
