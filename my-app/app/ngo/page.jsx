"use client";

import React, { useState } from "react";

const NGOTab = () => {
  const [activeTab, setActiveTab] = useState("donors");

  // Sample Donor Data
  const donors = [
    {
      name: "John Doe",
      contact: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Jane Smith",
      contact: "+91 87654 32109",
      location: "Delhi, Delhi",
    },
    {
      name: "Alice Johnson",
      contact: "+91 76543 21098",
      location: "Bangalore, Karnataka",
    },
  ];

  // Sample Volunteer Data
  const volunteers = [
    {
      name: "Volunteer 1",
      contact: "+91 12345 67890",
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Volunteer 2",
      contact: "+91 23456 78901",
      location: "Delhi, Delhi",
    },
    {
      name: "Volunteer 3",
      contact: "+91 34567 89012",
      location: "Bangalore, Karnataka",
    },
  ];

  // Sample Biogas Plants Data
  const biogasPlants = [
    {
      name: "Biogas Plant 1",
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Biogas Plant 2",
      location: "Delhi, Delhi",
    },
    {
      name: "Biogas Plant 3",
      location: "Bangalore, Karnataka",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">
          NGO Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("donors")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "donors"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            List Donors
          </button>
          <button
            onClick={() => setActiveTab("volunteers")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "volunteers"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            List Volunteers
          </button>
          <button
            onClick={() => setActiveTab("biogasPlants")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "biogasPlants"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            List Biogas Plants
          </button>
        </div>

        {/* Sliding Cards */}
        <div className="relative overflow-hidden h-96">
          {/* List Donors Card */}
          <div
            className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${
              activeTab === "donors"
                ? "translate-x-0"
                : activeTab === "volunteers"
                ? "-translate-x-full"
                : "-translate-x-full"
            }`}
          >
            <div className="bg-orange-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-orange-700 mb-6">
                List of Donors
              </h2>
              <ul className="space-y-4 max-h-72 overflow-y-auto">
                {donors.map((donor, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700">
                        {donor.name}
                      </h3>
                      <p className="text-sm text-gray-600">{donor.contact}</p>
                      <p className="text-sm text-gray-600">{donor.location}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
                        onClick={() => alert(`Contacting ${donor.name}`)}
                      >
                        Contact
                      </button>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                        onClick={() => alert(`Viewing directions to ${donor.location}`)}
                      >
                        View Direction
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* List Volunteers Card */}
          <div
            className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${
              activeTab === "volunteers"
                ? "translate-x-0"
                : activeTab === "donors"
                ? "translate-x-full"
                : "-translate-x-full"
            }`}
          >
            <div className="bg-orange-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-orange-700 mb-6">
                List of Volunteers
              </h2>
              <ul className="space-y-4 max-h-72 overflow-y-auto">
                {volunteers.map((volunteer, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700">
                        {volunteer.name}
                      </h3>
                      <p className="text-sm text-gray-600">{volunteer.contact}</p>
                      <p className="text-sm text-gray-600">{volunteer.location}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
                        onClick={() => alert(`Contacting ${volunteer.name}`)}
                      >
                        Contact
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* List Biogas Plants Card */}
          <div
            className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${
              activeTab === "biogasPlants"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <div className="bg-orange-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-orange-700 mb-6">
                List of Biogas Plants
              </h2>
              <ul className="space-y-4 max-h-72 overflow-y-auto">
                {biogasPlants.map((plant, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700">
                        {plant.name}
                      </h3>
                      <p className="text-sm text-gray-600">{plant.location}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
                        onClick={() => alert(`Contacting ${plant.name}`)}
                      >
                        Contact
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOTab;