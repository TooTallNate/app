/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { View, Title } from "../components/styled";
import SliderInput from "../components/ui/SliderInput";
import {
  usePostFarrowingBackendScorecardMutation,
  useFarrowingBackendScorecardQuery
} from "../graphql";
import TextInput from "../components/ui/TextInput";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import { useFlash } from "../contexts/flash";
import FullPageSpinner from "../components/FullPageSpinner";
import tw from "tailwind.macro";
import { useForm, OnSubmit } from "react-hook-form";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldErrors from "../components/ui/FormFieldErrors";
import FormSubmit from "../components/ui/FormSubmit";
import TypeaheadInput from "../components/ui/TypeaheadInput";
import { useEffect } from "react";

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
  const { data, loading } = useFarrowingBackendScorecardQuery();
  const [post] = usePostFarrowingBackendScorecardMutation();
  const { setMessage } = useFlash();
  const { watch, setValue } = formContext;

  const { crate, feed, generalRoom, pigletCare, sowCare, water, area } = watch([
    "sowCare",
    "pigletCare",
    "feed",
    "water",
    "crate",
    "generalRoom",
    "area"
  ]);

  const totalScore =
    (crate || 0) +
    (feed || 0) +
    (generalRoom || 0) +
    (pigletCare || 0) +
    (sowCare || 0) +
    (water || 0);
  const scorePercent = ((100 * totalScore) / 60).toFixed(1);

  useEffect(() => {
    const selectedArea =
      data &&
      area &&
      data.farrowingBackendScorecard.areas.find(
        ({ number }) => number === area
      );
    if (selectedArea) {
      setValue("operator", selectedArea.personResponsible);
    } else {
      setValue("operator", "");
    }
  }, [area, data, setValue]);

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
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

  return loading || !data ? (
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
          name="area"
          rules={{ required: "The area field is required." }}
        >
          <FormFieldLabel>Area</FormFieldLabel>
          <FormFieldInput>
            <TypeaheadInput
              items={data.farrowingBackendScorecard.areas.map(area => ({
                value: area.number,
                title: area.description
              }))}
            />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="operator"
          rules={{ required: "The operator field is required." }}
        >
          <FormFieldLabel>Operator</FormFieldLabel>
          <FormFieldInput>
            <TextInput />
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
          name="generalRoom"
          rules={{ required: "The generalRom field is required." }}
        >
          <FormFieldLabel>General Room</FormFieldLabel>
          <FormFieldInput>
            <ScorecardSliderInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField name="generalRoomComments">
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
