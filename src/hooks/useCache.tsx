import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useRef, useState } from "react";

// finish later

export default function useCache<T>(key: string, setter: (props: T) => void) {
  const [state, setState] = useState({
    cached: [],
    loading: false,
    failed: false,
  });

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    if (mounted.current) {
      (async () => {
        const data = await AsyncStorage.getItem(key);

        console.log(data);
      })();
    }

    return () => {
      mounted.current = false;
    };
  }, []);
}
