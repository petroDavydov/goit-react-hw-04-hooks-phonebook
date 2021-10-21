import { useState, useEffect } from "react";
// ===========================================
import Container from "./container/Container";
// ===========================================
import ContactForm from "./ContactForm/ContactForm";
import baseContact from "./json/contact.json";
// ===========================================
import ContactList from "./ContactList/ContactList";
// ===========================================
import Filter from "./Filter/Filter";
// ===========================================

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? baseContact
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (data) => {
    if (
      contacts.some(
        (element) =>
          element.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
      )
    ) {
      return alert("We have this contact");
    }

    setContacts([...contacts, data]);
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getVisibleContact = () => {
    const contactFilter = filter.toLocaleLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(contactFilter)
    );
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <Container>
      <h1 className="title">PhoneBook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <Filter value={filter} onChange={changeFilter} />

      <h2 className="contactTitle">Contacts</h2>
      <ContactList
        contacts={getVisibleContact()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

export default App;
