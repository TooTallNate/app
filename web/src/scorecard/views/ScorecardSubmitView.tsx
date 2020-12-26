import React, { useRef } from "react";
import { useScorecard } from "../contexts/scorecard";
import ViewContent from "../../common/components/view/ViewContent";
import View from "../../common/components/view/View";
import Title from "../../common/components/view/ViewTitle";
import ViewHeader from "../../common/components/view/ViewHeader";
import BackButton from "../../common/components/view/BackButton";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { isElementComplete } from "../components/ScorecardPageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import Form from "../../common/components/form/Form";
import FormSubmit from "../../common/components/form/FormSubmit";
import { useForm } from "react-hook-form";
import { useFlash } from "../../common/contexts/flash";

const ScorecardSubmitView: React.FC = () => {
  const submitAction = useRef<string | null>(null);
  const match = useRouteMatch();
  const history = useHistory();
  const formContext = useForm();
  const { addMessage, setMessage } = useFlash();

  const { formConfig, formState, submit } = useScorecard();

  const pages = formConfig.map((page, i) => ({
    ...page,
    isComplete: page.elements.every(element =>
      isElementComplete(element.code, formState[element.id] || {})
    )
  }));

  const canSubmit = pages.every(page => page.isComplete);

  const onSubmit = async () => {
    switch (submitAction.current) {
      case "back":
        history.push(match.path.replace("submit", `page/${formConfig.length}`));
        addMessage({
          level: "success",
          message: "Scorecard posted successully!",
          timeout: 3000
        });
        break;
      case "save":
        history.push("/");
        break;
      default:
        try {
          await submit();
          history.push("/");
        } catch {
          setMessage({
            level: "error",
            message: "An error occurred submitting scorecard"
          });
        }
        break;
    }
  };

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Summary</Title>
      </ViewHeader>
      <ViewContent>
        <Form context={formContext} onSubmit={onSubmit} className="mb-12">
          <table>
            <thead className="sr-only">
              <tr>
                <th>Page</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, i) => {
                return (
                  <tr
                    key={i}
                    className="h-12 border-t border-b border-gray-500"
                  >
                    <td>
                      <Link to={match.path.replace("submit", `page/${i + 1}`)}>
                        {page.title ||
                          (page.elements[0] && page.elements[0].label)}
                      </Link>
                    </td>
                    <td className="text-center">
                      <FontAwesomeIcon
                        className={
                          page.isComplete ? "text-green-600" : "text-red-600"
                        }
                        icon={page.isComplete ? "check" : "times"}
                        aria-hidden
                      />
                      <span className="sr-only">
                        {page.isComplete.toString()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
            <FormSubmit
              onClick={() => (submitAction.current = "submit")}
              disabled={!canSubmit}
            >
              Submit
            </FormSubmit>
          </div>
        </Form>
      </ViewContent>
    </View>
  );
};

export default ScorecardSubmitView;
