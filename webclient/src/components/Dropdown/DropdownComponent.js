import React from "react";

const DropdownComponent = (props) => {
  return (
    <select
      onChange={props.onChange}
      defaultValue={props.value}
      data-testid={`${props.type}-dropdown`}
    >
      <option value="">Select {props.type}</option>
      {props.data.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default DropdownComponent;
