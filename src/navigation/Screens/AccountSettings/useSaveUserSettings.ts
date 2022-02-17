import axios from "axios";
import { API } from "constants/routes";
import { useUser } from "@utils/context/UserContext";
import { useDispatch } from "react-redux";
import { userActions } from "redux/User";

export default function useSaveUserSettings(onClose: () => void) {
  const dispatch = useDispatch();

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
      dispatch(userActions.setCredentialsKey({ key, value }));
    } catch (error) {
      console.warn(error);
    }
  }

  return { onSave };
}
