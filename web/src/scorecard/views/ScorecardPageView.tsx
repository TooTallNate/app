import React, { useRef } from "react";
import { useHistory, useParams, Link, useRouteMatch } from "react-router-dom";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import Form from "../../common/components/form/Form";
import { useForm, OnSubmit } from "react-hook-form";
import FormSubmit from "../../common/components/form/FormSubmit";
import ViewContent from "../../common/components/view/ViewContent";
import { useScorecard } from "../contexts/scorecard";
import ScorecardPageComponent from "../components/ScorecardPageComponent";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import { useFlash } from "../../common/contexts/flash";

const ScorecardPageView: React.FC = () => {
  const submitAction = useRef<string | null>(null);
  const match = useRouteMatch();
  const params = useParams<{ page: string }>();
  const history = useHistory();

  const { formConfig, saveProgress, job, loadingJob } = useScorecard();
  const formContext = useForm();
  const { setMessage } = useFlash();

  const pageNumber = parseInt(params.page) - 1;
  const pageCount = formConfig.length;
  const pageConfig = formConfig[pageNumber];
  const { getValues } = formContext;

  const onSubmit: OnSubmit<Record<string, any>> = async data => {
    try {
      await saveProgress(data);
    } catch {
      setMessage({
        level: "error",
        message: "Error occurred while saving scorecard."
      });
      return;
    }

    switch (submitAction.current) {
      case "save":
        setMessage({
          message: "Entry saved successfully.",
          level: "success",
          timeout: 2000
        });
        history.push("/scorecard");
        break;
      case "back":
        if (pageNumber === 0) {
          history.push(match.path.replace(/\/[^/]+\/page\/:page/, ""));
        } else {
          history.push(match.path.replace(":page", `${pageNumber}`));
        }
        break;
      case "next":
        if (pageNumber + 1 < pageCount) {
          history.push(match.path.replace(":page", `${pageNumber + 2}`));
        } else {
          history.push(match.path.replace("page/:page", "submit"));
        }
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <ViewHeader>
        <Title>{(pageConfig && pageConfig.title) || "Page"}</Title>
        <Link
          to={match.path.replace("page/:page", "submit")}
          className="text-blue-700"
          onClick={async e => {
            e.stopPropagation();
            e.preventDefault();
            try {
              await saveProgress(getValues({ nest: true }));
            } catch {
              setMessage({
                level: "error",
                message: "Error occurred while saving scorecard."
              });
              return;
            }
            history.push(match.path.replace("page/:page", "submit"));
          }}
        >
          Summary
        </Link>
      </ViewHeader>
      <ViewContent loading={loadingJob}>
        {job && (
          <Form context={formContext} onSubmit={onSubmit} className="mb-12">
            {pageConfig &&
              pageConfig.elements.map(element => (
                <ScorecardPageComponent key={element.id} {...element} />
              ))}
            <div className="flex-grow" />
            <div className="flex absolute w-full p-4 left-0 bottom-0 bg-white">
              <FormSubmit onClick={() => (submitAction.current = "back")}>
                Back
              </FormSubmit>
              <HorizontalSpacer />
              <FormSubmit onClick={() => (submitAction.current = "save")}>
                Save
              </FormSubmit>
              <HorizontalSpacer />
              <FormSubmit onClick={() => (submitAction.current = "next")}>
                Continue
              </FormSubmit>
            </div>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ScorecardPageView;
