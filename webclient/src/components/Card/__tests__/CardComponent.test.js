import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CardComponent from "../CardComponent.js";
import wrapper from "../../../helpers/tests/wrapper.js";

const setup = (data = {}) => {
  const mockProps = {
    data: {
      value: data,
    },
    type: "city",
  };
  const utils = render(<CardComponent {...mockProps} />, { wrapper });
  const card = screen.getByTestId("card");
  return {
    card,
    ...utils,
  };
};

describe("<CardComponent />", () => {
  it("renders without crashing", () => {
    const { card } = setup();
    expect(card).toBeInTheDocument();
  });
  it("displays all the data and buttons on the card", () => {
    setup({
      name: "Hogwarts",
      city: "Scotland",
      id: "platform 9 3/4",
      province_territory: "Scotland",
    });
    expect(screen.getByText("name: Hogwarts")).toBeVisible();
    expect(screen.getByText("city: Scotland")).toBeVisible();
    expect(screen.getByText("province/territory: Scotland")).toBeVisible();
    expect(screen.getByTestId("removeButton")).toBeVisible();
    expect(screen.getByTestId("updateButton")).toBeVisible();
  });
  it("opens modal when update button is clicked", async () => {
    setup({
      name: "Hogwarts",
      city: "Scotland",
      id: "platform 9 3/4",
      province_territory: "Scotland",
    });
    expect(
      screen.queryByTestId("update-institution-form")
    ).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("updateButton"));
    await waitFor(() => {
      expect(screen.getByTestId("update-institution-form")).toBeVisible();
    });
  });
});
