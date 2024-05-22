import React, { useEffect, useState } from "react";
import { getHelloMessage } from "../../lib/api";

const HelloPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHelloMessage();
        setMessage(data.message);
      } catch (error) {
        setMessage("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello from Django</h1>
      <p>{message}</p>
    </div>
  );
};

export default HelloPage;
