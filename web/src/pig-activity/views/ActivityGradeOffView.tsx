import React from "react";
import { FormGroup } from "../../common/components/styled";
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
import WeightField from "../components/WeightField";
import QuantityField from "../components/QuantityField";
import JobField from "../components/JobField";

interface FormData {
  animal: string;
  quantity: number;
  weight: number;
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
      if (pigGradeOff.quantity) setValue("quantity", pigGradeOff.quantity);
      if (pigGradeOff.weight) setValue("weight", pigGradeOff.weight);
      if (pigGradeOff.comments) setValue("comments", pigGradeOff.comments);
    }
  });
  const [post] = usePostPigGradeOffMutation();
  const [save] = useSavePigGradeOffMutation();
  const { setMessage } = useFlash();
  const { getValues } = formContext;

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
            job: match.params.job
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
            <QuantityField />
            <WeightField />
            <CommentsField />
            <FormGroup>
              <Button className="mr-4 w-full" type="button" onClick={onSave}>
                Save
              </Button>
              <FormSubmit />
            </FormGroup>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ActivityGradeOffView;
