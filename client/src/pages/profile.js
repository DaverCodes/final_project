import React, { useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react";
import Modal from "react-modal";
import "./Profile.css"

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

const categories = [
  "food",
  "household supplies",
  "electronics",
  "books",
  "toys",
  "pharmacy",
  "pet supplies",
  "clothing & accessories",
  "furniture",
  "sports & outdoors",
];

function Upload() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform form submission logic or API call here

    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setImageSelected("");
    setImageUrl("");
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
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
        setError("Error uploading image");
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
          <button type="button" onClick={uploadImage}>
            Upload Image
          </button>
        </div>
        <p>Once you have finished uploading images, please submit</p>
        <button type="submit">Submit</button>
      </form>

      {uploading && <p>Please Wait For Image upload...</p>}
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

