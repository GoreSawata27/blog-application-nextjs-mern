import React from "react";

export default function Card() {
  return (
    <div className="card-container">
      <img
        src="https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg"
        alt="Company"
      />
      <div className="company-name">Company</div>
      <div className="description">
        Integer porta scelerisque sagittis, nunc mattis sit convallis nulla
        ultricies fermentum et rhoncus egestas pretium tempor odio sed.
      </div>
      <div className="time">
        <span className="icon">📅</span> 2 days ago
      </div>
    </div>
  );
}
