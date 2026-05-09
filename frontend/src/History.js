import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [mails, setMails] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/history")
      .then((res) => {
        setMails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h2>Sent Mail History</h2>

      {mails.length === 0 ? (

        <p>No Mail History Found</p>

      ) : (

        mails.map((mail, index) => (

          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}
          >

            <p>
              <b>Subject:</b> {mail.subject}
            </p>

            <p>
              <b>Message:</b> {mail.message}
            </p>

            <p>
              <b>Emails:</b>{" "}
              {Array.isArray(mail.emails)
                ? mail.emails.join(", ")
                : mail.emails}
            </p>

            <p>
              <b>Status:</b> {mail.status}
            </p>

          </div>

        ))

      )}

    </div>

  );

}

export default History;
