import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import Contact from '../Contact/Contact';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ name, number, id }) => (
        <li className={s.item} key={id}>
          <Contact name={name} number={number} />

          <button
            className={s.buttonDelete}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func,
};
