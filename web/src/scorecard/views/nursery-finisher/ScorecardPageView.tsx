import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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

const ScorecardPageView: React.FC = () => {
  const params = useParams<{ page: string; job: string }>();
  const history = useHistory();

  const {
    formConfig,
    formState,
    setJob,
    saveProgress,
    job,
    loadingJob
  } = useGrowFinish();
  const formContext = useForm();

  // Refresh context on page reload
  useEffect(() => {
    setJob(params.job);
  }, [params.job, setJob]);

  // useEffect(() => {
  //   formContext.setValue(Object.entries(formState));
  // }, [formContext, formState]);

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

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>{(pageConfig && pageConfig.title) || "Page"}</Title>
      </ViewHeader>
      <ViewContent loading={loadingJob}>
        {job && (
          <Form context={formContext} onSubmit={onSubmit}>
            {pageConfig &&
              pageConfig.elements.map(element => (
                <ScorecardPageComponent key={element.id} {...element} />
              ))}
            <div className="flex-grow" />
            <FormSubmit>Continue</FormSubmit>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ScorecardPageView;
