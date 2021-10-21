import PropTypes from 'prop-types';
import s from './Contact.module.css';

export default function Contact({ name, number }) {
  return (
    <>
      <p className={s.name}>{name}</p>
      <p className={s.number}>{number}</p>
    </>
  );
}

Contact.propType = {
  name: PropTypes.string,
  number: PropTypes.number,
};
