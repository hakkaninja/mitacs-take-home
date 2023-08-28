import React from "react";
import { useState } from "react";
import useDeleteInstitutions from "../../customHooks/useDeleteInstitution.js";
import UpdateInstitutionModalComponent from "../Modal/UpdateInstitutionModalComponent.js";

const CardComponent = (props) => {
  const [showModal, setShowModal] = useState(false);

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
    <div data-testid="card" className="card">
      <p>name: {props.data.value.name}</p>
      <p>city: {props.data.value.city}</p>
      <p>province/territory: {props.data.value.province_territory}</p>
      <button
        id={props.data.value.id}
        data-testid="removeButton"
        onClick={() => handleDelete(props.data.value.id)}
      >
        Remove
      </button>
      <button data-testid="updateButton" onClick={handleOpenModal}>
        Update
      </button>
      {showModal && (
        <UpdateInstitutionModalComponent
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          data={props.data.value}
        />
      )}
    </div>
  );
};

export default CardComponent;
