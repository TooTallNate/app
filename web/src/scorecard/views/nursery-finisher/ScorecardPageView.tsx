import React, { useEffect, useLayoutEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Title from "../../../common/components/view/ViewTitle";
import View from "../../../common/components/view/View";
import ViewHeader from "../../../common/components/view/ViewHeader";
import BackButton from "../../../common/components/view/BackButton";
import Form from "../../../common/components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormSubmit from "../../../common/components/form/FormSubmit";
import ViewContent from "../../../common/components/view/ViewContent";
import { useGrowFinish } from "../../contexts/growFinish";
import ScorecardPageComponent from "../../components/ScorecardPageComponent";
import Button from "../../../common/components/input/Button";
import HorizontalSpacer from "../../../common/components/layout/HorizontalSpacer";
import { useFlash } from "../../../common/contexts/flash";
import { useSaveScorecardMutation } from "../../graphql";

const ScorecardPageView: React.FC = () => {
  const params = useParams<{ page: string; job: string }>();
  const history = useHistory();

  const { formConfig, setJob, saveProgress, job, loadingJob } = useGrowFinish();
  const formContext = useForm();
  const { setMessage } = useFlash();
  const { getValues } = formContext;

  // const [save] = useSaveScorecardMutation();

  // Refresh job on page reload.
  useEffect(() => {
    setJob(params.job);
  }, [params.job, setJob]);

  const pageNumber = parseInt(params.page) - 1;
  const pageCount = formConfig.length;
  const pageConfig = formConfig[pageNumber];

  const onSubmit: OnSubmit<Record<string, any>> = async data => {
    await saveProgress(data);
    if (pageNumber + 1 < pageCount) {
      history.push(`/scorecard/${params.job}/page/${pageNumber + 2}`);
    } else {
      history.push(`/scorecard/${params.job}/submit`);
    }
  };

  const onSave = async () => {
    try {
      saveProgress(getValues());
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
        <Title>{(pageConfig && pageConfig.title) || "Page"}</Title>
        <Link to={`/scorecard/${params.job}/submit`}>Submit</Link>
      </ViewHeader>
      <ViewContent loading={loadingJob}>
        {job && (
          <Form context={formContext} onSubmit={onSubmit}>
            {pageConfig &&
              pageConfig.elements.map(element => (
                <ScorecardPageComponent key={element.id} {...element} />
              ))}
            <div className="flex-grow" />
            <div className="flex">
              <Button className="w-full" type="button" onClick={onSave}>
                Save
              </Button>
              <HorizontalSpacer />
              <FormSubmit>Continue</FormSubmit>
            </div>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ScorecardPageView;
