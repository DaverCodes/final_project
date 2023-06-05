import React, { useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react"

function Upload() {
const [imageSelected, setImageSelected] = useState("")


  const uploadImage = (files) => {
    console.log(files[0]);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "wayfarer");
    Axios.post("https://api.cloudinary.com/v1_1/di6pdrfqg/image/upload", formData).then((response)=> console.log(response));
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>upload image</button>

    </div>
  );
}

export default Upload;
