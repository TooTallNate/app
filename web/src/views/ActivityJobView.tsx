import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FormGroup } from "../components/styled";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import { usePigActivityJobsQuery } from "../graphql";
import FormField from "../components/form/FormField";
import FormFieldLabel from "../components/form/FormFieldLabel";
import FormFieldInput from "../components/form/FormFieldInput";
import BackButton from "../components/view/BackButton";
import TypeaheadInput from "../components/input/TypeaheadInput";
import Form from "../components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormSubmit from "../components/form/FormSubmit";
import FormFieldErrors from "../components/form/FormFieldErrors";
import ViewContent from "../components/view/ViewContent";
import StaticValue from "../components/input/StaticValue";

interface FormData {
  job: string;
}

const ActivityJobView: React.FC<RouteComponentProps<{ activity: string }>> = ({
  history,
  match
}) => {
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

  const jobNumber = formContext.watch("job");
  const job = data
    ? data.pigActivityJobs.find(job => job.number === jobNumber)
    : undefined;

  console.log(jobNumber);
  console.log(job);

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
            {job && (
              <>
                <FormField name="inventory">
                  <FormFieldLabel>Inventory</FormFieldLabel>
                  <FormFieldInput noRegister>
                    <StaticValue value={job.inventory || 0} />
                  </FormFieldInput>
                </FormField>
                <FormField name="deadQuantity">
                  <FormFieldLabel>Dead Quantity</FormFieldLabel>
                  <FormFieldInput noRegister>
                    <StaticValue value={job.deadQuantity || 0} />
                  </FormFieldInput>
                </FormField>
              </>
            )}
            <FormGroup>
              <FormSubmit>Continue</FormSubmit>
            </FormGroup>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ActivityJobView;
