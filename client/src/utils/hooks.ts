import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Controller } from "../entities/controller";
import { toast } from "react-toastify";

const useToggle = (initialState: boolean) => {
  const [toggleValue, setToggleValue] = useState(initialState);

  const toggler = () => { setToggleValue(!toggleValue) };
  return [toggleValue, toggler]
};

export { useToggle }


export const useCheckFirstAccessPassword = () => {
  const queryClient = useQueryClient();
  const controller = Controller.getInstance();

  const queryCambioPassword = useQuery<boolean>(["cambioPassword"], () => controller.isUtenteUsingDefaultPassword());
  console.log(queryCambioPassword.data);
  const mutationCambiaPassword = useMutation((nuovaPassword: string) => controller.cambiaPasswordDefault(nuovaPassword), {
    onSuccess: () => {
      queryClient.invalidateQueries("cambioPassword");
      toast.success("Password cambiata con successo");
    },
    onError: () => {
      toast.error("Errore nel cambiare la password");
    }
  });

  const cambiaPassword = (nuovaPassword: string) => {
    mutationCambiaPassword.mutate(nuovaPassword);
  }

  return [queryCambioPassword, cambiaPassword] as const;
}