import React from "react";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import ViewTitle from "../../common/components/view/ViewTitle";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import {
  InclusivityMode,
  useJobPostingGroupsQuery,
  useUpdatePostingGroupsMutation
} from "../graphql";
import { useForm } from "react-hook-form";
import { LivestockActivityJobsDocument } from "../../livestock-activity/graphql";
import { JobPostingGroup } from "../graphql";
import { useFlash } from "../../common/contexts/flash";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormSubmit from "../../common/components/form/FormSubmit";
import Button from "../../common/components/input/Button";
import ListBox from "../../common/components/input/ListBox";
import StackedInput from "../../common/components/input/StackedInput";
import StackedRadioButton from "../../common/components/input/StackedRadioButton";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import { Spacing } from "../../common/components/layout/spacing";

interface FormData {
  mode: InclusivityMode;
  selectedPostingGroup: JobPostingGroup;
  postingGroups: JobPostingGroup[];
}

const PostingGroups: React.FC = () => {
  const formContext = useForm<FormData>();
  const { setValue, getValues, watch } = formContext;

  const { data, loading } = useJobPostingGroupsQuery({
    onCompleted(data) {
      if (data.user) {
        setValue([
          { mode: data.user.postingGroups.mode },
          { postingGroups: data.user.postingGroups.list }
        ]);
      }
    }
  });
  const [update] = useUpdatePostingGroupsMutation({
    refetchQueries: [
      {
        query: LivestockActivityJobsDocument
      }
    ]
  });
  const { addMessage } = useFlash();

  const userPostingGroups = watch("postingGroups", []);
  const postingGroups = data ? data.jobPostingGroups : [];
  const postingGroupSelected = !!watch("selectedPostingGroup");

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <ViewTitle>Job Posting Groups</ViewTitle>
      </ViewHeader>
      <ViewContent loading={loading}>
        <Form
          context={formContext}
          onSubmit={async d => {
            await update({
              variables: {
                input: {
                  mode: d.mode,
                  add: d.postingGroups
                    .filter(postingGroup =>
                      data!.user!.postingGroups.list.every(
                        pg => pg.code !== postingGroup.code
                      )
                    )
                    .map(pg => pg.code),
                  remove: data!
                    .user!.postingGroups.list.filter(postingGroup =>
                      d.postingGroups.every(pg => pg.code !== postingGroup.code)
                    )
                    .map(l => l.code)
                }
              }
            });
            addMessage({
              message: "Posting Groups updated successfully!",
              level: "success"
            });
          }}
        >
          <FormField name="mode">
            <FormFieldLabel>Mode</FormFieldLabel>
            <FormFieldInput>
              <StackedInput orientation="horizontal">
                <StackedRadioButton value={InclusivityMode.Include}>
                  Include
                </StackedRadioButton>
                <StackedRadioButton value={InclusivityMode.Exclude}>
                  Exclude
                </StackedRadioButton>
              </StackedInput>
            </FormFieldInput>
          </FormField>
          <FormField name="selectedPostingGroup">
            <FormFieldLabel>Add Job Posting Group</FormFieldLabel>
            <div className="flex">
              <FormFieldInput>
                <TypeaheadInput
                  className="flex-grow"
                  items={postingGroups
                    .filter(
                      postingGroup =>
                        !userPostingGroups.some(
                          pg => pg.code === postingGroup.code
                        )
                    )
                    .map(postingGroup => ({
                      value: postingGroup,
                      title: postingGroup.description
                    }))}
                />
              </FormFieldInput>
              <HorizontalSpacer spacing={Spacing.S} />
              <Button
                disabled={!postingGroupSelected}
                onClick={() => {
                  const {
                    postingGroups = [],
                    selectedPostingGroup
                  } = getValues({
                    nest: true
                  });
                  if (selectedPostingGroup) {
                    setValue([
                      {
                        postingGroups: [...postingGroups, selectedPostingGroup]
                      }
                    ]);
                  }
                }}
              >
                Add
              </Button>
            </div>
          </FormField>
          <FormField name="postingGroups">
            <FormFieldLabel>Job Posting Groups</FormFieldLabel>
            <FormFieldInput>
              <ListBox
                className="h-64"
                displayValue={(item: JobPostingGroup) => item.description}
                elementKey={item => item.code}
              />
            </FormFieldInput>
          </FormField>
          <FormSubmit>Save</FormSubmit>
        </Form>
      </ViewContent>
    </View>
  );
};

export default PostingGroups;
