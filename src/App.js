import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import ReactJson from "react-json-view";
import axios from "axios";
function App() {
  const [apiKey, setApiKey] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [videoId, setVideoId] = useState("");
  const [ytData, setYtData] = useState({});
  const onTextChange = (event) => {
    if (event.target.id === "videoId") setVideoId(event.target.value);
    if (event.target.id === "accessToken") setAccessToken(event.target.value);
  };
  const onSubmitClick = async () => {
    try {
      if ((apiKey === "") | (accessToken === "") | (videoId === ""))
        alert("Please fill all the fields");

      const response = await axios.post(
        "http://localhost:3000/video/get-by-id",
        {
          access_token: accessToken,
          id: videoId,
          apiKey,
        }
      );
      if (response.status === 201) {
        setYtData(response.data);
      }
    } catch (error) {
      console.log(error);
      alert(
        "Something went wrong. Please check if you have a valid token, api key or id"
      );
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="block">
          <div className="container">
            <input
              onChange={onTextChange}
              id="videoId"
              value={videoId}
              class="input"
              type="text"
              placeholder="Enter YouTube Url"
            />
            <input
              onChange={onTextChange}
              id="accessToken"
              value={accessToken}
              class="input"
              type="text"
              placeholder="Enter Access Token"
            />
            <button onClick={onSubmitClick} class="button is-primary">
              Submit
            </button>
          </div>
        </div>
        <ReactJson
          style={{ fontSize: "13px" }}
          theme="apathy:inverted"
          src={ytData}
        />
      </header>
    </div>
  );
}

export default App;
