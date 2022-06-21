const TTL = 10; // 10s

function checkTime(time: number) {
  return (Date.now() - time) / 1000 > TTL;
}

export default function useCache() {}
