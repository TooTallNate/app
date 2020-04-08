import React from "react";
import { Output, FormGroup } from "../components/styled";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import BackButton from "../components/view/BackButton";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Form from "../components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormField from "../components/form/FormField";
import FormFieldLabel from "../components/form/FormFieldLabel";
import FormFieldInput from "../components/form/FormFieldInput";
import FormFieldErrors from "../components/form/FormFieldErrors";
import FormSubmit from "../components/form/FormSubmit";
import {
  useFarrowingBackendOperatorsQuery,
  useSetAreaOperatorMutation
} from "../graphql";
import { useFlash } from "../contexts/flash";
import StackedButtonInput, {
  StackedButton
} from "../components/input/StackedButtonInput";
import ViewContent from "../components/view/ViewContent";

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

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Scorecard Area Operator</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data &&
          (() => {
            if (!data.area) {
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
                const operator = operators.find(
                  o => o.number === data.operator
                );
                if (operator) {
                  setMessage({
                    level: "success",
                    message: `${area.description} operator updated to ${operator.name}.`
                  });
                }
                history.push(`/scorecard/areas/${area.number}`);
              };

              return (
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
                          <StackedButton
                            value={operator.number}
                            key={operator.number}
                          >
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
              );
            }
          })()}
      </ViewContent>
    </View>
  );
};

export default ScorecardViewAreaOperator;
