import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { constants } from "../constants.js";

function useCities() {
  return useQuery({
    queryKey: [`${constants.CITIES_QUERY_NAME}`],
    queryFn: async () => {
      const res = await axios.get(
        `${constants.SERVER_URL}/${constants.CITIES_ENDPOINT}`
      );
      return res.data.data;
    },
    useErrorBoundary: (error) => {
      toast(
        "Something went wrong, could not fetch cities!, Please try again later"
      );
      return error.response.status >= 500;
    },
  });
}

export default useCities;
