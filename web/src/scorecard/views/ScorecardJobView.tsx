import React from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
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
import { useScorecardJobsQuery } from "../graphql";

interface FormData {
  job: string;
}

const ScorecardJobView: React.FC = () => {
  const match = useRouteMatch();
  const params = useParams<{ group: string }>();
  const history = useHistory();
  const formContext = useForm<FormData>();
  const { data, loading } = useScorecardJobsQuery({
    variables: { group: params.group }
  });

  const onSubmit: OnSubmit<FormData> = data => {
    history.push(`${match.url}/${data.job}/page/1`);
  };

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Job Selection</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField
              name="job"
              rules={{
                required: "The job field is required."
              }}
            >
              <FormFieldInput>
                <TypeaheadInput
                  sort="desc"
                  items={data.jobs.map(job => ({
                    value: job.number,
                    title: job.description
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

export default ScorecardJobView;
