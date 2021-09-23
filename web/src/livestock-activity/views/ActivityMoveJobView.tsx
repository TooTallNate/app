import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useLivestockActivityJobsQuery } from "../graphql";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import BackButton from "../../common/components/view/BackButton";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import Form from "../../common/components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormSubmit from "../../common/components/form/FormSubmit";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import ViewContent from "../../common/components/view/ViewContent";
import InventoryField from "../components/InventoryField";

interface FormData {
  toJob: string;
  fromJob: string;
}

const ActivityJobView: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const formContext = useForm<FormData>();
  const { data, loading } = useLivestockActivityJobsQuery({
    onCompleted({ livestockActivityDefaults: defaults }) {
      if (defaults.job) {
        formContext.setValue("fromJob", defaults.job.number);
      }
    }
  });

  const onSubmit: OnSubmit<FormData> = data => {
    history.push(`${match.url}/${data.fromJob}/${data.toJob}`);
  };

  const fromJobNumber = formContext.watch("fromJob");
  const toJobNumber = formContext.watch("toJob");
  const fromJob = data
    ? data.livestockActivityJobs.find(job => job.number === fromJobNumber)
    : undefined;
  const toJob = data
    ? data.livestockActivityJobs.find(job => job.number === toJobNumber)
    : undefined;

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Group Selection</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField
              name="fromJob"
              rules={{
                required: "The job field is required."
              }}
            >
              <FormFieldLabel>From Group</FormFieldLabel>
              <FormFieldInput>
                <TypeaheadInput
                  sort="desc"
                  items={data.livestockActivityJobs.map(job => ({
                    value: job.number,
                    title: `${job.number} ${job.description}`
                  }))}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            {fromJob && (
              <InventoryField
                inventory={fromJob.inventory || 0}
                deadQuantity={fromJob.deadQuantity || 0}
              />
            )}
            <FormField
              name="toJob"
              rules={{
                required: "The job field is required."
              }}
            >
              <FormFieldLabel>To Group</FormFieldLabel>
              <FormFieldInput>
                <TypeaheadInput
                  sort="desc"
                  items={data.livestockActivityJobs.map(job => ({
                    value: job.number,
                    title: `${job.number} ${job.description}`
                  }))}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            {toJob && (
              <InventoryField
                inventory={toJob.inventory || 0}
                deadQuantity={toJob.deadQuantity || 0}
              />
            )}
            <FormSubmit>Continue</FormSubmit>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ActivityJobView;
