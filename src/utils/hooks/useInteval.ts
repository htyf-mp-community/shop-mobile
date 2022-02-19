import { useEffect } from "react";

export default function useInterval(fn: () => void, time: number) {
  useEffect(() => {
    const id = setInterval(fn, time);

    return () => clearInterval(id);
  }, []);
}
