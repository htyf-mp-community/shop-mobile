import axios from "axios";
import { API } from "constants/routes";
import { useUser } from "@utils/context/UserContext";

export default function useSaveUserSettings(onClose: () => void) {
  const { user } = useUser();
  async function onSave(key: string, value: string) {
    try {
      await axios.put(
        `${API}/auth/credentials`,
        {
          [key]: value,
        },
        {
          headers: {
            token: user.token,
          },
        }
      );

      onClose();
    } catch (error) {
      console.warn(error);
    }
  }

  return { onSave };
}
