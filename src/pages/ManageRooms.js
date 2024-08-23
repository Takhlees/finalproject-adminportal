import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageRooms.css";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [roomForm, setRoomForm] = useState({
    number: "",
    type: "",
    servantName: "",
    servantContact: "",
    price: "",
    image: "",
    description: "",
    status: "Available",
  });
 
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("https://glimmer-petal-ceder.glitch.me/api/rooms/");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setRoomForm(room);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`https://glimmer-petal-ceder.glitch.me/api/rooms/${roomId}`);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedRoom) {
        await axios.put(
          `https://glimmer-petal-ceder.glitch.me/api/rooms/${selectedRoom._id}`,
          roomForm
        );
      } else {
        await axios.post("https://glimmer-petal-ceder.glitch.me/api/rooms/", roomForm);
      }
      fetchRooms();
      setIsEditing(false);
      setIsAdding(false);
      setRoomForm({
        number: "",
        type: "",
        servantName: "",
        servantContact: "",
        price: "",
        image: "",
        description: "",
        status: "Available",
      });
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };


  const handleAddNewRoom = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedRoom(null);
    setRoomForm({
      number: "",
      type: "Single",
      servantName: "",
      servantContact: "",
      price: "",
      image: "",
      description: "",
      status: "Available",
    });
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setIsAdding(false);
    setRoomForm({
      number: "",
      type: "Single",
      servantName: "",
      servantContact: "",
      price: "",
      image: "",
      description: "",
      status: "Available",
    });
  };

  return (
    <div className="container">
      <h1>Manage Rooms</h1>

      <button className="add-new" onClick={handleAddNewRoom}>
        Add New Room
      </button>

      <table>
        <thead>
          <tr>
            <th>Room No</th>
            <th>Type</th>
            <th>Servant Name</th>
            <th>Servant Contact</th>
            <th>Price/Per Day</th>
            <th>Image</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.number}</td>
              <td>{room.type}</td>
              <td>{room.servantName}</td>
              <td>{room.servantContact}</td>
              <td>{room.price}</td>
              <td>
                <img src={room.image} alt="Room" className="room-image" />
              </td>
              <td>{room.description}</td>
              <td>{room.status}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(room)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(room._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(isEditing || isAdding) && (
        <div className="room-form">
          <button className="close-button" onClick={handleCloseForm}>
            &times;
          </button>
          <h2>{selectedRoom ? "Edit Room" : "Add New Room"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}>
            <input
              type="text"
              value={roomForm.number}
              onChange={(e) =>
                setRoomForm({ ...roomForm, number: e.target.value })
              }
              placeholder="Room No"
              required
            />
            <select
              value={roomForm.type}
              onChange={(e) =>
                setRoomForm({ ...roomForm, type: e.target.value })
              }
              required>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
            </select>
            <input
              type="text"
              value={roomForm.servantName}
              onChange={(e) =>
                setRoomForm({ ...roomForm, servantName: e.target.value })
              }
              placeholder="Servant Name"
              required
            />
            <input
              type="text"
              value={roomForm.servantContact}
              onChange={(e) =>
                setRoomForm({ ...roomForm, servantContact: e.target.value })
              }
              placeholder="Servant Contact"
              required
            />
            <input
              type="number"
              value={roomForm.price}
              onChange={(e) =>
                setRoomForm({ ...roomForm, price: e.target.value })
              }
              placeholder="Price/Per Day"
              required
            />
            <input
              type="text"
              value={roomForm.image}
              onChange={(e) =>
                setRoomForm({ ...roomForm, image: e.target.value })
              }
              placeholder="Image URL"
              required
            />
            <textarea
              value={roomForm.description}
              onChange={(e) =>
                setRoomForm({ ...roomForm, description: e.target.value })
              }
              placeholder="Description"
              required
            />
            <select
              value={roomForm.status}
              onChange={(e) =>
                setRoomForm({ ...roomForm, status: e.target.value })
              }
              required>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
            <button className="save-button" type="submit">
              Save
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default ManageRooms;
