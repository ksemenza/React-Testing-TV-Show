import fetchShow from './api/fetchShow'
import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";
import { formatSeasons } from "./utils/formatSeasons";
import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [error, setError] = useState('')
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];



  useEffect(() => {

    fetchShow().then(res => {
      // console.log(res.data)
      setIsFetchingData(true)
      setShow(res.data)
      setSeasons(formatSeasons(res.data._embedded.episodes))
    })
    .catch(err=> {
      setIsFetchingData(false)
      setError(err.messsage)

    })
  },[]);

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };
  console.log(seasons)

  if (!show) {
    return <h2>Fetching data...</h2>;
  }


  return (
    <div className="App">
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
    
      <Dropdown
        data-testid="drop-down"
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
        isFetchingData={isFetchingData}
        />
      <Episodes episodes={episodes} />
    </div>
  );
}