import { Button } from "components";
import useWatchlist from "utils/hooks/useWatchlist";
import Icon from "./Icon";

interface AddWatchlistProps {
  readonly prod_id: number;
  paddingHorizontal?: number;
}

export default function AddWatchlist({
  prod_id,
  paddingHorizontal = 15,
}: AddWatchlistProps) {
  const { appendWatchlist, state, remove } = useWatchlist(prod_id, {
    withCheck: true,
  });

  return (
    <Button
      style={{
        padding: 15,
        marginRight: 10,
        paddingHorizontal,
      }}
      onPress={() => (state === "IN" ? remove(prod_id) : appendWatchlist())}
      variant="primary"
      icon={<Icon state={state} />}
    />
  );
}
