"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCamera, faSave, faUsers } from "@fortawesome/free-solid-svg-icons";

const DonorFlow = () => {

  const [donorName, setDonorName] = useState("");
  const [contactName, setContactName] = useState("");
  const [donorType, setDonorType] = useState("individual");


  const [foodFor, setFoodFor] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [quantity, setQuantity] = useState(">5");
  const [foodImage, setFoodImage] = useState(null);

  
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);

  // State to manage current card
  const [currentCard, setCurrentCard] = useState("donorInfo");

  // Handle Donor Info Submission
  const handleDonorInfoSubmit = (e) => {
    e.preventDefault();
    console.log("Donor Name:", donorName);
    console.log("Contact Name:", contactName);
    console.log("Donor Type:", donorType);
    setCurrentCard("donorForm"); // Move to Donor Form
  };

 
  const handleDonorFormSubmit = () => {
    if (!foodFor) {
      alert("Please select who the food is for.");
      return;
    }

    const formData = {
      foodFor,
      foodType: foodFor === "humans" ? foodType : "Not applicable",
      quantity: foodFor === "humans" ? quantity : "Not applicable",
      foodImage,
    };

    console.log("Saved Data:", formData);
    setCurrentCard("donationLocation"); // Move to Donation Location
  };

  // Handle Donation Location Submission
  const handleDonationLocationSubmit = (e) => {
    e.preventDefault();
    console.log("Address:", address);
    console.log("Location:", location);
    alert("Donation details submitted successfully!");
  };

  // Get Location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Render Donor Info Card
  const renderDonorInfoCard = () => (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <div className="absolute inset-0 bg-[url('/food_all.jpg')] bg-cover bg-center opacity-10%"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-2xl w-[500px] aspect-[2/1] flex flex-col justify-center space-y-4">
        <h1 className="text-2xl font-bold text-center text-orange-600">Donor Information</h1>
        <form onSubmit={handleDonorInfoSubmit} className="space-y-4">
          {/* Donor Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donor Type</label>
            <div className="grid grid-cols-3 gap-2">
              {["individual", "restaurant", "event_organization"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-center p-2 rounded-lg text-sm cursor-pointer transition-all 
                  ${
                    donorType === type
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    value={type}
                    checked={donorType === type}
                    onChange={(e) => setDonorType(e.target.value)}
                    className="hidden"
                  />
                  <span className="capitalize">{type.replace("_", " ")}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Donor Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Donor Name</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter donor name"
              required
            />
          </div>

          {/* Contact Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="number"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );

  // Render Donor Form Card
  const renderDonorFormCard = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-2 text-center">Food Donation</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">Help us make a difference by donating food.</p>

        {/* Food For Selection */}
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <FontAwesomeIcon icon={faUtensils} className="text-orange-600 mr-2" />
          Food for:
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          value={foodFor}
          onChange={(e) => setFoodFor(e.target.value)}
        >
          <option value="">Select</option>
          <option value="humans">Humans</option>
          <option value="animals">Street Animals</option>
        </select>

        {/* Upload Image */}
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <FontAwesomeIcon icon={faCamera} className="text-orange-600 mr-2" />
          Upload Food Image:
        </label>
        <div className="relative flex items-center border border-gray-300 rounded-lg bg-gray-50 mb-4">
          <input
            type="file"
            className="w-full p-2 opacity-0 absolute"
            onChange={(e) => setFoodImage(e.target.files[0])}
          />
          <span className="text-sm text-gray-600 ml-3">
            {foodImage ? foodImage.name : "Choose a file"}
          </span>
        </div>

        {/* Show only if 'Food for' is Humans */}
        {foodFor === "humans" && (
          <>
            {/* Food Type Selection */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Food Type:</label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="foodType"
                  value="veg"
                  checked={foodType === "veg"}
                  onChange={() => setFoodType("veg")}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 border-2 rounded-full mr-2 ${
                    foodType === "veg" ? "border-green-600 bg-green-600" : "border-gray-300"
                  }`}
                ></span>
                Veg
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="foodType"
                  value="nonveg"
                  checked={foodType === "nonveg"}
                  onChange={() => setFoodType("nonveg")}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 border-2 rounded-full mr-2 ${
                    foodType === "nonveg" ? "border-red-600 bg-red-600" : "border-gray-300"
                  }`}
                ></span>
                Non-Veg
              </label>
            </div>

            {/* Quantity Selection */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (for humans):</label>
            <div className="relative flex items-center border border-gray-300 rounded-lg bg-gray-50 mb-4">
              <FontAwesomeIcon icon={faUsers} className="text-orange-600 ml-3" />
              <select
                className="w-full p-3 bg-transparent outline-none text-gray-700"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                <option value=">5">{">"} 5 people</option>
                <option value=">10">{">"} 10 people</option>
                <option value=">25">{">"} 25 people</option>
                <option value=">50">{">"} 50 people</option>
                <option value="50+">{"<"} 50 people</option>
              </select>
            </div>
          </>
        )}

        {/* Next Button */}
        <button
          type="button"
          onClick={handleDonorFormSubmit}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Render Donation Location Card
  const renderDonationLocationCard = () => (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <div className="absolute inset-0 bg-[url('/food_all.jpg')] bg-cover bg-center opacity-100"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-2xl w-[500px] aspect-[2/1] flex flex-col justify-center space-y-4">
        <h1 className="text-2xl font-bold text-center text-orange-600">Donation Location</h1>
        <form onSubmit={handleDonationLocationSubmit} className="space-y-4">
          {/* Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Get Location Button */}
          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Location
          </button>

          {/* Display Location */}
          {location && (
            <p className="text-sm text-gray-700 text-center">
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );

  // Render the current card based on state
  switch (currentCard) {
    case "donorInfo":
      return renderDonorInfoCard();
    case "donorForm":
      return renderDonorFormCard();
    case "donationLocation":
      return renderDonationLocationCard();
    default:
      return null;
  }
};

export default DonorFlow;