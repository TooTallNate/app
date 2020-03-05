import { RouteComponentProps } from "react-router-dom";
import {
  View,
  Title,
  ButtonLink,
  Button,
  FormGroup
} from "../components/styled";
import SliderInput from "../components/ui/SliderInput";
import {
  usePostFarrowingBackendScorecardMutation,
  useSaveFarrowingBackendScorecardMutation,
  useFarrowingBackendScorecardDataQuery,
  useFarrowingBackendScorecardLazyQuery,
  FarrowingBackendScorecardDataQuery
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
import TypeaheadInput from "../components/ui/TypeaheadInput";
import React, { useEffect } from "react";

interface FormData {
  area: string;
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
function toMutationInput(data: FormData) {
  return {
    area: data.area,
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

// Returns the selected area object.
const useSelectedArea = (
  { watch }: FormContextValues<FormData>,
  data?: FarrowingBackendScorecardDataQuery
) => {
  const { area } = watch(["area"]);
  const selectedArea =
    data && area ? data.areas.find(({ number }) => number === area) : null;

  return { selectedArea };
};

const ScorecardView: React.FC<RouteComponentProps> = ({
  history,
  location
}) => {
  const query = new URLSearchParams(location.search);
  const formContext = useForm<FormData>({
    defaultValues: {
      area: query.get("area") || "",
      crate: 0,
      feed: 0,
      water: 0,
      sowCare: 0,
      pigletCare: 0,
      generalRoom: 0
    }
  });
  const { data, loading } = useFarrowingBackendScorecardDataQuery();
  const [
    getScorecard,
    { loading: loadingScorecard, data: scorecardData, called: scorecardLoaded }
  ] = useFarrowingBackendScorecardLazyQuery();
  const [post] = usePostFarrowingBackendScorecardMutation();
  const [save] = useSaveFarrowingBackendScorecardMutation();
  const { setMessage } = useFlash();
  const { setValue, getValues, reset } = formContext;

  const { score, max, percent } = useScore(formContext);
  const { selectedArea } = useSelectedArea(formContext, data);

  // Load the cached scorecard data when the selected area changes.
  useEffect(() => {
    if (selectedArea) {
      reset({
        area: selectedArea.number,
        crate: 0,
        feed: 0,
        water: 0,
        sowCare: 0,
        pigletCare: 0,
        generalRoom: 0
      });
      getScorecard({ variables: { area: selectedArea.number } });
    }
  }, [getScorecard, reset, selectedArea]);

  // Update the scorecard form when the cached scorecard data is loaded.
  useEffect(() => {
    if (scorecardData && scorecardData.scorecard) {
      const data = scorecardData.scorecard;
      if (data.operator) setValue("operator", data.operator.number);
      if (data.sows.score) setValue("sowCare", data.sows.score);
      if (data.sows.comments) setValue("sowCareComments", data.sows.comments);
      if (data.piglets.score) setValue("pigletCare", data.piglets.score);
      if (data.piglets.comments)
        setValue("pigletCareComments", data.piglets.comments);
      if (data.feed.score) setValue("feed", data.feed.score);
      if (data.feed.comments) setValue("feedComments", data.feed.comments);
      if (data.water.score) setValue("water", data.water.score);
      if (data.water.comments) setValue("waterComments", data.water.comments);
      if (data.crate.score) setValue("crate", data.crate.score);
      if (data.crate.comments) setValue("crateComments", data.crate.comments);
      if (data.room.score) setValue("generalRoom", data.room.score);
      if (data.room.comments)
        setValue("generalRoomComments", data.room.comments);
    }
  }, [scorecardData, setValue]);

  // Post the scorecard as a final submission.
  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: toMutationInput(data)
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
          input: toMutationInput(getValues())
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
    <FullPageSpinner>Loading Defaults...</FullPageSpinner>
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
        <FormField
          name="area"
          rules={{ required: "The area field is required." }}
        >
          <FormFieldLabel>Area</FormFieldLabel>
          <FormFieldInput>
            <TypeaheadInput
              items={data.areas.map(area => ({
                value: area.number,
                title: area.description
              }))}
            />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        {(() => {
          if (loadingScorecard) {
            return <FullPageSpinner>Loading Scorecard...</FullPageSpinner>;
          } else if (scorecardLoaded) {
            return (
              <>
                <FormField
                  name="operator"
                  rules={{ required: "The operator field is required." }}
                >
                  <FormFieldLabel>Operator</FormFieldLabel>
                  <div className="flex">
                    <div className="flex-grow">
                      <FormFieldInput>
                        <TypeaheadInput
                          items={data.operators.map(operator => ({
                            value: operator.number,
                            title: operator.name
                          }))}
                        />
                      </FormFieldInput>
                      <FormFieldErrors />
                    </div>
                    {selectedArea && (
                      <ButtonLink
                        className="ml-4"
                        to={`/scorecard/area/${selectedArea.number}/operator`}
                      >
                        Change
                      </ButtonLink>
                    )}
                  </div>
                </FormField>
                <ScoreEntry name="sowCare" label="Sow Care" />
                <ScoreEntry name="pigletCare" label="Piglet Care" />
                <ScoreEntry name="feed" label="Feed" />
                <ScoreEntry name="water" label="Water" />
                <ScoreEntry name="crate" label="Crate" />
                <ScoreEntry name="generalRoom" label="General Room" />
                <FormGroup>
                  <Button className="mr-4" type="button" onClick={onSave}>
                    Save
                  </Button>
                  <FormSubmit />
                </FormGroup>
              </>
            );
          }
        })()}
      </Form>
    </View>
  );
};

export default ScorecardView;
