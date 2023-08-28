import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DropdownComponent from "../DropdownComponent";

const setup = (data = []) => {
  const mockProps = {
    data: data,
    type: "city",
  };
  const utils = render(<DropdownComponent {...mockProps} />);
  const dropdown = screen.getByTestId("city-dropdown");
  return {
    dropdown,
    ...utils,
  };
};

describe("<DropdownComponent />", () => {
  it("renders without crashing", () => {
    const { dropdown } = setup();
    expect(dropdown).toBeInTheDocument();
  });
  it("selects right right option based on user selection", () => {
    const { dropdown } = setup([
      "Tarey Town",
      "Hyrule Castle Town",
      "Kakariko Village",
    ]);
    expect(dropdown.value).toBe("");
    userEvent.selectOptions(dropdown, "Hyrule Castle Town");
    expect(dropdown.value).toBe("Hyrule Castle Town");
  });
});
