import React, { useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import DropdownComponent from "../Dropdown/DropdownComponent.js";
import useCreateInstitutions from "../../customHooks/useCreateInstitution.js";

const AddInstitutionModalComponent = ({
  showModal,
  handleCloseModal,
  provincesTerritories,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addInstitution = useCreateInstitutions();

  const handleCreate = async ({ name, city, province_territory }) => {
    await addInstitution.mutateAsync({ name, city, province_territory });
    handleCloseModal(false);
  };

  const [dropdownValue, setDropdownValue] = useState("");

  const onDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  return (
    <ReactModal
      isOpen={showModal}
      contentLabel="Update an Institution"
      ariaHideApp={false}
    >
      <h2>Add Institution</h2>
      <button onClick={handleCloseModal.bind(null, showModal)}>
        Close Modal
      </button>
      <form
        onSubmit={handleSubmit((data) => {
          if (dropdownValue === "") {
            alert("You must select a province or territory");
            return;
          }
          handleCreate({
            ...data,
            province_territory: dropdownValue,
          });
        })}
      >
        <label>
          Name:
          <input {...register("name", { required: true })} />
        </label>
        <label>
          City:
          <input {...register("city", { required: true })} />
        </label>
        {errors.city && <p>City is required.</p>}
        <DropdownComponent
          data={provincesTerritories}
          type="Province/Territory"
          onChange={onDropdownChange}
        />
        <input type="submit" />
      </form>
    </ReactModal>
  );
};

export default AddInstitutionModalComponent;
