import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <label className={s.textFilter}>
      Find Contact by name
      <input
        className={s.inputFilter}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
