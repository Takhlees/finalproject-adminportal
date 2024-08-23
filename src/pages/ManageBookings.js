import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("https://glimmer-petal-ceder.glitch.me/api/bookings/", {
        withCredentials: true, })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleApprove = (_id) => {
    axios
      .post(`https://glimmer-petal-ceder.glitch.me/api/bookings/approve/${_id}`, {
        withCredentials: true, })
      .then(() => {
        setBookings(
          bookings.map((booking) =>
            booking._id === _id ? { ...booking, status: "Approved" } : booking
          )
        );
      })
      .catch((error) => console.error("Error approving booking:", error));
  };

  const handleReject = (_id) => {
    axios
      .post(`https://glimmer-petal-ceder.glitch.me/api/bookings/reject/${_id}`, {
        withCredentials: true, })
      .then(() => {
        setBookings(
          bookings.map((booking) =>
            booking._id === _id ? { ...booking, status: "Rejected" } : booking
          )
        );
      })
      .catch((error) => console.error("Error rejecting booking:", error));
  };

  return (
    <div>
      <h1>Manage Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Booking _id</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>

              <td>{booking.status}</td>
              <td>
                <button onClick={() => handleApprove(booking._id)}>
                  Approve
                </button>
                <button onClick={() => handleReject(booking._id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
