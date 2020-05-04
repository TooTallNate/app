import React from "react";
import { FormGroup } from "../../components/styled";
import Title from "../../components/view/ViewTitle";
import View from "../../components/view/View";
import ViewHeader from "../../components/view/ViewHeader";
import { RouteComponentProps } from "react-router";
import {
  usePigGradeOffQuery,
  useSavePigGradeOffMutation,
  usePostPigGradeOffMutation
} from "../graphql";
import { useFlash } from "../../contexts/flash";
import Form from "../../components/form/Form";
import FormSubmit from "../../components/form/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";
import BackButton from "../../components/view/BackButton";
import Button from "../../components/input/Button";
import ViewContent from "../../components/view/ViewContent";
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

const ActivityGradeOffView: React.FC<RouteComponentProps<{ job: string }>> = ({
  history,
  match
}) => {
  const formContext = useForm<FormData>();
  const { loading, data } = usePigGradeOffQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigGradeOff }) {
      const { setValue } = formContext;
      if (pigGradeOff.animal) setValue("animal", pigGradeOff.animal);
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
            job: match.params.job
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
            <AnimalField animals={data.pigTypes} />
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
