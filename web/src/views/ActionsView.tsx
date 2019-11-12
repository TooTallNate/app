/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { Title, StackedNav, StackedNavLink, View } from "../components/styled";
import Field from "../components/ui/Field";

const ActionsView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <View>
      <Title>Pig Activity</Title>
      <div
        css={{
          padding: "0 16px"
        }}
      >
        <Field label="Select Action" name="action">
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
            <StackedNavLink to={`${match.url}/purchase`}>
              Purchase
            </StackedNavLink>
          </StackedNav>
        </Field>
      </div>
    </View>
  );
};

export default ActionsView;
