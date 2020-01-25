/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { View, Title } from "../components/styled";
import ScorecardJobSelector from "../components/ScorecardJobSelector";
import SliderInput from "../components/ui/SliderInput";
import { useEffect } from "react";
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
import { useForm, OnSubmit } from "react-hook-form";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldErrors from "../components/ui/FormFieldErrors";
import FormSubmit from "../components/ui/FormSubmit";

interface FormData {
  operator: Job;
  area: string;
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

const ScorecardSliderInput: React.FC<
  React.ComponentProps<typeof SliderInput>
> = props => <SliderInput {...props} min={0} max={10} step={1} labelStep={1} />;

const ScorecardView: React.FC<RouteComponentProps> = ({ history }) => {
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
  const { user } = useAuth();
  const [
    {
      defaults: { scorecardJob: defaultOperator },
      loading: loadingDefaults
    },
    setDefaults
  ] = useDefaults();
  const [postJobJournal] = usePostJobJournalMutation();
  const { setMessage } = useFlash();
  const { watch, setValue, getValues } = formContext;

  const scores = watch([
    "sowCare",
    "pigletCare",
    "feed",
    "water",
    "crate",
    "generalRoom"
  ]);
  const totalScore =
    (scores.crate || 0) +
    (scores.feed || 0) +
    (scores.generalRoom || 0) +
    (scores.pigletCare || 0) +
    (scores.sowCare || 0) +
    (scores.water || 0);
  const scorePercent = ((100 * totalScore) / 60).toFixed(1);

  // Set job with default only if not already set.
  useEffect(() => {
    if (!getValues().operator && defaultOperator) {
      setValue("operator", defaultOperator);
    }
  }, [defaultOperator, getValues, setValue]);

  const onSubmit: OnSubmit<FormData> = async data => {
    function postScore(type: string, score: number, comments?: string) {
      if (!user) {
        return;
      }
      return postJobJournal({
        variables: {
          input: {
            template: JobJournalTemplate.Job,
            batch: JobJournalBatch.FarrowBE,
            date: new Date(),
            document: getDocumentNumber("FBE", user.username),
            job: data.operator.number,
            location: data.operator.site,
            task: type,
            number: data.area,
            workType: "FARROW-BE",
            quantity: score,
            unitPrice: 1.667,
            description: comments
          }
        }
      });
    }
    try {
      await postScore("SOW CARE", data.sowCare, data.sowCareComments);
      await postScore("PIGLET CARE", data.pigletCare, data.pigletCareComments);
      await postScore("SOW FEED", data.feed, data.feedComments);
      await postScore("WATER", data.water, data.waterComments);
      await postScore("CRATE", data.crate, data.crateComments);
      await postScore("GEN ROOM", data.generalRoom, data.generalRoomComments);
      if (data.operator !== defaultOperator) {
        await setDefaults({ scorecardJob: data.operator });
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
      <Form context={formContext} onSubmit={onSubmit}>
        <FormField
          name="operator"
          rules={{ required: "The operator field is required." }}
        >
          <FormFieldLabel>Operator</FormFieldLabel>
          <FormFieldInput>
            <ScorecardJobSelector />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="area"
          rules={{ required: "The area field is required." }}
        >
          <FormFieldLabel>Area</FormFieldLabel>
          <FormFieldInput>
            <ScorecardAreaSelector />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="sowCare"
          rules={{ required: "The sow care field is required." }}
        >
          <FormFieldLabel>Sow Care</FormFieldLabel>
          <FormFieldInput>
            <ScorecardSliderInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField name="sowCareComments">
          <FormFieldLabel>Comments</FormFieldLabel>
          <FormFieldInput>
            <MultilineTextInput maxLength={50} />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="pigletCare"
          rules={{ required: "The piglet care field is required." }}
        >
          <FormFieldLabel>PigletCare</FormFieldLabel>
          <FormFieldInput>
            <ScorecardSliderInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField name="pigletCareComments">
          <FormFieldLabel>Comments</FormFieldLabel>
          <FormFieldInput>
            <MultilineTextInput maxLength={50} />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="feed"
          rules={{ required: "The feed field is required." }}
        >
          <FormFieldLabel>Feed</FormFieldLabel>
          <FormFieldInput>
            <ScorecardSliderInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField name="feedComments">
          <FormFieldLabel>Comments</FormFieldLabel>
          <FormFieldInput>
            <MultilineTextInput maxLength={50} />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="water"
          rules={{ required: "The water field is required." }}
        >
          <FormFieldLabel>Water</FormFieldLabel>
          <FormFieldInput>
            <ScorecardSliderInput />
          </FormFieldInput>
        </FormField>
        <FormField name="waterComments">
          <FormFieldLabel>Comments</FormFieldLabel>
          <FormFieldInput>
            <MultilineTextInput maxLength={50} />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="crate"
          rules={{ required: "The crate field is required." }}
        >
          <FormFieldLabel>Crate</FormFieldLabel>
          <FormFieldInput>
            <ScorecardSliderInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField name="crateComments">
          <FormFieldLabel>Comments</FormFieldLabel>
          <FormFieldInput>
            <MultilineTextInput maxLength={50} />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="genRoom"
          rules={{ required: "The generalRom field is required." }}
        >
          <FormFieldLabel>General Room</FormFieldLabel>
          <FormFieldInput>
            <ScorecardSliderInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField name="genRoomComments">
          <FormFieldLabel>Comments</FormFieldLabel>
          <FormFieldInput>
            <MultilineTextInput maxLength={50} />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormSubmit />
      </Form>
    </View>
  );
};

export default ScorecardView;
