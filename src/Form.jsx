import "./styles.css";
import { useState } from "react";
import axios from "axios";

export default function Form({ onLinkSubmit }) {
  const [link, setLink] = useState("");
  const serverPort = "http://localhost:3000";

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
      onLinkSubmit(String(response.data));
    } catch (error) {
      console.error("Error sending data to server:", error);
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
