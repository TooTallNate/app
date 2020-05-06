import React, { useEffect } from "react";
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
import FormFieldInput from "../../common/components/form/FormFieldInput";
import NumberInput from "../../common/components/input/NumberInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import StaticValue from "../../common/components/input/StaticValue";
import FormGroupLabel from "../../common/components/form/FormGroupLabel";
import FormGroupContent from "../../common/components/form/FormGroupContent";

interface FormData {
  animal: string;
  lameQuantity: number;
  respitoryQuantity: number;
  bellyRuptureQuantity: number;
  scrotumRuptureQuantity: number;
  scoursQuantity: number;
  smallQuantity: number;
  unthriftyQuantity: number;
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

  const formContext = useForm<FormData>();
  const { loading, data } = usePigGradeOffQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigGradeOff }) {
      const { setValue } = formContext;
      if (isSowFarm && pigGradeOff.animal)
        setValue("animal", pigGradeOff.animal);
      if (pigGradeOff.lameQuantity)
        setValue("lameQuantity", pigGradeOff.lameQuantity);
      if (pigGradeOff.respitoryQuantity)
        setValue("respitoryQuantity", pigGradeOff.respitoryQuantity);
      if (pigGradeOff.bellyRuptureQuantity)
        setValue("bellyRuptureQuantity", pigGradeOff.bellyRuptureQuantity);
      if (pigGradeOff.scrotumRuptureQuantity)
        setValue("scrotumRuptureQuantity", pigGradeOff.scrotumRuptureQuantity);
      if (pigGradeOff.scoursQuantity)
        setValue("scoursQuantity", pigGradeOff.scoursQuantity);
      if (pigGradeOff.smallQuantity)
        setValue("smallQuantity", pigGradeOff.smallQuantity);
      if (pigGradeOff.unthriftyQuantity)
        setValue("unthriftyQuantity", pigGradeOff.unthriftyQuantity);
      if (pigGradeOff.pigWeight) setValue("pigWeight", pigGradeOff.pigWeight);
      if (pigGradeOff.comments) setValue("comments", pigGradeOff.comments);
    }
  });
  const [post] = usePostPigGradeOffMutation();
  const [save] = useSavePigGradeOffMutation();
  const { setMessage } = useFlash();
  const { getValues, watch, formState, triggerValidation } = formContext;

  const {
    lameQuantity = 0,
    respitoryQuantity = 0,
    bellyRuptureQuantity = 0,
    scrotumRuptureQuantity = 0,
    scoursQuantity = 0,
    smallQuantity = 0,
    unthriftyQuantity = 0
  } = watch([
    "lameQuantity",
    "respitoryQuantity",
    "bellyRuptureQuantity",
    "scrotumRuptureQuantity",
    "scoursQuantity",
    "smallQuantity",
    "unthriftyQuantity"
  ]);
  const hasQuantity =
    lameQuantity > 0 ||
    respitoryQuantity > 0 ||
    bellyRuptureQuantity > 0 ||
    scrotumRuptureQuantity > 0 ||
    scoursQuantity > 0 ||
    smallQuantity > 0 ||
    unthriftyQuantity > 0;
  const quantityValidation = {
    required: !hasQuantity && "At least one quantity field is required."
  };
  const totalQuantity =
    lameQuantity +
    respitoryQuantity +
    bellyRuptureQuantity +
    scrotumRuptureQuantity +
    scoursQuantity +
    smallQuantity +
    unthriftyQuantity;

  // Validate quantities if one changes.
  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("lameQuantity");
      triggerValidation("respitoryQuantity");
      triggerValidation("bellyRuptureQuantity");
      triggerValidation("scrotumRuptureQuantity");
      triggerValidation("scoursQuantity");
      triggerValidation("smallQuantity");
      triggerValidation("unthriftyQuantity");
    }
  }, [
    triggerValidation,
    formState.isSubmitted,
    lameQuantity,
    respitoryQuantity,
    bellyRuptureQuantity,
    scrotumRuptureQuantity,
    scoursQuantity,
    smallQuantity,
    unthriftyQuantity
  ]);

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            ...data,
            ...(isNurseryFinisher && { animal: "01" }),
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
      await save({
        variables: {
          input: {
            ...getValues(),
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
                <FormField name="lameQuantity" rules={quantityValidation}>
                  <FormFieldLabel>Lame</FormFieldLabel>
                  <FormFieldInput>
                    <NumberInput />
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
                <FormField name="respitoryQuantity" rules={quantityValidation}>
                  <FormFieldLabel>Respitory</FormFieldLabel>
                  <FormFieldInput>
                    <NumberInput />
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
                <FormField
                  name="bellyRuptureQuantity"
                  rules={quantityValidation}
                >
                  <FormFieldLabel>Belly Rupture</FormFieldLabel>
                  <FormFieldInput>
                    <NumberInput />
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
                <FormField
                  name="scrotumRuptureQuantity"
                  rules={quantityValidation}
                >
                  <FormFieldLabel>Scrotum Rupture</FormFieldLabel>
                  <FormFieldInput>
                    <NumberInput />
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
                <FormField name="scoursQuantity" rules={quantityValidation}>
                  <FormFieldLabel>Scours</FormFieldLabel>
                  <FormFieldInput>
                    <NumberInput />
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
                <FormField name="smallQuantity" rules={quantityValidation}>
                  <FormFieldLabel>Small</FormFieldLabel>
                  <FormFieldInput>
                    <NumberInput />
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
                <FormField name="unthriftyQuantity" rules={quantityValidation}>
                  <FormFieldLabel>Unthrifty</FormFieldLabel>
                  <FormFieldInput>
                    <NumberInput />
                  </FormFieldInput>
                  <FormFieldErrors />
                </FormField>
                <FormField name="totalQuantity">
                  <FormFieldLabel>Total</FormFieldLabel>
                  <FormFieldInput noRegister>
                    <StaticValue value={totalQuantity} />
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
