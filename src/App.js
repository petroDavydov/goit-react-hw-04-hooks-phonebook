import React, { Component } from 'react';
// ===========================================
import Container from './container/Container';
// ===========================================
import ContactForm from './ContactForm/ContactForm';
import baseContact from './json/contact.json';
// ===========================================
import ContactList from './ContactList/ContactList';
// ===========================================
import Filter from './Filter/Filter';
// ===========================================

class App extends Component {
  state = {
    contacts: baseContact,
    filter: '',
  };

  formSubmitHandler = data => {
    if (
      this.state.contacts.some(
        element =>
          element.name.toLocaleLowerCase() === data.name.toLocaleLowerCase(),
      )
    ) {
      return alert('We have this contact');
    }

    this.setState(({ contacts }) => ({
      contacts: [data, ...contacts],
    }));
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const contactFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(contactFilter),
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  // ===
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contacts);
    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  // ===

  render() {
    const { formSubmitHandler, deleteContact, changeFilter } = this;
    const getVisibleContacts = this.getVisibleContact();
    const { filter } = this.state;
    return (
      <Container>
        <h1 className="title">PhoneBook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <Filter value={filter} onChange={changeFilter} />

        <h2 className="contactTitle">Contacts</h2>
        <ContactList
          contacts={getVisibleContacts}
          onDeleteContact={deleteContact}
        />
      </Container>
    );
  }
}

export default App;
