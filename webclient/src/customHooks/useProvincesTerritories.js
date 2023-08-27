import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { constants } from "../constants.js";

function useProvincesTerritories() {
  return useQuery({
    queryKey: [`${constants.PROVINCES_TERRITORIES_QUERY_NAME}`],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${constants.SERVER_URL}/${constants.PROVINCES_TERRITORIES_ENDPOINT}`
        );
        return res.data.data;
      } catch (err) {
        toast.error(`Something went wrong: ${err.message}`);
      }
    },
    useErrorBoundary: (error) => {
      toast(
        "Something went wrong, could not fetch provinces/territories!, Please try again later"
      );
      return error.response.status >= 500;
    },
  });
}

export default useProvincesTerritories;
