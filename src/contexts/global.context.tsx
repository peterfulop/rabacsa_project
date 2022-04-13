import { createContext, useReducer } from "react";

type ContextProviderProps = {
  children: React.ReactNode;
};

const defaultGlobalState = {
  spinner: false,
};

export const GlobalContext = createContext({
  spinner: true || false,
  setSpinner: (status: boolean) => {},
});

const globalReducer = (state: any, action: any) => {
  if (action.type === "SPINNER") {
    console.log("set spinner status:", action.status);
    console.log("actual status:", state.spinner);
    state.spinner = action.status;
    return state;
  }
  return state;
};

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
  const [globalState, dispatchGlobalAction] = useReducer(
    globalReducer,
    defaultGlobalState
  );

  const setSpinnerStatusHandler = (status: boolean) => {
    dispatchGlobalAction({
      type: "SPINNER",
      status: status,
    });
  };

  const globalContext = {
    spinner: globalState.spinner,
    setSpinner: setSpinnerStatusHandler,
  };

  return (
    <GlobalContext.Provider value={globalContext}>
      {children}
    </GlobalContext.Provider>
  );
};
