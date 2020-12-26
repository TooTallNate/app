import React from "react";
import { useHistory } from "react-router-dom";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import BackButton from "../../common/components/view/BackButton";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import Form from "../../common/components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormSubmit from "../../common/components/form/FormSubmit";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import ViewContent from "../../common/components/view/ViewContent";
import { useScorecardGroupsQuery } from "../graphql";

interface FormData {
  group: string;
}

const ScorecardGroupView: React.FC = () => {
  const history = useHistory();
  const formContext = useForm<FormData>();
  const { data, loading } = useScorecardGroupsQuery({});

  const onSubmit: OnSubmit<FormData> = data => {
    history.push(`/scorecard/${data.group}`);
  };

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Scorecard Selection</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField
              name="group"
              rules={{
                required: "The scorecare type field is required."
              }}
            >
              <FormFieldInput>
                <TypeaheadInput
                  items={data.scorecardGroups.map(group => ({
                    value: group.code,
                    title: group.description
                  }))}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <div className="flex-grow" />
            <FormSubmit>Continue</FormSubmit>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ScorecardGroupView;
