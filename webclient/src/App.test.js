import { waitFor, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import useInstitutions from "./customHooks/useInstitutions.js";
import useCities from "./customHooks/useCities.js";
import useProvincesTerritories from "./customHooks/useProvincesTerritories.js";
import App from "./App.js";
import wrapper from "./helpers/tests/wrapper.js";

const mockedUseInstitutions = useInstitutions;
jest.mock("./customHooks/useInstitutions.js");

const mockedUseCities = useCities;
jest.mock("./customHooks/useCities.js");

const mockedUseProvincesTerritories = useProvincesTerritories;
jest.mock("./customHooks/useProvincesTerritories.js");

afterEach(() => {
  jest.resetAllMocks();
});

describe("App Component", () => {
  it("displays the loading component", async () => {
    mockedUseInstitutions.mockImplementation(() => ({
      isLoading: true,
    }));
    mockedUseCities.mockImplementation(() => ({
      isLoading: true,
    }));
    mockedUseProvincesTerritories.mockImplementation(() => ({
      isLoading: true,
    }));
    render(<App />, { wrapper });
    expect(screen.getByTestId("app-loading")).toBeInTheDocument();
    expect(screen.getByText(/Loading Data.../i)).toBeVisible();
  });

  it("displays the error component", async () => {
    mockedUseInstitutions.mockImplementation(() => ({
      isError: true,
    }));
    mockedUseCities.mockImplementation(() => ({
      isError: true,
    }));
    mockedUseProvincesTerritories.mockImplementation(() => ({
      isError: true,
    }));
    render(<App />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("app-error")).toBeInTheDocument();
    });
    expect(
      screen.getByText(/Data Loading failed, please try again later/i)
    ).toBeVisible();
  });

  it("renders app component without data", async () => {
    mockedUseInstitutions.mockImplementation(() => ({
      status: "success",
      data: [],
    }));
    mockedUseCities.mockImplementation(() => ({
      status: "success",
      data: [],
    }));
    mockedUseProvincesTerritories.mockImplementation(() => ({
      status: "success",
      data: [],
    }));

    render(<App />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("app")).toBeInTheDocument();
    });
    expect(screen.getByRole("heading")).toBeVisible();
    expect(screen.getByTestId("add-institution")).toBeVisible();
    expect(screen.getByTestId("search")).toBeVisible();
    expect(screen.getByTestId("City-dropdown")).toBeVisible();
    expect(screen.getByTestId("Province/Territory-dropdown")).toBeVisible();
    expect(screen.getByTestId("institution-list")).toBeVisible();
  });
});
