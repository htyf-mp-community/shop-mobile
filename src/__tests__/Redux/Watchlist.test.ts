import store from "redux/store";
import { watchlistActions } from "redux/Watchlist/Watchlist";

describe("watchlist reducers", () => {
  it("Sets watchlist and removes element by id", () => {
    let state = store.getState().watchlist;

    store.dispatch(
      watchlistActions.setWatchlist({
        results: [
          { amount: 1, prod_id: 1 },
          { amount: 1, prod_id: 2 },
        ],
      })
    );
    state = store.getState().watchlist;

    expect(state.data.length).toEqual(2);

    store.dispatch(watchlistActions.removeElement(2));

    state = store.getState().watchlist;

    expect(state.data.find((w) => w.prod_id === 2)).toBeUndefined();
  });
});
