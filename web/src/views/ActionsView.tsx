/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { Title } from "../components/styled";
import StackedNavigation, {
  StackedNavigationItem
} from "../components/ui/StackedNavigation";

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
        <StackedNavigation>
          <StackedNavigationItem to={`${match.url}/wean`}>
            Wean
          </StackedNavigationItem>
          <StackedNavigationItem to={`${match.url}/mortality`}>
            Mortality
          </StackedNavigationItem>
          <StackedNavigationItem to={`${match.url}/move`}>
            Move
          </StackedNavigationItem>
          <StackedNavigationItem to={`${match.url}/grade-off`}>
            Grade Off
          </StackedNavigationItem>
          <StackedNavigationItem to={`${match.url}/adjustment`}>
            Adjustment
          </StackedNavigationItem>
          <StackedNavigationItem to={`${match.url}/purchase`}>
            Purchase
          </StackedNavigationItem>
        </StackedNavigation>
      </div>
    </div>
  );
};

export default ActionsView;
