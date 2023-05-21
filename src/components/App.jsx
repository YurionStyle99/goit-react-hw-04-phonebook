import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid/non-secure";
import styles from "./styles.module.css";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = window.localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const id = nanoid();
    const newContact = { id, name, number };
    const isNameExist = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    setFilter(filterValue);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className={styles.container}>
      <h1>Name</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
