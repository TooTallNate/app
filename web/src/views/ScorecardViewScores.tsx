import { RouteComponentProps } from "react-router-dom";
import {
  View,
  Title,
  ButtonLink,
  FormGroup,
  Output
} from "../components/styled";
import Button from "../components/ui/Button";
import SliderInput from "../components/ui/SliderInput";
import {
  usePostFarrowingBackendScorecardMutation,
  useSaveFarrowingBackendScorecardMutation,
  useFarrowingBackendScorecardQuery
} from "../graphql";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import { useFlash } from "../contexts/flash";
import FullPageSpinner from "../components/FullPageSpinner";
import { useForm, OnSubmit, FormContextValues } from "react-hook-form";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldErrors from "../components/ui/FormFieldErrors";
import FormSubmit from "../components/ui/FormSubmit";
import TypeaheadInput, { TypeaheadItem } from "../components/ui/TypeaheadInput";
import React, { useMemo } from "react";

interface FormData {
  operator: string;
  sowCare: number;
  sowCareComments?: string;
  pigletCare: number;
  pigletCareComments?: string;
  feed: number;
  feedComments?: string;
  water: number;
  waterComments?: string;
  crate: number;
  crateComments?: string;
  generalRoom: number;
  generalRoomComments?: string;
}

// Converts the form data to the input object for save and post.
function toMutationInput(area: string, data: FormData) {
  return {
    area,
    operator: data.operator,
    sows: {
      score: data.sowCare,
      comments: data.sowCareComments
    },
    piglets: {
      score: data.pigletCare,
      comments: data.pigletCareComments
    },
    feed: {
      score: data.feed,
      comments: data.feedComments
    },
    water: {
      score: data.water,
      comments: data.waterComments
    },
    crate: {
      score: data.crate,
      comments: data.crateComments
    },
    room: {
      score: data.generalRoom,
      comments: data.generalRoomComments
    }
  };
}

// Renders a slider and comments box for a score entry.
interface ScoreEntryProps {
  name: string;
  label: string;
}
const ScoreEntry: React.FC<ScoreEntryProps> = ({ name, label }) => {
  return (
    <>
      <FormField
        name={name}
        rules={{ required: `The ${label.toLowerCase()} field is required.` }}
      >
        <FormFieldLabel>{label}</FormFieldLabel>
        <FormFieldInput>
          <SliderInput min={0} max={10} step={1} labelStep={1} />
        </FormFieldInput>
        <FormFieldErrors />
      </FormField>
      <FormField name={`${name}Comments`}>
        <FormFieldLabel>Comments</FormFieldLabel>
        <FormFieldInput>
          <MultilineTextInput maxLength={50} />
        </FormFieldInput>
        <FormFieldErrors />
      </FormField>
    </>
  );
};

// Calculates the score and percentage using the form context.
interface Score {
  score: number;
  max: number;
  percent: number;
}
const useScore = ({ watch }: FormContextValues<FormData>): Score => {
  const { crate, feed, generalRoom, pigletCare, sowCare, water } = watch([
    "sowCare",
    "pigletCare",
    "feed",
    "water",
    "crate",
    "generalRoom"
  ]);

  const max = 60;
  const score =
    (crate || 0) +
    (feed || 0) +
    (generalRoom || 0) +
    (pigletCare || 0) +
    (sowCare || 0) +
    (water || 0);
  const percent = (100 * score) / max;

  return { score, max, percent };
};

const ScorecardViewScores: React.FC<RouteComponentProps<{ area: string }>> = ({
  history,
  match
}) => {
  const formContext = useForm<FormData>({
    defaultValues: {
      crate: 0,
      feed: 0,
      water: 0,
      sowCare: 0,
      pigletCare: 0,
      generalRoom: 0
    }
  });
  const { loading, data } = useFarrowingBackendScorecardQuery({
    variables: {
      area: match.params.area
    },
    onCompleted(scorecardData) {
      const { setValue } = formContext;
      if (scorecardData && scorecardData.area) {
        if (scorecardData.scorecard) {
          const data = scorecardData.scorecard;
          setValue(
            "operator",
            data.operator
              ? data.operator.number
              : scorecardData.area.personResponsible.number
          );
          if (data.sows.score) setValue("sowCare", data.sows.score);
          if (data.sows.comments)
            setValue("sowCareComments", data.sows.comments);
          if (data.piglets.score) setValue("pigletCare", data.piglets.score);
          if (data.piglets.comments)
            setValue("pigletCareComments", data.piglets.comments);
          if (data.feed.score) setValue("feed", data.feed.score);
          if (data.feed.comments) setValue("feedComments", data.feed.comments);
          if (data.water.score) setValue("water", data.water.score);
          if (data.water.comments)
            setValue("waterComments", data.water.comments);
          if (data.crate.score) setValue("crate", data.crate.score);
          if (data.crate.comments)
            setValue("crateComments", data.crate.comments);
          if (data.room.score) setValue("generalRoom", data.room.score);
          if (data.room.comments)
            setValue("generalRoomComments", data.room.comments);
        } else {
          setValue("operator", scorecardData.area.personResponsible.number);
        }
      }
    }
  });
  const [post] = usePostFarrowingBackendScorecardMutation();
  const [save] = useSaveFarrowingBackendScorecardMutation();
  const { setMessage } = useFlash();
  const { getValues } = formContext;

  const { score, max, percent } = useScore(formContext);

  const operators = useMemo<TypeaheadItem[]>(() => {
    if (data) {
      return data.operators.map(operator => ({
        value: operator.number,
        title: operator.name
      }));
    } else {
      return [];
    }
  }, [data]);

  // Post the scorecard as a final submission.
  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: toMutationInput(match.params.area, data)
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
          input: toMutationInput(match.params.area, getValues())
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

  return loading || !data ? (
    <FullPageSpinner>Loading...</FullPageSpinner>
  ) : (
    <View>
      <Title>
        Farrowing Scorecard
        <span
          className="text-base font-normal float-right pt-1"
          aria-label="Total Score"
        >
          {score}/{max}{" "}
          <span className="hidden xs:inline">{percent.toFixed(2)}%</span>
        </span>
      </Title>
      <Form context={formContext} onSubmit={onSubmit}>
        <FormField name="area">
          <FormFieldLabel>Area</FormFieldLabel>
          <FormFieldInput>
            <Output>{data.area && data.area.description}</Output>
          </FormFieldInput>
        </FormField>
        <FormField
          name="operator"
          rules={{ required: "The operator field is required." }}
        >
          <FormFieldLabel>Operator</FormFieldLabel>
          <div className="flex">
            <div className="flex-grow">
              <FormFieldInput>
                <TypeaheadInput items={operators} />
              </FormFieldInput>
              <FormFieldErrors />
            </div>
            <ButtonLink
              className="ml-4"
              to={`/scorecard/areas/${match.params.area}/operator`}
            >
              Change
            </ButtonLink>
          </div>
        </FormField>
        <ScoreEntry name="sowCare" label="Sow Care" />
        <ScoreEntry name="pigletCare" label="Piglet Care" />
        <ScoreEntry name="feed" label="Feed" />
        <ScoreEntry name="water" label="Water" />
        <ScoreEntry name="crate" label="Crate" />
        <ScoreEntry name="generalRoom" label="General Room" />
        <FormGroup>
          <Button className="mr-4 w-full" type="button" onClick={onSave}>
            Save
          </Button>
          <FormSubmit />
        </FormGroup>
      </Form>
    </View>
  );
};

export default ScorecardViewScores;
