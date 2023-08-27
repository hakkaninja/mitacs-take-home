"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "./components/Modal/AddInstitutionModalComponent.js";
import useInstitutions from "./customHooks/useInstitutions.js";
import useCities from "./customHooks/useCities.js";
import InstitutionListComponent from "./components/InstitutionList/InstitutionListComponent.js";
import useProvincesTerritories from "./customHooks/useProvincesTerritories.js";
import { AppContext } from "./context/appContext.js";
import SearchFormComponent from "./components/SearchForm/SearchFormComponent.js";
import Dropdown from "./components/Dropdown/DropdownComponent.js";
import { DropdownTypes } from "./constants.js";
import filterData from "../src/helper.js";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onProvinceTerritoryChange = (e) => {
    setProvinceTerritory(e.target.value);
  };

  const [city, setCity] = useState("");
  const [provinceTerritory, setProvinceTerritory] = useState("");
  const [keyword, setKeyword] = useState("");

  const institutionsQuery = useInstitutions();

  const citiesQuery = useCities();
  const provincesTerritoriesQuery = useProvincesTerritories([]);

  if (
    institutionsQuery.isLoading ||
    citiesQuery.isLoading ||
    provincesTerritoriesQuery.isLoading
  ) {
    return <div data-testid="app-loading">Loading Data...</div>;
  }
  if (
    institutionsQuery.isError ||
    citiesQuery.isError ||
    provincesTerritoriesQuery.isError
  ) {
    return (
      <div data-testid="app-error">
        Data Loading failed, please try again later
      </div>
    );
  }

  let list = filterData(
    institutionsQuery.data,
    city,
    provinceTerritory,
    keyword
  );

  return (
    <AppContext.Provider
      value={{
        selectedCity: [city, setCity],
        selectedProvinceTerritory: [provinceTerritory, setProvinceTerritory],
        keyword: [keyword, setKeyword],
        cities: [citiesQuery.data],
        provincesTerritories: [provincesTerritoriesQuery.data],
      }}
    >
      <div data-testid="app" className="App">
        <h1>Institution Directory</h1>
        <ToastContainer />
        <button data-testid="add-institution" onClick={handleOpenModal}>
          Add New Institution
        </button>
        {showModal && (
          <Modal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            provincesTerritories={provincesTerritoriesQuery.data}
          />
        )}
        <SearchFormComponent cities={citiesQuery.data} />
        <Dropdown
          data={citiesQuery.data}
          onChange={onCityChange}
          type={DropdownTypes.City}
        />
        <Dropdown
          data={provincesTerritoriesQuery.data}
          onChange={onProvinceTerritoryChange}
          type={DropdownTypes["Province/Territory"]}
        />
        <InstitutionListComponent data={list} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
