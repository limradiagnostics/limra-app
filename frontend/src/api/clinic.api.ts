import axios from "axios";
import { apiUrl } from "./apiUrl";

export const syncUserAPI = async (
  supabaseId: string,
  name: string,
  email: string,
  profilePictureUrl: string | null,
) => {
  return axios.post(`${apiUrl}/clinic/account/sync`, {
    supabaseId,
    name,
    email,
    profilePictureUrl,
  });
};
