import store from "redux/store";
import { watchlistActions } from "redux/Watchlist/Watchlist";

describe("watchlist reducers", () => {
  it("Sets watchlist and removes element by id", () => {
    let state = store.getState().watchlist;

    store.dispatch(
      watchlistActions.setWatchlist({
        hasMore: false,
        results: [
          { prod_id: 1, price: 1, title: "", img_id: [] },
          { prod_id: 2, price: 1, title: "", img_id: [] },
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
