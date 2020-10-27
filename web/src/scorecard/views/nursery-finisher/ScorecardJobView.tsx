import React from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import Title from "../../../common/components/view/ViewTitle";
import View from "../../../common/components/view/View";
import ViewHeader from "../../../common/components/view/ViewHeader";
import FormField from "../../../common/components/form/FormField";
import FormFieldInput from "../../../common/components/form/FormFieldInput";
import BackButton from "../../../common/components/view/BackButton";
import TypeaheadInput from "../../../common/components/input/TypeaheadInput";
import Form from "../../../common/components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormSubmit from "../../../common/components/form/FormSubmit";
import FormFieldErrors from "../../../common/components/form/FormFieldErrors";
import ViewContent from "../../../common/components/view/ViewContent";
import InventoryField from "../../../pig-activity/components/InventoryField";
import { useGrowFinishJobsQuery } from "../../graphql";
import Button from "../../../common/components/input/Button";
import HorizontalSpacer from "../../../common/components/layout/HorizontalSpacer";
import {
  GrowFinishScorecardProvider,
  useGrowFinish
} from "../../contexts/growFinish";
import ScorecardMetadataView from "./ScorecardMetadataView";

interface FormData {
  job: string;
}

const ScorecardJobView: React.FC = () => {
  const { updateForm } = useGrowFinish();
  const match = useRouteMatch();
  const history = useHistory();
  const formContext = useForm<FormData>();
  const { data, loading } = useGrowFinishJobsQuery({});

  console.log(match);

  const onSubmit: OnSubmit<FormData> = data => {
    updateForm({ job: data.job });
    history.push(`${match.path}/metadata`);
  };

  // const onSave = async () => {
  //   try {
  //     await save({
  //       variables: {
  //         input: {
  //           ...getValues(),
  //           job: params.job
  //         }
  //       }
  //     });
  //     setMessage({
  //       message: "Entry saved successfully.",
  //       level: "success",
  //       timeout: 2000
  //     });
  //     history.push("/");
  //   } catch (e) {
  //     setMessage({
  //       message: e.toString(),
  //       level: "error"
  //     });
  //   }
  // };

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
                  items={data.growFinishJobs.map(job => ({
                    value: job.number,
                    title: `${job.number} ${job.description}`
                  }))}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormSubmit>Continue</FormSubmit>
            {/* <div className="flex">
              <Button className="w-full" type="button" onClick={onSave}>
                Save
              </Button>
              <HorizontalSpacer />
              <FormSubmit />
            </div> */}
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ScorecardJobView;
