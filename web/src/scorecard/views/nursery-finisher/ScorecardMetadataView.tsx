import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { useForm, OnSubmit } from "react-hook-form";
import {
  GrowFinishScorecardProvider,
  useGrowFinish
} from "../../contexts/growFinish";
import { usePersonResponsibleQuery } from "../../graphql";
import Form from "../../../common/components/form/Form";
import ViewContent from "../../../common/components/view/ViewContent";
import View from "../../../common/components/view/View";
import Title from "../../../common/components/view/ViewTitle";
import FormSubmit from "../../../common/components/form/FormSubmit";
import FormField from "../../../common/components/form/FormField";
import FormFieldInput from "../../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../../common/components/form/FormFieldErrors";
import TypeaheadInput from "../../../common/components/input/TypeaheadInput";
import ViewHeader from "../../../common/components/view/ViewHeader";
import BackButton from "../../../common/components/view/BackButton";

interface FormData {
  personResponsible: string;
  date: Date;
}

const ScorecardMetadataView: React.FC<RouteComponentProps> = ({ match }) => {
  const { updateForm } = useGrowFinish();
  const formContext = useForm<FormData>();
  const { data, loading } = usePersonResponsibleQuery({});

  const onSubmit: OnSubmit<FormData> = data => {
    updateForm({ personResponsible: data.personResponsible, date: data.date });
  };

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Person Responsible</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField
              name="operator"
              rules={{
                required: "The person responsible field is required."
              }}
            >
              <FormFieldInput>
                <TypeaheadInput
                  sort="desc"
                  items={data.personResponsible.map(personResponsible => ({
                    value: personResponsible.number,
                    title: `${personResponsible.number} ${personResponsible.name}`
                  }))}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormSubmit> Continue</FormSubmit>
            {/* <div className="flex">
            <Button className="w-full" type="button" onClick={onSave}>
              Save
            </Button>
            <HorizontalSpacer />
            <FormSubmit />
          </div> */}
            {/* <GrowFinishScorecardProvider>
              <Switch>
                <Route
                  exact
                  path={`${match.url}`}
                  component={ScorecardMetadataView}
                />
              </Switch>
            </GrowFinishScorecardProvider> */}
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ScorecardMetadataView;
