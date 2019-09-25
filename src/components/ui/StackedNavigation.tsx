/** @jsx jsx */
import { jsx } from "@emotion/core";
import { LinkProps, Link } from "react-router-dom";

export const StackedNavigationItem: React.FC<LinkProps> = props => {
  return (
    <Link
      {...props}
      css={{
        fontSize: "1rem",
        fontWeight: "bold",
        padding: 12,
        border: "solid #9ca1b1",
        borderWidth: "0 0 1px 0",
        color: "inherit",
        textDecoration: "none",
        "&:last-of-type": {
          borderBottomWidth: 0
        }
      }}
    />
  );
};

interface StackedNavigationProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

const StackedNavigation: React.FC<StackedNavigationProps> = props => {
  return (
    <nav
      {...props}
      css={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        border: "1px solid #9ca1b1",
        overflow: "hidden",
        "&:focus-within": {
          boxShadow: "0 0 0 1px #9ca1b1"
        }
      }}
    />
  );
};

export default StackedNavigation;
