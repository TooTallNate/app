import React from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import BackButton from "../../common/components/view/BackButton";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Form from "../../common/components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormSubmit from "../../common/components/form/FormSubmit";
import {
  useFarrowingBackendOperatorsQuery,
  useSetAreaOperatorMutation
} from "../graphql";
import { useFlash } from "../../common/contexts/flash";
import StackedButtonInput, {
  StackedButton
} from "../../common/components/input/StackedButtonInput";
import ViewContent from "../../common/components/view/ViewContent";
import StaticValue from "../../common/components/input/StaticValue";

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
                    <FormFieldInput noRegister>
                      <StaticValue value={area.description} />
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
                  <FormSubmit>Save</FormSubmit>
                </Form>
              );
            }
          })()}
      </ViewContent>
    </View>
  );
};

export default ScorecardViewAreaOperator;
