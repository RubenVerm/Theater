import React, { useState, useEffect } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:7000/api/Account/registreer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      console.log(result);
      if (result.token) {
        localStorage.setItem("token", result.token);
        setToken(result.token);
      }
      // Handle successful login
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  if (!token) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
    );
  }

  return <UserProfilePage />;
};

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://localhost:7000/api/Profile", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        console.log(result);
        setUser(result);
      } catch (error) {
        console.error(error);
        // Handle error fetching user data
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const SECRET = "secret-key";

const users = [
  {
    id: 1,
    email: "user1@example.com",
    name: "User 1",
  },
  {
    id: 2,
    email: "user2@example.com",
    name: "User 2",
  },
];

// app.get("/api/Profile", (req, res) => {
//   const bearerHeader = req.headers["authorization"];
//   if (!bearerHeader) {
//     return res.status(401).send({ error: "No authorization header found." });
//   }

//   const bearerToken = bearerHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(bearerToken, SECRET);
//     const user = users.find((user) => user.id === decoded.id);
//     if (!user) {
//       return res.status(404).send({ error: "User not found." });
//     }
//     return res.send({ ...user });
//   } catch (error) {
//     return res.status(401).send({ error: "Invalid token." });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server listening on port 3000.");
// });
