/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { Title, StackedNav, StackedNavLink, View } from "../components/styled";
import FormField from "../components/ui/FormField";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldLabel from "../components/ui/FormFieldLabel";

const ActivitySelectionView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <View>
      <Title>Activity</Title>
      <div className="overflow-x-auto min-h-0 flex-grow p-4 pt-0">
        <FormField name="action">
          <FormFieldLabel>Select Activity</FormFieldLabel>
          <FormFieldInput>
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
          </FormFieldInput>
        </FormField>
      </div>
    </View>
  );
};

export default ActivitySelectionView;
