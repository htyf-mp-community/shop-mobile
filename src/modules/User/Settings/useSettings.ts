import { useState, useEffect } from "react";
import { useUser } from "utils/context/UserContext";
import axios from "axios";
import { ENDPOINTS, API } from "constants/routes";

export default function useSettings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = useUser();

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);

    try {
      await axios.post(
        ENDPOINTS.notificationsSettings,
        {
          enable: !isEnabled,
        },
        { headers: { token: user.token } }
      );
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/notifications/status`, {
          headers: {
            token: user.token,
          },
        });
        setIsEnabled(data.enabled);
      } catch (error) {}
    })();
  }, []);

  return { isEnabled, toggleSwitch };
}
