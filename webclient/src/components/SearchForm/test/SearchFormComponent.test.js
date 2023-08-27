import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchFormComponent from "../SearchFormComponent";
const setup = () => {
  const utils = render(<SearchFormComponent />);
  const input = screen.getByRole("searchbox");
  return {
    input,
    ...utils,
  };
};

describe("<SearchFormComponent />", () => {
  it("renders without crashing", () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });
  it("should be able to receive input", () => {
    const { input } = setup();
    expect(input.value).toBe("");
    userEvent.type(input, "Vancouver");
    expect(input.value).toBe("Vancouver");
  });
  it("should debounce user input", async () => {
    jest.mock("lodash", () => ({
      debounce: (fn) => fn,
    }));
    const mockOnChange = jest.fn();
    render(<SearchFormComponent onChange={mockOnChange} />);
    const input = screen.getByRole("searchbox");
    userEvent.type(input, "Vancouver");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("Vancouver");
  });
});
