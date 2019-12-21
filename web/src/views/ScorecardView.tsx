/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { View, Button, Title, Output } from "../components/styled";
import ScorecardJobSelector from "../components/ScorecardJobSelector";
import Field from "../components/ui/Field";
import SliderInput from "../components/ui/SliderInput";
import { useReducer, useEffect, FormEventHandler } from "react";
import { Job, usePostJobJournalMutation } from "../graphql";
import { MultilineTextInput } from "../components/ui/text-inputs";
import useDefaults from "../contexts/defaults";
import { useFlash } from "../contexts/flash";
import { useAuth } from "../contexts/auth";
import FullPageSpinner from "../components/FullPageSpinner";
import { JobJournalTemplate, JobJournalBatch } from "../entities";
import { getDocumentNumber } from "../utils";
import ScorecardAreaSelector from "../components/ScorecardAreaSelector";
import tw from "tailwind.macro";

interface FormState {
  operator?: Job;
  area?: string;
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

function useForm() {
  return useReducer<React.Reducer<FormState, Partial<FormState>>>(
    (state, newState) => ({ ...state, ...newState }),
    { sowCare: 0, pigletCare: 0, feed: 0, water: 0, crate: 0, generalRoom: 0 }
  );
}

const ScorecardSliderInput: React.FC<
  React.ComponentProps<typeof SliderInput>
> = props => (
  <SliderInput {...props} min={0} max={10} step={0.5} labelStep={1} />
);

const ScorecardView: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useAuth();
  const [state, setState] = useForm();
  const [
    {
      defaults: { scorecardJob: defaultOperator },
      loading: loadingDefaults
    },
    setDefaults
  ] = useDefaults();
  const [postJobJournal, { loading }] = usePostJobJournalMutation();
  const { setMessage } = useFlash();

  const totalScore =
    state.crate +
    state.feed +
    state.generalRoom +
    state.pigletCare +
    state.sowCare +
    state.water;
  const scorePercent = ((100 * totalScore) / 60).toFixed(1);

  function postScore(type: string, score: number, comments?: string) {
    if (state.operator && state.area && user) {
      return postJobJournal({
        variables: {
          input: {
            template: JobJournalTemplate.Job,
            batch: JobJournalBatch.FarrowBE,
            date: new Date(),
            document: getDocumentNumber("FBE", user.username),
            job: state.operator.number,
            location: state.operator.site,
            task: type,
            number: state.area,
            workType: "FARROW-BE",
            quantity: score,
            unitPrice: 1.667,
            description: comments
          }
        }
      });
    }
  }

  // Set job with default only if not already set.
  useEffect(() => {
    if (!state.operator && defaultOperator) {
      setState({ operator: defaultOperator });
    }
  }, [defaultOperator, setState, state.operator]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      if (!state.operator || !user) {
        return;
      }
      await postScore("SOW CARE", state.sowCare, state.sowCareComments);
      await postScore(
        "PIGLET CARE",
        state.pigletCare,
        state.pigletCareComments
      );
      await postScore("SOW FEED", state.feed, state.feedComments);
      await postScore("WATER", state.water, state.waterComments);
      await postScore("CRATE", state.crate, state.crateComments);
      await postScore("GEN ROOM", state.generalRoom, state.generalRoomComments);
      if (state.operator !== defaultOperator) {
        await setDefaults({ scorecardJob: state.operator });
      }
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

  return loadingDefaults ? (
    <FullPageSpinner>Loading Defaults...</FullPageSpinner>
  ) : (
    <View>
      <Title>
        Farrowing Scorecard
        <span
          css={tw`text-base font-normal float-right pt-1`}
          aria-label="Total Score"
        >
          {totalScore}/60{" "}
          <span css={tw`hidden xs:inline`}>{scorePercent}%</span>
        </span>
      </Title>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px 16px 16px"
        }}
        onSubmit={onSubmit}
      >
        <Field label="Operator" name="operator">
          <ScorecardJobSelector
            value={state.operator}
            onChange={operator => setState({ operator })}
          />
        </Field>
        <Field label="Area" name="area">
          <ScorecardAreaSelector
            value={state.area}
            onChange={area => setState({ area })}
          />
        </Field>
        <Field label="Sow Care" name="sow-care">
          <ScorecardSliderInput
            value={state.sowCare}
            onChange={sowCare => setState({ sowCare })}
          />
        </Field>
        <Field label="Sow Care Comments" name="sow-care-comments">
          <MultilineTextInput
            value={state.sowCareComments}
            onChange={sowCareComments => setState({ sowCareComments })}
          />
        </Field>
        <Field label="Piglet Care" name="piglet-care">
          <ScorecardSliderInput
            value={state.pigletCare}
            onChange={pigletCare => setState({ pigletCare })}
          />
        </Field>
        <Field label="Piglet Care Comments" name="piglet-care-comments">
          <MultilineTextInput
            value={state.pigletCareComments}
            onChange={pigletCareComments => setState({ pigletCareComments })}
          />
        </Field>
        <Field label="Feed" name="feed">
          <ScorecardSliderInput
            value={state.feed}
            onChange={feed => setState({ feed })}
          />
        </Field>
        <Field label="Feed Comments" name="feed-comments">
          <MultilineTextInput
            value={state.feedComments}
            onChange={feedComments => setState({ feedComments })}
          />
        </Field>
        <Field label="Water" name="water">
          <ScorecardSliderInput
            value={state.water}
            onChange={water => setState({ water })}
          />
        </Field>
        <Field label="Water Comments" name="water-comments">
          <MultilineTextInput
            value={state.waterComments}
            onChange={waterComments => setState({ waterComments })}
          />
        </Field>
        <Field label="Crate" name="crate">
          <ScorecardSliderInput
            value={state.crate}
            onChange={crate => setState({ crate })}
          />
        </Field>
        <Field label="Crate Comments" name="crate-comments">
          <MultilineTextInput
            value={state.crateComments}
            onChange={crateComments => setState({ crateComments })}
          />
        </Field>
        <Field label="General Room" name="gen-room">
          <ScorecardSliderInput
            value={state.generalRoom}
            onChange={generalRoom => setState({ generalRoom })}
          />
        </Field>
        <Field label="General Room Comments" name="gen-room-comments">
          <MultilineTextInput
            value={state.generalRoomComments}
            onChange={generalRoomComments => setState({ generalRoomComments })}
          />
        </Field>
        <Button
          type="submit"
          css={{
            marginTop: 44
          }}
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </View>
  );
};

export default ScorecardView;
