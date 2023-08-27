import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { waitFor, render, screen } from "@testing-library/react";
import useInstitutions from "../customHooks/useInstitutions.js";
import useCities from "../customHooks/useCities.js";
import useProvincesTerritories from "../customHooks/useProvincesTerritories.js";
import App from "../App.js";
