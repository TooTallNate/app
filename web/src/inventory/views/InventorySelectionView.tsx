import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from "react-router-dom";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormSubmit from "../../common/components/form/FormSubmit";
import Button from "../../common/components/input/Button";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import BackButton from "../../common/components/view/BackButton";
import View from "../../common/components/view/View";
import ViewContent from "../../common/components/view/ViewContent";
import ViewHeader from "../../common/components/view/ViewHeader";
import Title from "../../common/components/view/ViewTitle";
import { useInventoryItemQuery } from "../graphql";

interface FormData {
  item: string;
}

const InventorySelectionView: React.FC = () => {
  const history = useHistory();
  const formContext = useForm<FormData>();
  const { loading, data } = useInventoryItemQuery();

  const match = useRouteMatch();

  const onSubmit: OnSubmit<FormData> = data => {
    history.push(`${match.url}/inventory/${data.item}`);
  };

  const onBack = () => history.push("/");

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Inventory Item Selection</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField
              name="item"
              rules={{
                required: "An item is required"
              }}
            >
              <FormFieldLabel>Select Item</FormFieldLabel>
              <FormFieldInput>
                <TypeaheadInput
                  items={data.items.map(item => ({
                    value: item.number || "",
                    title: `${item.description}` || ""
                  }))}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <div className="flex-grow" />
            <div className="flex">
              <Button className="w-full" onClick={onBack}>
                Back
              </Button>
              <HorizontalSpacer />
              <FormSubmit>Continue</FormSubmit>
            </div>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default InventorySelectionView;
