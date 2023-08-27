import { Query, QueryClient, QueryClientProvider } from "react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { useInstitutionsQuery } from "./customHooks/useInstitutionsQuery";
import App from "./App.js";

const mockedUseInstitutionsQuery = useInstitutionsQuery;
jest.mock("./customHooks/useInstitutionsQuery");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => {
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default wrapper;

describe("App Component", () => {
  it("displays the loading component", () => {
    mockedUseInstitutionsQuery.mockImplementation(() => ({
      status: "loading",
    }));
    render(<App />, { wrapper });
    expect(screen.getByTestId("users-loading")).toBeInTheDocument();
    expect(screen.getByText(/Loading Data.../i)).toBeVisible();
  });
});
