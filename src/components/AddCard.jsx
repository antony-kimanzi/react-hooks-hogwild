import React, { useState } from "react";
import "../index.css"

export default function AddHogForm({ onAddHog }) {
  const [newHog, setNewHog] = useState({
    name: "",
    specialty: "",
    weight: "",
    greased: false,
    image: "",
    "highest medal achieved": "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHog((prevNewHog) => ({
      ...prevNewHog,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddHog({ ...newHog, weight: parseFloat(newHog.weight) }); // Pass new hog to parent
    // Reset form fields
    setNewHog({
      name: "",
      specialty: "",
      weight: "",
      greased: false,
      image: "",
      "highest medal achieved": "",
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="ui form">
      <h3>Add a New Hog</h3>

      <div className="fields">
        <div className="four wide field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newHog.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="eight wide field">
          <label>Specialty</label>
          <input
            type="text"
            name="specialty"
            value={newHog.specialty}
            onChange={handleInputChange}
          />
        </div>

        <div className="two wide field">
          <label>Weight</label>
          <input
            type="number"
            name="weight"
            value={newHog.weight}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="fields">
        <div className="field">
          <label>
            <input
              type="checkbox"
              name="greased"
              checked={newHog.greased}
              onChange={handleInputChange}
            />
            Greased
          </label>
        </div>

        <div className="six wide field">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={newHog.image}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="field">
        <label>Highest Medal Achieved</label>
        <input
          type="text"
          name="highest medal achieved"
          value={newHog["highest medal achieved"]}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="ui button primary">
        Add Hog
      </button>
    </form>
  );
}
