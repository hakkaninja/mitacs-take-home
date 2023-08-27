import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import DropdownComponent from "../Dropdown/DropdownComponent.js";
import { useForm } from "react-hook-form";
import useUpdateInstitutions from "../../customHooks/useUpdateInstitution.js";

const UpdateInstitutionModalComponent = ({
  showModal,
  handleCloseModal,
  provincesTerritories,
  data,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateInstitution = useUpdateInstitutions();

  console.log("iddddd", data.id);
  const id = data.id;
  const handleUpdate = async (institution) => {
    console.log("institution modal", institution);
    await updateInstitution.mutateAsync(institution);
    handleCloseModal(false);
  };

  const [dropdownValue, setDropdownValue] = useState("");

  useEffect(() => {
    setDropdownValue(data.province_territory);
  }, [data.province_territory]);

  const onDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  return (
    <ReactModal
      isOpen={showModal}
      contentLabel="Update an Institution"
      ariaHideApp={false}
    >
      <h2>Update Institution</h2>
      <button onClick={handleCloseModal.bind(null, showModal)}>
        Close Modal
      </button>
      <form
        onSubmit={handleSubmit((data) => {
          if (dropdownValue === "") {
            alert("You must select a province or territory");
            return;
          }
          handleUpdate({
            ...data,
            id,
            province_territory: dropdownValue,
          });
        })}
      >
        <label>
          Name:
          <input
            defaultValue={data.name}
            {...register("name", { required: true })}
          />
        </label>
        <label>
          City:
          <input
            defaultValue={data.city}
            {...register("city", { required: true })}
          />
        </label>
        {errors.city && <p>City is required.</p>}
        <DropdownComponent
          data={provincesTerritories}
          type="Province/Territory"
          onChange={onDropdownChange}
          value={data.province_territory}
        />
        <input type="submit" />
      </form>
    </ReactModal>
  );
};

export default UpdateInstitutionModalComponent;
