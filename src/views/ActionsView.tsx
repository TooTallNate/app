/** @jsx jsx */
import { jsx, InterpolationWithTheme } from "@emotion/core";
import { RouteComponentProps, Link } from "react-router-dom";
import ViewTitle from "../components/ui/ViewTitle";

const linkStyles: InterpolationWithTheme<HTMLAnchorElement> = {
  display: "block",
  height: 44
};

const ActionsView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <div>
      <ViewTitle>Pig Activity</ViewTitle>
      <div
        css={{
          padding: "0 16px"
        }}
      >
        <h2>Select Action</h2>
        <Link css={linkStyles} to={`${match.url}/wean`}>
          Wean
        </Link>
        <Link css={linkStyles} to={`${match.url}/purchase`}>
          Purchase
        </Link>
        <Link css={linkStyles} to={`${match.url}/mortality`}>
          Mortality
        </Link>
        <Link css={linkStyles} to={`${match.url}/move`}>
          Move
        </Link>
        <Link css={linkStyles} to={`${match.url}/grade-off`}>
          Grade Off
        </Link>
        <Link css={linkStyles} to={`${match.url}/adjustment`}>
          Adjustment
        </Link>
      </div>
    </div>
  );
};

export default ActionsView;
