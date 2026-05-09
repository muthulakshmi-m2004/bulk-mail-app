import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import History from "./History";

function App() {

  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/send-email",
        {
          subject,
          message,
          emails,
        }
      );

      setStatus(response.data);

    } catch (error) {
      console.log(error);

      if (error.response) {
        setStatus(error.response.data);
      } else {
        setStatus("Server Error");
      }
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Bulk Mail App</h1>

      <input
        type="text"
        placeholder="Enter Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />

      <br /><br />

      <textarea
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="5"
        cols="40"
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Email"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />

      <br /><br />

      <button onClick={sendEmail}>
        Send Email
      </button>

      <br /><br />

      <button onClick={() => navigate("/history")}>
        View History
      </button>

      <p>{status}</p>

    </div>
  );
}

export default App;
