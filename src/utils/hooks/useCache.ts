import { useAppSelector } from "./hooks";
import { useDispatch } from "react-redux";
import { cacheActions } from "redux/Cache/cache";

const TTL = 10; // 10s

function checkTime(time: number) {
  return (Date.now() - time) / 1000 > TTL;
}

export default function useCache() {
  const keys = useAppSelector((state) => state.cache.keys);
  const dispatch = useDispatch();

  function getByKey<T>(key: string): T | boolean {
    const cached = keys.find((cached) => cached.key === key);

    if (cached && checkTime(cached.time)) {
      return cached.data;
    }

    return false;
  }

  function setCache(key: string, value: any) {
    dispatch(cacheActions.appendKey({ key, data: value }));
  }

  return { getByKey, setCache };
}
