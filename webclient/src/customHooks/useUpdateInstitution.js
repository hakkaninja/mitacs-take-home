import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { constants } from "../constants.js";

function useUpdateInstitutions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (institution) => {
      const id = institution.id;
      try {
        await axios.put(
          `${constants.SERVER_URL}/${constants.UPDATE_INSTITUTION_ENDPOINT}/${id}`,
          institution
        );
      } catch (err) {
        toast(
          "Something went wrong, could not update institution!, Please try again later"
        );
      }
    },
    onSuccess: (_data) => {
      toast("Institution Updated!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [`${constants.INSTITUTION_QUERY_NAME}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${constants.CITIES_QUERY_NAME}`],
      });
    },
  });
}

export default useUpdateInstitutions;
