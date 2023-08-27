import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { constants } from "../constants.js";

function useDeleteInstitutions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(
        `${constants.SERVER_URL}/${constants.DELETE_INSTITUTION_ENDPOINT}/${id}`
      );
    },
    onSuccess: (_data, id) => {
      queryClient.setQueryData(["institutions"], (prevData) => {
        return prevData.filter((item) => item.value.id !== id);
      });
      toast("Institution Deleted!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cities"],
      });
    },
  });
}

export default useDeleteInstitutions;
