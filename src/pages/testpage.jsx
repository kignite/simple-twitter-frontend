import React, { useState } from "react";
import axios from "axios";

const UploadCard = () => {
  const baseURL = "https://calm-basin-50282.herokuapp.com/api";
  const token = localStorage.getItem("token");
  const id = 14;
  const [file, setFile] = useState();
  const handleChange = (e) => {
    setFile({
      name: "12345",
      avatar: e.target.files[0],
      cover: e.target.files[0],
      introduction: "廢文製造機",
    });
  };
  const fileUpload = async () => {
    const url = baseURL + "/users/" + id;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    console.log(file);
    try {
      const { status } = await axios.put(url, file, config);
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <h2>Input file</h2>
      <form>
        <input type="file" onChange={handleChange} />
      </form>
      <button onClick={fileUpload}>點我上傳</button>
    </div>
  );
};

export default UploadCard;
