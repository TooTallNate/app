import React from "react";
import { Output, FormGroup } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import BackButton from "../components/ui/BackButton";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Form from "../components/ui/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldErrors from "../components/ui/FormFieldErrors";
import FormSubmit from "../components/ui/FormSubmit";
import {
  useFarrowingBackendOperatorsQuery,
  useSetAreaOperatorMutation
} from "../graphql";
import FullPageSpinner from "../components/FullPageSpinner";
import { useFlash } from "../contexts/flash";
import StackedButtonInput, {
  StackedButton
} from "../components/ui/StackedButtonInput";

interface FormData {
  operator: string;
}

interface RouteParams {
  area: string;
}

const ScorecardViewAreaOperator: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
  history
}) => {
  const formContext = useForm<FormData>();
  const { data, loading } = useFarrowingBackendOperatorsQuery({
    variables: {
      area: match.params.area
    },
    onCompleted(data) {
      if (data.area) {
        formContext.setValue("operator", data.area.personResponsible.number);
      }
    }
  });
  const [post] = useSetAreaOperatorMutation();
  const { setMessage } = useFlash();

  if (loading || !data) {
    return <FullPageSpinner>Loading...</FullPageSpinner>;
  } else if (!data.area) {
    return <Redirect to="/scorecard" />;
  } else {
    const { area, operators } = data;

    const onSubmit: OnSubmit<FormData> = async data => {
      await post({
        variables: {
          input: {
            area: match.params.area,
            operator: data.operator
          }
        }
      });
      const operator = operators.find(o => o.number === data.operator);
      if (operator) {
        setMessage({
          level: "success",
          message: `${area.description} operator updated to ${operator.name}.`
        });
      }
      history.push(`/scorecard/areas/${area.number}`);
    };

    return (
      <View>
        <ViewHeader>
          <BackButton />
          <Title>Scorecard Area Operator</Title>
        </ViewHeader>
        <Form context={formContext} onSubmit={onSubmit}>
          <FormField name="area">
            <FormFieldLabel>Area</FormFieldLabel>
            <FormFieldInput>
              <Output>{area.description}</Output>
            </FormFieldInput>
          </FormField>
          <FormField
            name="operator"
            rules={{ required: "The operator field is required." }}
          >
            <FormFieldLabel>Operator</FormFieldLabel>
            <FormFieldInput>
              <StackedButtonInput orientation="vertical">
                {operators.map(operator => (
                  <StackedButton value={operator.number} key={operator.number}>
                    {operator.name}
                  </StackedButton>
                ))}
              </StackedButtonInput>
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormGroup>
            <FormSubmit>Save</FormSubmit>
          </FormGroup>
        </Form>
      </View>
    );
  }
};

export default ScorecardViewAreaOperator;
