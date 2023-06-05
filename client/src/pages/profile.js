import React, { useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customModalStyles = {
  content: {
    width: "300px",
    height: "200px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

function Upload() {
  const [imageSelected, setImageSelected] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "wayfarer");
    setUploading(true);

    Axios.post(
      "https://api.cloudinary.com/v1_1/di6pdrfqg/image/upload",
      formData
    )
      .then((response) => {
        console.log(response);
        const url = response.data.url;
        setUploading(false);
        setImageUrl(url);
        openModal();
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
        setError("Error uploading image");
      });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>

      {uploading && <p>Please Wait...</p>}
      {error && <p>{error}</p>}

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <Image cloudName="di6pdrfqg" publicId={imageUrl} width="300" />
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <h2>Upload Success!</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Upload;
