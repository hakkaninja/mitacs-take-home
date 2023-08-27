import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { constants } from "../constants.js";

function useInstitutions() {
  return useQuery({
    queryKey: [`${constants.INSTITUTION_QUERY_NAME}`],
    queryFn: async () => {
      const res = await axios.get(
        `${constants.SERVER_URL}/${constants.SEARCH_INSTITUTION_ENDPOINT}`
      );
      return res.data.data.documents;
    },
    useErrorBoundary: (error) => {
      toast(
        "Something went wrong, could not fetch institutions!, Please try again later"
      );
      return error.response.status >= 500;
    },
  });
}

export default useInstitutions;
