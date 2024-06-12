/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./components/Pill";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchUser = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      fetch(`http://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((error) => console.error(error));
    };
    const timeout = setTimeout(() => {
      fetchUser();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleClick = (item) => {
    setSelectedUsers([...selectedUsers, item]);
    setSelectedUserSet(new Set([...selectedUserSet, item.email]));
    setSuggestions([]);
    setSearchTerm("");
    inputRef.current.focus();
  };

  const handleRemove = (user) => {
    const newSeleciton = selectedUsers.filter((item) => item.id !== user.id);
    setSelectedUsers(newSeleciton);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Multi select input box</h1>
      <div className="search-input">
        {selectedUsers?.map((user) => (
          <Pill
            key={user.email}
            image={user.image}
            text={`${user.firstName} ${user.lastName}`}
            onClick={() => handleRemove(user)}
          />
        ))}
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter user name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />

          {suggestions?.users?.length > 0 && (
            <ul className="suggestions-box">
              {suggestions?.users?.map((item, index) => {
                return !selectedUserSet.has(item.email) ? (
                  <li
                    key={item.email}
                    className="suggestion-item"
                    onClick={() => handleClick(item)}
                  >
                    <div>
                      <img
                        src={item.image}
                        alt={`${item.firstName} ${item.lastName}`}
                      />
                    </div>
                    <span>
                      {item.firstName} {item.lastName}
                    </span>
                  </li>
                ) : (
                  <></>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
