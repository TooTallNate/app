import React from "react";
import { useGrowFinish } from "../../contexts/growFinish";
import ViewContent from "../../../common/components/view/ViewContent";
import View from "../../../common/components/view/View";
import Title from "../../../common/components/view/ViewTitle";
import ViewHeader from "../../../common/components/view/ViewHeader";
import BackButton from "../../../common/components/view/BackButton";
import Button from "../../../common/components/input/Button";
import Stack from "../../../common/components/layout/Stack";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { isElementComplete } from "../../components/ScorecardPageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HorizontalSpacer from "../../../common/components/layout/HorizontalSpacer";

const ScorecardSubmitView: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const { formConfig, formState, submit, saveProgress } = useGrowFinish();

  const onSave = async () => {
    await saveProgress();
    history.push("/");
  };

  const onSubmit = async () => {
    await submit();
    history.push("/");
  };

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Submit</Title>
      </ViewHeader>
      <ViewContent>
        <Stack className="min-h-full">
          <table>
            <thead className="sr-only">
              <tr>
                <th>Page</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>
              {formConfig.map((page, i) => {
                const isComplete = page.elements.every(element =>
                  isElementComplete(element.code, formState[element.id] || {})
                );
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
                          isComplete ? "text-green-600" : "text-red-600"
                        }
                        icon={isComplete ? "check" : "times"}
                        aria-hidden
                      />
                      <span className="sr-only">{isComplete.toString()}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex-grow" />
          <div className="flex">
            <Button className="w-full" type="button" onClick={onSave}>
              Save
            </Button>
            <HorizontalSpacer />
            <Button className="w-full" type="button" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </Stack>
      </ViewContent>
    </View>
  );
};

export default ScorecardSubmitView;
