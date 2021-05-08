import React from "react";
import { useRouteMatch } from "react-router-dom";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import { OnSubmit, useForm } from "react-hook-form";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import StackedInput from "../../common/components/input/StackedInput";
import StackedButton from "../../common/components/input/StackedButton";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";

interface FormData {
  event: string;
  asset: string;
}

const tempData = [
  {
    key: "hello"
  },
  {
    key: "world"
  }
];

const EventSelectionView: React.FC = () => {
  const formContext = useForm<FormData>();
  const { getValues, watch } = formContext;

  const match = useRouteMatch();
  console.log(match);

  const onSubmit: OnSubmit<FormData> = async data => {
    console.log(data);
  };

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Event and Asset Selection</Title>
      </ViewHeader>
      <ViewContent>
        <Form context={formContext} onSubmit={onSubmit}>
          <FormField
            name="event"
            rules={{
              required: "An event is required"
            }}
          >
            <FormFieldInput>
              <StackedInput orientation="vertical">
                <StackedButton value={"fuel"}>Fuel</StackedButton>
                <StackedButton value={"maintenance"}>Maintenance</StackedButton>
              </StackedInput>
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormField
            name="asset"
            rules={{
              required: "An asset is required"
            }}
          >
            <FormFieldLabel>Select Asset</FormFieldLabel>
            <FormFieldInput>
              <TypeaheadInput
                items={tempData.map(x => ({
                  value: x.key,
                  title: x.key
                }))}
              />
            </FormFieldInput>
          </FormField>
        </Form>
      </ViewContent>
    </View>
  );
};

export default EventSelectionView;
