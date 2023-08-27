import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import useDeleteInstitutions from "../../customHooks/useDeleteInstitution.js";
import UpdateInstitutionModalComponent from "../Modal/UpdateInstitutionModalComponent.js";

const CardComponent = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { provincesTerritories } = useContext(AppContext);
  const [provincesTerritoriesData] = provincesTerritories;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const deleteInstitution = useDeleteInstitutions();

  const handleDelete = async (id) => {
    await deleteInstitution.mutateAsync(id);
  };

  return (
    <div className="card">
      <p>name: {props.data.value.name}</p>
      <p>city: {props.data.value.city}</p>
      <p>province/territory: {props.data.value.province_territory}</p>
      <button
        id={props.data.value.id}
        onClick={() => handleDelete(props.data.value.id)}
      >
        Remove
      </button>
      <button onClick={handleOpenModal}>Update</button>
      {showModal && (
        <UpdateInstitutionModalComponent
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          provincesTerritories={provincesTerritoriesData}
          data={props.data.value}
        />
      )}
    </div>
  );
};

export default CardComponent;
