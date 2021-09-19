import React from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import NumberInput from "../../common/components/input/NumberInput";
import { useParams, useHistory } from "react-router";
import {
  useLivestockMortalityQuery,
  useSaveLivestockMortalityMutation,
  usePostLivestockMortalityMutation
} from "../graphql";
import { useFlash } from "../../common/contexts/flash";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormSubmit from "../../common/components/form/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";
import Button from "../../common/components/input/Button";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import CommentsField from "../components/CommentsField";
import InventoryField from "../components/InventoryField";
import JobField from "../components/JobField";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import StaticValue from "../../common/components/input/StaticValue";
import DateInput from "../../common/components/input/DateInput";

interface FormData {
  event: string;
  postingDate: string;
  quantities: { [code: string]: number };
  comments?: string;
}

interface ViewParams {
  job: string;
  barnType: string;
}

const ActivityMortalityView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();

  const formContext = useForm<FormData>({
    defaultValues: {
      quantities: {}
    }
  });
  const { loading, data } = useLivestockMortalityQuery({
    variables: {
      job: params.job
    },
    onCompleted({ livestockMortality, livestockMortalityEventTypes }) {
      const { setValue } = formContext;
      if (livestockMortalityEventTypes.length === 1) {
        setValue("event", livestockMortalityEventTypes[0].code);
      } else if (livestockMortality.event)
        setValue("event", livestockMortality.event.code);
      if (livestockMortality.postingDate)
        setValue("postingDate", livestockMortality.postingDate);
      setTimeout(() => {
        if (livestockMortality.quantities)
          setValue(
            "quantities",
            livestockMortality.quantities.reduce(
              (obj, q) => ({ ...obj, [q.code]: q.quantity }),
              {}
            )
          );
      }, 100);
      if (livestockMortality.comments)
        setValue("comments", livestockMortality.comments);
    }
  });
  const [post] = usePostLivestockMortalityMutation();
  const [save] = useSaveLivestockMortalityMutation();
  const { setMessage } = useFlash();
  const { getValues, watch } = formContext;

  const quantities = watch("quantities") || {};
  const totalQuantity = Object.values(quantities).reduce<number>(
    (sum, q = 0) => sum + q,
    0
  );

  const event = watch("event");
  const eventConfig = data
    ? data.livestockMortalityEventTypes.find(elem => elem.code === event)
    : undefined;

  const onSubmit: OnSubmit<FormData> = async ({
    event,
    postingDate,
    quantities,
    comments
  }) => {
    try {
      await post({
        variables: {
          input: {
            event,
            postingDate,
            quantities: Object.entries(quantities)
              .filter(([, quantity]) => !!quantity)
              .map(([code, quantity]) => ({
                code,
                quantity
              })),
            comments,
            job: params.job
          }
        }
      });
      setMessage({
        message: "Entry recorded successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/livestock-activity");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  const onSave = async () => {
    try {
      const { event, quantities, postingDate, comments } = getValues({
        nest: true
      });
      await save({
        variables: {
          input: {
            postingDate,
            event,
            quantities: Object.entries(quantities).map(([code, quantity]) => ({
              code,
              quantity
            })),
            comments,
            job: params.job
          }
        }
      });
      setMessage({
        message: "Entry saved successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/livestock-activity");
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
        <Title>Mortality</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <JobField
              number={data.livestockMortality.job.number}
              description={data.livestockMortality.job.description}
            />
            <InventoryField
              inventory={data.livestockMortality.job.inventory || 0}
              deadQuantity={data.livestockMortality.job.deadQuantity || 0}
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
                  items={data.livestockMortalityEventTypes.map(event => ({
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
            <FormField name="total-quantity">
              <FormFieldLabel>Total Quantity</FormFieldLabel>
              <FormFieldInput noRegister>
                <StaticValue value={totalQuantity} />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <CommentsField />
            <div className="flex">
              <Button className="w-full" type="button" onClick={onSave}>
                Save
              </Button>
              <HorizontalSpacer />
              <FormSubmit />
            </div>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ActivityMortalityView;
