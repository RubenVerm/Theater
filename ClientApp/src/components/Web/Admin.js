import React, { useState, useEffect } from "react";
import axios from "axios";

export const Admin = () => {
  const [showName, setShowName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [showDate, setShowDate] = useState("");
  const [bandId, setBandId] = useState("");
  const [hallId, setHallId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [actorId, setActorId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const showData = {
      showName,
      genre,
      duration,
      showDate,
      bandId,
      hallId,
      roomId,
      actorId,
    };

    try {
      const response = await fetch("https://localhost:7000/api/show", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(showData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Show Name"
        value={showName}
        onChange={(e) => setShowName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder="Show Date"
        value={showDate}
        onChange={(e) => setShowDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Band Id"
        value={bandId}
        onChange={(e) => setBandId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Hall Id"
        value={hallId}
        onChange={(e) => setHallId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room Id"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Actor Id"
        value={actorId}
        onChange={(e) => setActorId(e.target.value)}
      />
      <button type="submit">Create Show</button>
    </form>
    <HallsPage />
    </div>
  );
};



const HallsPage = () => {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [name, setName] = useState("");
  const [firstClassSeats, setFirstClassSeats] = useState("");
  const [secondClassSeats, setSecondClassSeats] = useState("");
  const [thirdClassSeats, setThirdClassSeats] = useState("");

  useEffect(() => {
    const fetchHalls = async () => {
      const response = await fetch("https://localhost:7000/api/hall");
      const data = await response.json();
      setHalls(data);
    };

    fetchHalls();
  }, []);

  const handleRowClick = (hall) => {
    setSelectedHall(hall);
    setName(hall.name);
    setFirstClassSeats(hall.firstClassSeats);
    setSecondClassSeats(hall.secondClassSeats);
    setThirdClassSeats(hall.thirdClassSeats);
  };

  const handleUpdate = async () => {
    const updatedHall = {
      hallId: selectedHall.hallId,
      name,
      firstClassSeats,
      secondClassSeats,
      thirdClassSeats,
    };

    const response = await fetch(`https://localhost:7000/api/hall/${selectedHall.hallId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedHall),
    });

    if (response.ok) {
      setHalls(
        halls.map((hall) => {
          if (hall.hallId === selectedHall.hallId) {
            return updatedHall;
          }
          return hall;
        })
      );
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>First Class Seats</th>
            <th>Second Class Seats</th>
            <th>Third Class Seats</th>
          </tr>
        </thead>
        <tbody>
          {halls.map((hall) => (
            <tr key={hall.hallId} onClick={() => handleRowClick(hall)}>
              <td>{hall.hallId}</td>
              <td>{hall.name}</td>
              <td>{hall.firstClassSeats}</td>
              <td>{hall.secondClassSeats}</td>
              <td>{hall.thirdClassSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedHall && (
        <>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
              </div>
              <div>
              <label htmlFor="firstClassSeats">First Class Seats:</label>
              <input
              type="text"
              id="firstClassSeats"
              value={firstClassSeats}
              onChange={(e) => setFirstClassSeats(e.target.value)}
              />
              </div>
              <div>
              <label htmlFor="secondClassSeats">Second Class Seats:</label>
              <input
              type="text"
              id="secondClassSeats"
              value={secondClassSeats}
              onChange={(e) => setSecondClassSeats(e.target.value)}
              />
              </div>
              <div>
              <label htmlFor="thirdClassSeats">Third Class Seats:</label>
              <input
              type="text"
              id="thirdClassSeats"
              value={thirdClassSeats}
              onChange={(e) => setThirdClassSeats(e.target.value)}
              />
              </div>
              <button onClick={handleUpdate}>Update</button>
              </>
              )}
              </>
              );
              };