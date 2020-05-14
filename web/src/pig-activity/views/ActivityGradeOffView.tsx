import React, { useEffect, useState } from "react";
import FormGroup from "../../common/components/form/FormGroup";
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
import AnimalField from "../components/AnimalField";
import JobField from "../components/JobField";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput, {
  FormFieldInputElement
} from "../../common/components/form/FormFieldInput";
import NumberInput from "../../common/components/input/NumberInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import StaticValue from "../../common/components/input/StaticValue";
import FormGroupLabel from "../../common/components/form/FormGroupLabel";
import FormGroupContent from "../../common/components/form/FormGroupContent";
import StackedInput from "../../common/components/input/StackedInput";
import StackedButton from "../../common/components/input/StackedButton";

function onInputAdded(el: FormFieldInputElement | null) {
  if (el) {
    el.focus();
  }
}

interface FormData {
  animal: string;
  newQuantityReason?: string;
  quantities: { [code: string]: number };
  pigWeight: number;
  comments?: string;
}

interface ViewParams {
  job: string;
  barnType: string;
}

const ActivityGradeOffView: React.FC = () => {
  const params = useParams<ViewParams>();
  const history = useHistory();
  const isSowFarm = params.barnType === "sow-farm";
  const isNurseryFinisher = params.barnType === "nursery-finisher";
  const [reasons, setReasons] = useState<string[]>([]);

  const formContext = useForm<FormData>({
    defaultValues: {
      quantities: {}
    }
  });
  const { loading, data } = usePigGradeOffQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigGradeOff }) {
      const { setValue } = formContext;
      if (isSowFarm && pigGradeOff.animal)
        setValue("animal", pigGradeOff.animal);
      if (pigGradeOff.pigWeight) setValue("pigWeight", pigGradeOff.pigWeight);
      if (pigGradeOff.comments) setValue("comments", pigGradeOff.comments);
      const reasons = pigGradeOff.quantities.map(({ code, quantity }) => {
        setValue(`quantities.${code}`, quantity);
        return code;
      });
      setReasons(reasons);
    }
  });
  const [post] = usePostPigGradeOffMutation();
  const [save] = useSavePigGradeOffMutation();
  const { setMessage } = useFlash();
  const {
    getValues,
    watch,
    setValue,
    triggerValidation,
    formState
  } = formContext;

  const quantities = watch("quantities") || {};
  const totalQuantity = Object.values(quantities).reduce<number>(
    (sum, q = 0) => sum + q,
    0
  );

  const newQuantityReason = watch("newQuantityReason");

  useEffect(() => {
    if (newQuantityReason) {
      setReasons(reasons => [...reasons, newQuantityReason]);
      setValue("newQuantityReason", undefined);
    }
  }, [newQuantityReason, setValue, triggerValidation]);

  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("newQuantityReason");
    }
  }, [triggerValidation, reasons, formState.isSubmitted]);

  const onSubmit: OnSubmit<FormData> = async ({
    animal,
    pigWeight,
    comments,
    quantities
  }) => {
    try {
      await post({
        variables: {
          input: {
            animal: isNurseryFinisher ? "01" : animal,
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
        message: "Entry recorded successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  const onSave = async () => {
    try {
      const { animal, pigWeight, comments, quantities } = getValues({
        nest: true
      });
      console.log(
        Object.entries(quantities).map(([code, quantity]) => ({
          code,
          quantity
        }))
      );
      await save({
        variables: {
          input: {
            animal,
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
      history.push("/");
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
            {isSowFarm && <AnimalField animals={data.pigTypes} />}
            <FormGroup>
              <FormGroupLabel>Quantity</FormGroupLabel>
              <FormGroupContent>
                {reasons.map((code, i) => {
                  const reason = data.pigGradeOffReasons.find(
                    r => r.code === code
                  )!;
                  return (
                    <FormField
                      key={code}
                      name={`quantities.${code}`}
                      rules={{
                        required: "This quantity field is required."
                      }}
                    >
                      <FormFieldLabel>{reason.description}</FormFieldLabel>
                      <div className="flex">
                        <FormFieldInput
                          ref={i === reasons.length - 1 ? onInputAdded : null}
                        >
                          <NumberInput className="rounded-r-none" />
                        </FormFieldInput>
                        <Button
                          className="rounded-l-none"
                          onClick={() => {
                            setReasons(reasons =>
                              reasons.filter(c => c !== code)
                            );
                            triggerValidation("newQuantityReason");
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      <FormFieldErrors />
                    </FormField>
                  );
                })}
                <FormField name="totalQuantity">
                  <FormFieldLabel>Total</FormFieldLabel>
                  <FormFieldInput noRegister>
                    <StaticValue value={totalQuantity} />
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
                <FormField
                  name="newQuantityReason"
                  rules={{
                    validate: {
                      required: () => {
                        const { quantities = {} } = getValues({ nest: true });
                        return (
                          Object.keys(quantities).length > 0 ||
                          "At least one quantity is required."
                        );
                      }
                    }
                  }}
                >
                  <FormFieldLabel>New Reason</FormFieldLabel>
                  <FormFieldInput>
                    <StackedInput orientation="vertical">
                      {data.pigGradeOffReasons
                        .filter(({ code }) => !reasons.includes(code))
                        .map(({ code, description }) => (
                          <StackedButton value={code} key={code}>
                            {description}
                          </StackedButton>
                        ))}
                    </StackedInput>
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
              </FormGroupContent>
            </FormGroup>
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
