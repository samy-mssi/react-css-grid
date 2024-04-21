import { ReactNode, createContext } from "react";
import { GridContextConfigurationProps } from "./grid.types";
const GridContext = createContext<GridContextConfigurationProps | null>(null);

const GridContextProvider = ({
  children,
  configuration,
}: {
  children: ReactNode;
  configuration: GridContextConfigurationProps;
}) => {
  if (!configuration) return children;
  return (
    <GridContext.Provider value={{ ...configuration }}>
      {children}
    </GridContext.Provider>
  );
};

export { GridContext, GridContextProvider };
