import React from "react";
import { useForm } from "react-hook-form";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import ViewTitle from "../../common/components/view/ViewTitle";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import Form from "../../common/components/form/Form";
import {
  InclusivityMode,
  useLocationsQuery,
  useUpdateLocationsMutation
} from "../graphql";
import StackedInput from "../../common/components/input/StackedInput";
import StackedRadioButton from "../../common/components/input/StackedRadioButton";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import Button from "../../common/components/input/Button";
import { Spacing } from "../../common/components/layout/spacing";
import ListBox from "../../common/components/input/ListBox";
import { Location } from "../graphql";
import FormSubmit from "../../common/components/form/FormSubmit";
import { useFlash } from "../../common/contexts/flash";
import { LivestockActivityJobsDocument } from "../../livestock-activity/graphql";

interface FormData {
  mode: InclusivityMode;
  selectedLocation: Location;
  locations: Location[];
}

const LocationsView: React.FC = () => {
  const formContext = useForm<FormData>();
  const { setValue, getValues, watch } = formContext;

  const { data, loading } = useLocationsQuery({
    onCompleted(data) {
      if (data.user) {
        setValue([
          { mode: data.user.locations.mode },
          { locations: data.user.locations.list }
        ]);
      }
    }
  });
  const [update] = useUpdateLocationsMutation({
    refetchQueries: [
      {
        query: LivestockActivityJobsDocument
      }
    ]
  });
  const { addMessage } = useFlash();

  const userLocations = watch("locations", []);
  const locations = data ? data.locations : [];
  const locationSelected = !!watch("selectedLocation");

  console.log(data);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <ViewTitle>Locations</ViewTitle>
      </ViewHeader>
      <ViewContent loading={loading}>
        <Form
          context={formContext}
          onSubmit={async d => {
            await update({
              variables: {
                input: {
                  mode: d.mode,
                  add: d.locations
                    .filter(loc =>
                      data!.user!.locations.list.every(l => l.code !== loc.code)
                    )
                    .map(l => l.code),
                  remove: data!
                    .user!.locations.list.filter(loc =>
                      d.locations.every(l => l.code !== loc.code)
                    )
                    .map(l => l.code)
                }
              }
            });
            addMessage({
              message: "Locations updated successfully!",
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
          <FormField name="selectedLocation">
            <FormFieldLabel>Add Location</FormFieldLabel>
            <div className="flex">
              <FormFieldInput>
                <TypeaheadInput
                  className="flex-grow"
                  items={locations
                    .filter(
                      loc => !userLocations.some(l => l.code === loc.code)
                    )
                    .map(loc => ({
                      value: loc,
                      title: loc.name
                    }))}
                />
              </FormFieldInput>
              <HorizontalSpacer spacing={Spacing.S} />
              <Button
                disabled={!locationSelected}
                onClick={() => {
                  const { locations = [], selectedLocation } = getValues({
                    nest: true
                  });
                  if (selectedLocation) {
                    setValue([{ locations: [...locations, selectedLocation] }]);
                  }
                }}
              >
                Add
              </Button>
            </div>
          </FormField>
          <FormField name="locations">
            <FormFieldLabel>Locations</FormFieldLabel>
            <FormFieldInput>
              <ListBox
                className="h-64"
                displayValue={(item: Location) => item.name}
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

export default LocationsView;
