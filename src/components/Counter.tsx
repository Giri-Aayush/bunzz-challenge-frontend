import React, { useState } from "react";
import axios from "axios";

type JSONResponse = {
  status: number;
  message: string;
};

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const increment = async () => {
    const newCount = count + 1;
    setCount(newCount);

    try {
      const receivedMessage = await receivedPayload(newCount);
      setMessage(receivedMessage.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error fetching data.");
    }
  };

  async function receivedPayload(_count: number): Promise<JSONResponse> {
    const response = await axios.post<JSONResponse>(
      "https://bunzz-challenge-backend-production.up.railway.app/fizzbuzz",
      {
        Count: _count,
      }
    );
    return response.data;
  }

  return (
    <>
      <div className="main-container">
        <div className="your-count">
          <div className="your-count count-show">Your Count</div>
          <div className="count-show">{count}</div>
        </div>
        <div>
          <button className="btn" onClick={increment}>
            Push Me !
          </button>
        </div>
        <div className="message-shown-field">{message}</div>
      </div>
    </>
  );
};
