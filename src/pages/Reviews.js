import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://glimmer-petal-ceder.glitch.me/api/reviews/", {
        withCredentials: true, }
)
      .then((response) => {
        setReviews(response.data);
        
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div>
      <h1>Guest Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <strong>{review._id}</strong>: {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
