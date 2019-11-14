import React from "react";
import { Link } from "react-router-dom";

const MainNavLink: React.FC<React.ComponentProps<typeof Link>> = props => (
  <Link
    {...props}
    className={
      "h-12 px-2 py-3 text-black text-center text-sm font-bold no-underline "
    }
  />
);

const MainNav: React.FC = () => {
  return (
    <nav className="h-12 flex justify-center border-t border-gray-500">
      <MainNavLink to="/account">ACCOUNT</MainNavLink>
      <MainNavLink to="/pigs">ACTIVITY</MainNavLink>
    </nav>
  );
};

export default MainNav;
