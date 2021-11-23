import React from "react";
import { useForm } from "react-hook-form";
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
import BackButton from "../../common/components/view/BackButton";
import View from "../../common/components/view/View";
import ViewContent from "../../common/components/view/ViewContent";
import ViewHeader from "../../common/components/view/ViewHeader";
import ViewTitle from "../../common/components/view/ViewTitle";
import { useFlash } from "../../common/contexts/flash";
import { LivestockActivityJobsDocument } from "../../livestock-activity/graphql";
import {
  InclusivityMode,
  MenuOption,
  useMenuOptionsQuery,
  useUpdateMenuOptionsMutation
} from "../graphql";

interface FormData {
  mode: InclusivityMode;
  selectedMenuOption: MenuOption;
  menuOptions: MenuOption[];
}

const MenuView: React.FC = () => {
  const formContext = useForm<FormData>();
  const { setValue, getValues, watch } = formContext;

  const { data, loading } = useMenuOptionsQuery({
    fetchPolicy: "no-cache",
    onCompleted(data) {
      if (data.user) {
        setValue([
          { mode: data.user.menuOptions.mode },
          { menuOptions: data.user.menuOptions.list }
        ]);
      }
    }
  });
  const [update] = useUpdateMenuOptionsMutation({
    refetchQueries: [
      {
        query: LivestockActivityJobsDocument
      }
    ]
  });
  const { addMessage } = useFlash();

  const userMenuOptions = watch("menuOptions", []);
  const menuOptions = data ? data.menuOptions : [];
  const optionSelected = !!watch("selectedMenuOption");

  console.log(data);
  return (
    <View>
      <ViewHeader>
        <BackButton />
        <ViewTitle>Menu Options</ViewTitle>
      </ViewHeader>
      <ViewContent loading={loading}>
        <Form
          context={formContext}
          onSubmit={async d => {
            await update({
              variables: {
                input: {
                  mode: d.mode,
                  add: d.menuOptions
                    .filter(option =>
                      data!.user!.menuOptions.list.every(
                        opt => opt.name !== option.name
                      )
                    )
                    .map(opt => opt.name),
                  remove: data!
                    .user!.menuOptions.list.filter(option =>
                      d.menuOptions.every(opt => opt.name !== option.name)
                    )
                    .map(opt => opt.name)
                }
              }
            });
            addMessage({
              message: "Menu Options updated successfully!",
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
          <FormField name="selectedMenuOption">
            <FormFieldLabel>Add Menu Option</FormFieldLabel>
            <div className="flex">
              <FormFieldInput>
                <TypeaheadInput
                  className="flex-grow"
                  items={menuOptions
                    .filter(
                      option =>
                        !userMenuOptions.some(opt => opt.name === option.name)
                    )
                    .map(option => ({
                      value: option,
                      title: option.name
                    }))}
                />
              </FormFieldInput>
              <HorizontalSpacer spacing={Spacing.S} />
              <Button
                disabled={!optionSelected}
                onClick={() => {
                  const { menuOptions = [], selectedMenuOption } = getValues({
                    nest: true
                  });
                  if (
                    userMenuOptions.find(
                      item => item.name === selectedMenuOption.name
                    )
                  ) {
                    addMessage({
                      message: "Menu Options is already in the list",
                      level: "error"
                    });
                  } else if (selectedMenuOption) {
                    setValue([
                      { menuOptions: [...menuOptions, selectedMenuOption] }
                    ]);
                  }
                }}
              >
                Add
              </Button>
            </div>
          </FormField>
          <FormField name="menuOptions">
            <FormFieldLabel>Menu Options</FormFieldLabel>
            <FormFieldInput>
              <ListBox
                className="h-64"
                displayValue={(item: MenuOption) => item.name}
                elementKey={item => item.name}
              />
            </FormFieldInput>
          </FormField>
          <FormSubmit>Save</FormSubmit>
        </Form>
      </ViewContent>
    </View>
  );
};

export default MenuView;
