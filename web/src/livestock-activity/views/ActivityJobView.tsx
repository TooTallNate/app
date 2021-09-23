import React from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
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
  job: string;
}

interface ViewParams {
  activity: string;
}

const ActivityJobView: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const params = useParams<ViewParams>();
  const formContext = useForm<FormData>();
  const { data, loading } = useLivestockActivityJobsQuery({
    onCompleted({ livestockActivityDefaults: defaults }) {
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
    ? data.livestockActivityJobs.find(job => job.number === jobNumber)
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
              name="job"
              rules={{
                required: "The job field is required."
              }}
            >
              {params.activity === "move" ? (
                <FormFieldLabel>From Group</FormFieldLabel>
              ) : null}
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
            {job && (
              <InventoryField
                inventory={job.inventory || 0}
                deadQuantity={job.deadQuantity || 0}
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
