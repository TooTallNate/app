/** @jsx jsx */
import { jsx, InterpolationWithTheme } from "@emotion/core";
import { Link } from "react-router-dom";

const linkStyle: InterpolationWithTheme<any> = {
  textDecoration: "none",
  color: "black",
  padding: 8,
  lineHeight: "28px",
  textAlign: "center",
  fontSize: 14,
  fontWeight: "bold"
};

const MainNav: React.FC = () => {
  return (
    <nav
      css={{
        height: 44,
        borderTop: "1px solid #9ca1b1",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Link css={linkStyle} to="/account">
        ACCOUNT
      </Link>
      <Link css={linkStyle} to="/pigs">
        PIGS
      </Link>
    </nav>
  );
};

export default MainNav;
