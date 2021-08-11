import React from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useParams, useHistory } from "react-router";
import {
  usePigGradeOffQuery,
  useSavePigGradeOffMutation,
  usePostPigGradeOffMutation
} from "../graphql";
import { useFlash } from "../../common/contexts/flash";
import Form from "../../common/components/form/Form";
import FormSubmit from "../../common/components/form/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";
import BackButton from "../../common/components/view/BackButton";
import Button from "../../common/components/input/Button";
import ViewContent from "../../common/components/view/ViewContent";
import CommentsField from "../components/CommentsField";
import InventoryField from "../components/InventoryField";
import JobField from "../components/JobField";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import NumberInput from "../../common/components/input/NumberInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import StaticValue from "../../common/components/input/StaticValue";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import DateInput from "../../common/components/input/DateInput";
import ImageUploadField from "../components/ImageUploadField";

interface FormData {
  event: string;
  postingDate: string;
  newQuantityReason?: string;
  quantities: { [code: string]: number };
  pigWeight: number;
  comments?: string;
  imagesUID?: string;
}

interface ViewParams {
  job: string;
  barnType: string;
}

const ActivityGradeOffView: React.FC = () => {
  const params = useParams<ViewParams>();
  const history = useHistory();

  const formContext = useForm<FormData>({
    defaultValues: { quantities: {} }
  });
  const { loading, data } = usePigGradeOffQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigGradeOff, pigGradeOffEventTypes }) {
      const { setValue } = formContext;
      if (pigGradeOffEventTypes.length === 1) {
        setValue("event", pigGradeOffEventTypes[0].code);
      } else if (pigGradeOff.event) setValue("event", pigGradeOff.event.code);
      if (pigGradeOff.pigWeight) setValue("pigWeight", pigGradeOff.pigWeight);
      if (pigGradeOff.comments) setValue("comments", pigGradeOff.comments);
      if (pigGradeOff.postingDate)
        setValue("postingDate", pigGradeOff.postingDate);
      setTimeout(() => {
        if (pigGradeOff.quantities) {
          setValue(
            "quantities",
            pigGradeOff.quantities.reduce(
              (obj, q) => ({ ...obj, [q.code]: q.quantity }),
              {}
            )
          );
        }
      }, 100);
      if (pigGradeOff.imagesUID) {
        setValue("imagesUID", pigGradeOff.imagesUID);
      }
    }
  });
  const [post] = usePostPigGradeOffMutation();
  const [save] = useSavePigGradeOffMutation();
  const { setMessage } = useFlash();
  const { getValues, watch } = formContext;

  const quantities = watch("quantities");
  const totalQuantity = Object.values(quantities).reduce<number>(
    (sum, q = 0) => sum + q,
    0
  );

  const event = watch("event");
  const eventConfig = data
    ? data.pigGradeOffEventTypes.find(elem => elem.code === event)
    : undefined;

  const onSubmit: OnSubmit<FormData> = async ({
    event,
    pigWeight,
    comments,
    postingDate,
    quantities
  }) => {
    try {
      await post({
        variables: {
          input: {
            event,
            pigWeight,
            comments,
            postingDate,
            quantities: Object.entries(quantities)
              .filter(([, quantity]) => !!quantity)
              .map(([code, quantity]) => ({
                code,
                quantity
              })),
            job: params.job
          }
        }
      });
      setMessage({
        message: "Entry recorded successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/pig-activity");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  const onSave = async () => {
    try {
      const { event, postingDate, pigWeight, comments, quantities } = getValues(
        {
          nest: true
        }
      );
      await save({
        variables: {
          input: {
            postingDate,
            event,
            pigWeight,
            comments,
            quantities: Object.entries(quantities).map(([code, quantity]) => ({
              code,
              quantity
            })),
            job: params.job
          }
        }
      });
      setMessage({
        message: "Entry saved successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/pig-activity");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Grade Off</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <JobField
              number={data.pigGradeOff.job.number}
              description={data.pigGradeOff.job.description}
            />
            <InventoryField
              inventory={data.pigGradeOff.job.inventory || 0}
              deadQuantity={data.pigGradeOff.job.deadQuantity || 0}
            />
            <FormField
              name="event"
              rules={{
                required: "The event field is required."
              }}
            >
              <FormFieldLabel>Event</FormFieldLabel>
              <FormFieldInput>
                <TypeaheadInput
                  items={data.pigGradeOffEventTypes.map(event => ({
                    value: event.code,
                    title: event.description
                  }))}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField name="postingDate">
              <FormFieldLabel>Activity Date</FormFieldLabel>
              <FormFieldInput>
                <DateInput />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            {eventConfig &&
              eventConfig.reasons.map(reason => {
                return (
                  <FormField
                    key={reason.code}
                    name={`quantities.${reason.code}`}
                  >
                    <FormFieldLabel>{reason.description}</FormFieldLabel>
                    <FormFieldInput>
                      <NumberInput />
                    </FormFieldInput>
                    <FormFieldErrors />
                  </FormField>
                );
              })}
            <FormField name="totalQuantity">
              <FormFieldLabel>Total Quantity</FormFieldLabel>
              <FormFieldInput noRegister>
                <StaticValue value={totalQuantity} />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="pigWeight"
              rules={{
                required: "The weight field is required."
              }}
            >
              <FormFieldLabel>Weight/Pig</FormFieldLabel>
              <FormFieldInput>
                <NumberInput />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <CommentsField />
            <ImageUploadField />
            <div className="flex">
              <Button className="mr-4 w-full" type="button" onClick={onSave}>
                Save
              </Button>
              <FormSubmit />
            </div>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ActivityGradeOffView;
