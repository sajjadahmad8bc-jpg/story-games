import { useState } from "react";
import { Button, Form,  ListGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import sampleImage from "../../../assets/newChat.png";
import styles from "./Chat2.module.css";

const NewChatModal = ({ onHide, contacts, setContacts, onSelectContact }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateContact = () => {
    if (!searchTerm.trim()) return;
    const newContact = {
      name: searchTerm.trim(),
      time: "Just now",
      avatar: searchTerm[0].toUpperCase(),
    };

    setContacts((prev) => [newContact, ...prev]);
    onSelectContact(newContact);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onHide}>
          &times;
        </button>

        <img src={sampleImage} alt="New Chat" className={styles.popupImage} />
        <h5 className="text-center mb-3">New Chat</h5>
        <div className={`mb-4 mt-5 position-relative ${styles.searchGroup}`}>
          <BsSearch className={styles.searchIcon} />
          <Form.Control
            type="text"
            placeholder="Search to Recipient"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchTerm && (
          <div className={styles.dropdownList}>
            {filteredContacts.length > 0 ? (
              <ListGroup>
                {filteredContacts.map((contact, i) => (
                  <ListGroup.Item
                    key={i}
                    action
                    onClick={() => onSelectContact(contact)}
                  >
                    {contact.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="text-center text-muted py-2">
                No contact found for "{searchTerm}"
              </div>
            )}
          </div>
        )}

        <Button
          variant={filteredContacts.length > 0 ? "primary" : "success"}
          className={`${styles.startChatBtn} py-2 px-3 px-md-5 mt-3`}
          onClick={() => {
            if (filteredContacts.length > 0) {
              onSelectContact(filteredContacts[0]);
            } else {
              handleCreateContact();
            }
          }}
        >
          {filteredContacts.length > 0 ? "Start Chat" : `Create New Contact`}
        </Button>
      </div>
    </div>
  );
};

export default NewChatModal;
