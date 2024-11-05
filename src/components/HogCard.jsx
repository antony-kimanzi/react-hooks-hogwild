import React from "react";
import { useState } from "react";
import FilterButton from "./FilterButton";
import AddHogForm from "./AddCard";
import "../index.css";

export default function HogCard({ hogs }) {
  const [hogList, setHogList] = useState(hogs)
  const [selectedHog, setSelectedHog] = useState(null);
  const [showGreasedHog, setShowGreasedHog] = useState(false);
  const [sortHogBy, setSortHogBy] = useState("");
  const [hiddenHogs, setHiddenHogs] = useState([]); // Track hidden hogs by name

  // function to set the new state of the hogs array
  const onAddHog = (newHog) => {
    setHogList((prevHogs) => [...prevHogs, newHog]);
  };


  const displayHogDetails = (hog) => {
    if (selectedHog && selectedHog.name === hog.name) {
      setSelectedHog(null);
    } else {
      setSelectedHog(hog);
    }
  };

  const initiateGreasedFilter = () => {
    setShowGreasedHog((initialState) => !initialState);
  };

  const onSortChange = (e) => {
    setSortHogBy(e.target.value); // Update the sortBy state with the selected value
  };

  const hideHog = (hogName) => {
    setHiddenHogs((previousHiddenHogs) => [...previousHiddenHogs, hogName]);
  };

  const triggerHideButton = (e, hogName) => {
    e.stopPropagation();
    hideHog(hogName);
  };

  let filteredHogs;

  if (showGreasedHog) {
    filteredHogs = hogList.filter((hog) => hog.greased);
  } else {
    filteredHogs = hogList;
  }

  filteredHogs = filteredHogs.filter((hog) => !hiddenHogs.includes(hog.name));

  if (sortHogBy === "name") {
    filteredHogs = filteredHogs.sort((hogA, hogB) =>
      hogA.name.localeCompare(hogB.name)
    );
  } else if (sortHogBy === "weight") {
    filteredHogs = filteredHogs.sort((hogA, hogB) => hogA.weight - hogB.weight);
  }

  return (
    <div className="ui two cards">
      <FilterButton
        showGreasedHog={showGreasedHog}
        initiateGreasedFilter={initiateGreasedFilter}
      />

      <select className="ui dropdown" onChange={onSortChange}>
        <option value="">Remove Sort</option>
        <option value="name">Sort By Name</option>
        <option value="weight">Sort By Weight</option>
      </select>

      <AddHogForm onAddHog={onAddHog} />

      {filteredHogs.map((hog) => {
        const isSelectedHog = selectedHog && selectedHog.name === hog.name;
        return (
          <div
            key={hog.name}
            className="card"
            onClick={() => displayHogDetails(hog)}
          >
            <div className="ui medium centered rounded image">
              <img src={hog.image} alt={`${hog.name} pic`} />
            </div>
            <div className="content">
              <div className="header">{hog.name}</div>
              {isSelectedHog && (
                <div className="extra-details">
                  <p>
                    <strong>Specialty:</strong> {hog.specialty}
                  </p>
                  <p>
                    <strong>Weight:</strong> {hog.weight}
                  </p>
                  <p>
                    <strong>Highest Medal:</strong>{" "}
                    {hog["highest medal achieved"]}
                  </p>
                </div>
              )}
            </div>
            <div
              className="ui basic red bottom attached button"
              onClick={(e) => triggerHideButton(e, hog.name)}
            >
              <i className="ban icon"></i>
              Hide
            </div>
          </div>
        );
      })}
    </div>
  );
}