import { PrimeReactProvider } from "primereact/api";

const AppProvider = ({ children }: Children) => {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
};

export default AppProvider;
