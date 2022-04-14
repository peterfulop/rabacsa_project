import { createContext, useReducer } from "react";

type ContextProviderProps = {
  children: React.ReactNode;
};

const defaultGlobalState = {
  neighbour: "",
};

export const GlobalContext = createContext({
  neighbour: "",
  setNeighbour: (id: string) => {},
});

const globalReducer = (state: any, action: any) => {
  if (action.type === "NEIGHBOUR") {
    state.neighbour = action.id;
    return state;
  }
  return state;
};

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [globalState, dispatchGlobalAction] = useReducer(
    globalReducer,
    defaultGlobalState
  );

  const setNeighbourHandler = (id: string) => {
    dispatchGlobalAction({
      type: "NEIGHBOUR",
      id: id,
    });
  };

  const globalContext = {
    neighbour: globalState.neighbour as never,
    setNeighbour: setNeighbourHandler,
  };

  return (
    <GlobalContext.Provider value={globalContext}>
      {children}
    </GlobalContext.Provider>
  );
};
