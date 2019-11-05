/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { Title, StackedNav, StackedNavLink } from "../components/styled";

const ActionsView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <div>
      <Title>Pig Activity</Title>
      <div
        css={{
          padding: "0 16px"
        }}
      >
        <h2>Select Action</h2>
        <StackedNav>
          <StackedNavLink to={`${match.url}/wean`}>Wean</StackedNavLink>
          <StackedNavLink to={`${match.url}/mortality`}>
            Mortality
          </StackedNavLink>
          <StackedNavLink to={`${match.url}/move`}>Move</StackedNavLink>
          <StackedNavLink to={`${match.url}/grade-off`}>
            Grade Off
          </StackedNavLink>
          <StackedNavLink to={`${match.url}/adjustment`}>
            Adjustment
          </StackedNavLink>
          <StackedNavLink to={`${match.url}/purchase`}>Purchase</StackedNavLink>
        </StackedNav>
      </div>
    </div>
  );
};

export default ActionsView;
