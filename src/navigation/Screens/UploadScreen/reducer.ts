export const initialState = {
  title: "",
  description: "",
  category: "",
  manufactor: "",
  quantity: "",
};

type State = typeof initialState;

type Act<T = string, K = object> = {
  type: T;
  payload: K;
};

type Action = Act<
  "SET_VALUE",
  {
    [v : keyof State]: string
  }
>;

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_VALUE":
      return {...state,...action.payload}

    default:
      return state;
  }
}
