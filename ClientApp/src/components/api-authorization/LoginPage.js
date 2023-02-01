const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secret = "secret-key";

const users = [
  { id: 1, email: "user1@example.com", name: "User 1" },
  { id: 2, email: "user2@example.com", name: "User 2" }
];

app.get("/api/Profile", (req, res) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).json({ message: "No authorization header found" });
  }

  const token = authorizationHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    const user = users.find(user => user.id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
