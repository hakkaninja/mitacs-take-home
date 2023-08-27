import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "../constants.js";

function useCreateInstitutions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newInstitution) => {
      try {
        await axios.post(
          `${constants.SERVER_URL}/${constants.CREATE_INSTITUTION_ENDPOINT}`,
          newInstitution
        );
      } catch (err) {
        toast(
          "Something went wrong, could not create new institution!, Please try again later"
        );
      }
    },
    onSuccess: (_data) => {
      toast("New Institution Added!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["institutions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cities"],
      });
    },
  });
}

export default useCreateInstitutions;
