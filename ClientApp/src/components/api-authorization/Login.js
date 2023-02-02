import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("https://localhost:7000/api/Auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        console.log(result);
        if (result.token) {
        localStorage.setItem("token", result.token);
        setToken(result.token);
        navigate("/");
      }else {
        setError(result.error);
      }
    } catch (error) {
      console.error(error);
      setError("Error with login, try again");
    }
  };
    
  
    if (!token) {
        return (
          <>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </>
        );
      }
    
      return null;
    };