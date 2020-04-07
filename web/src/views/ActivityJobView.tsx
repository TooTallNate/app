import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FormGroup } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import { usePigActivityJobsQuery } from "../graphql";
import FullPageSpinner from "../components/FullPageSpinner";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";
import BackButton from "../components/ui/BackButton";
import TypeaheadInput from "../components/ui/TypeaheadInput";
import Form from "../components/ui/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormSubmit from "../components/ui/FormSubmit";
import FormFieldErrors from "../components/ui/FormFieldErrors";

interface FormData {
  job: string;
}

const ActivityJobView: React.FC<RouteComponentProps<{ activity: string }>> = ({
  history,
  match
}) => {
  console.log(match);
  const formContext = useForm<FormData>();
  const { data, loading } = usePigActivityJobsQuery({
    onCompleted({ pigActivityDefaults: defaults }) {
      if (defaults.job) {
        formContext.setValue("job", defaults.job.number);
      }
    }
  });

  const onSubmit: OnSubmit<FormData> = data => {
    history.push(`${match.url}/${data.job}`);
  };

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Job Selection</Title>
      </ViewHeader>
      {loading || !data ? (
        <FullPageSpinner />
      ) : (
        <Form context={formContext} onSubmit={onSubmit}>
          <FormField
            name="job"
            rules={{
              required: "The job field is required."
            }}
          >
            <FormFieldLabel>Job</FormFieldLabel>
            <FormFieldInput>
              <TypeaheadInput
                sort="desc"
                items={data.pigActivityJobs.map(job => ({
                  value: job.number,
                  title: `${job.number} ${job.description}`
                }))}
              />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormGroup>
            <FormSubmit>Continue</FormSubmit>
          </FormGroup>
        </Form>
      )}
    </View>
  );
};

export default ActivityJobView;
