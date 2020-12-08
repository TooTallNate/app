import React from "react";
import ScorecardYesNo, {
  isComplete as isYesNoComplete
} from "./ScorecardYesNo";
import ScorecardPigJob, {
  isComplete as isPigJobComplete
} from "./ScorecardPigJob";
import ScorecardCaretaker, {
  isComplete as isCaretakerComplete
} from "./ScorecardCaretaker";
import ScorecardSupervisor, {
  isComplete as isSupervisorComplete
} from "./ScorecardSupervisor";
import ScorecardScores, {
  isComplete as isScoresComplete
} from "./ScorecardScores";
import ScorecardNumberInput, {
  isComplete as isNumperComplete
} from "./ScorecardNumberInput";
import { FormValue } from "../contexts/growFinish";
import ScorecardWeeksOnFeed from "./ScorecardWeeksOnFeed";
import ScorecardMortalityToDate from "./ScorecardMortality";
import ScorecardMortality from "./ScorecardMortality";

export interface ScorecardPageComponentProps {
  code: string;
  label: string;
  id: string;
}

const ScorecardPageComponent: React.FC<ScorecardPageComponentProps> = ({
  code,
  ...props
}) => {
  switch (code) {
    case "YN":
      return <ScorecardYesNo {...props} />;
    case "JOB":
      return <ScorecardPigJob {...props} />;
    case "CARETAKER":
      return <ScorecardCaretaker {...props} />;
    case "SUPERVISOR":
      return <ScorecardSupervisor {...props} />;
    case "SCORE5":
      return <ScorecardScores {...props} min={1} max={5} step={1} />;
    case "SCORE10":
      return <ScorecardScores {...props} min={1} max={10} step={1} />;
    case "HEALTH":
      return <ScorecardNumberInput {...props} min={0} max={100} />;
    case "TEMP":
      return <ScorecardNumberInput {...props} min={-30} max={110} />;
    case "WEEKSONFEED":
      return <ScorecardWeeksOnFeed {...props} />;
    case "MORTALITY":
      return <ScorecardMortality {...props} />;
    default:
      return null;
  }
};

const isCompleteMap: { [code: string]: (values: FormValue) => boolean } = {
  YN: isYesNoComplete,
  JOB: isPigJobComplete,
  CARETAKER: isCaretakerComplete,
  SUPERVISOR: isSupervisorComplete,
  SCORE5: isScoresComplete,
  SCORE10: isScoresComplete,
  HEALTH: isNumperComplete,
  TEMP: isNumperComplete
};

export const isElementComplete = (code: string, values: FormValue) => {
  const fn = isCompleteMap[code];
  return !!fn && fn(values);
};

export default ScorecardPageComponent;
