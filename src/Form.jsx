import "./styles.css";
import { useState } from "react";
import axios from "axios";

export default function Form({ onLinkSubmit, setName, setLink, link }) {
  const serverPort = "https://javadocs-to-file-backend.uc.r.appspot.com";

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmission = async (event) => {
    event.preventDefault();

    // sending link to backend
    try {
      const response = await axios.post(serverPort, link, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      const { className, body } = response.data;

      onLinkSubmit(String(body));
      setName(String(className));
    } catch (error) {
      alert("Error: Please Enter a Valid Link!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmission} className="input-row">
        <label htmlFor="link">LINK: </label>
        <input
          placeholder="Enter your link here"
          type="text"
          id="link"
          value={link}
          onChange={handleLinkChange}
        />
        <button className="submission-button">GENERATE!</button>
      </form>
    </>
  );
}
