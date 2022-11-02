import React from "react";

type ContextPropsType = {
  displayNavLeft: { navLeft: boolean; setNavLeft: () => void };
};

const NavbarContext = React.createContext<ContextPropsType | null>(null);

const NavbarProvider = ({ children }: React.PropsWithChildren) => {
  const [navLeft, setNavLeft] = React.useState<boolean>(false);

  const displayNavLeft = {
    navLeft,
    setNavLeft: () => setNavLeft(!navLeft),
  };

  return <NavbarContext.Provider value={{ displayNavLeft }}>{children}</NavbarContext.Provider>;
};

export const useNavbarContext = (): ContextPropsType | null => {
  return React.useContext(NavbarContext);
};

export default NavbarProvider;
