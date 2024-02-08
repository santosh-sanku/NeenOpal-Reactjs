import React, { useState, useEffect } from "react";
import "./proflieCard.css";
import Modal from "react-modal";

const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getCustomStyles = () => {
  if (typeof window !== "undefined") {
    const screenWidth = window.innerWidth;

    // For smaller screens
    if (screenWidth <= 768) {
      return {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          width: "90%",
          maxWidth: "420px",
          overflow: "auto",
        },
      };
    }
  }

  // Default styles for larger screens
  return {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "420px",
      width: "420px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
    },
  };
};

const ProfileCard = ({ profile, onUpdate, onDelete }) => {
  const { id, name, telephone, email, linkedin, imageUrl } = profile;

  const [liked, setLiked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [formData, setFormData] = useState({
    name: name,
    telephone: telephone,
    email: email,
    website: linkedin,
  });

  useEffect(() => {
    setFormData({ name, telephone, email, linkedin });
  }, [name, telephone, email, linkedin]);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customStyles = getCustomStyles();

  const handleModalOpen = (card) => {
    setModalIsOpen(true);
    setSelectedCard(card);
  };

  const handleClickDelete = () => {
    onDelete(id);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(id, formData);
    setModalIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      <div className="profile-card">
        <div className="profile-image">
          <img src={imageUrl} alt="Profile-Image" />
        </div>

        <div className="profile-info">
          <h2>{name}</h2>
          <p>
            <i className="fa-regular fa-envelope"></i> {telephone}
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> {email}
          </p>
          <p>
            <i className="fa-solid fa-globe"></i> {linkedin}
          </p>
        </div>

        <div className="profile-actions">
          <span
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <i className={`fas fa-heart ${liked ? "liked" : ""}`}></i>
          </span>

          <span className="edit-button" onClick={() => handleModalOpen(id)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </span>

          <span className="delete-button" onClick={handleClickDelete}>
            <i className="fa-solid fa-trash"></i>
          </span>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="modal-container">
          <div className="modal-head">
            <p>Basic Modal</p>

            <button
              className="modal-cross"
              style={{ marginRight: "10px" }}
              onClick={() => {
                setModalIsOpen(false);
                setSelectedCard(null);
              }}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form className="input-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label style={{ marginRight: "16px" }}>
                <small style={{ color: "red" }}>*</small>Name:{" "}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label style={{ marginRight: "16px" }}>
                <small style={{ color: "red" }}>*</small>Email:{" "}
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label style={{ marginRight: "16px" }}>
                <small style={{ color: "red" }}>*</small>Phone:{" "}
              </label>
              <input
                type="text"
                name="telephone"
                required
                value={formData.telephone}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label style={{ marginRight: "16px" }}>
                <small style={{ color: "red" }}>*</small>Website:{" "}
              </label>
              <input
                type="text"
                name="website"
                required
                value={formData.linkedin}
                onChange={handleInputChange}
              />
            </div>

            <div className="button-group">
              <button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  setModalIsOpen(false);
                  setSelectedCard(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" style={{ backgroundColor: "#448ee4" }}>
                Ok
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileCard;
