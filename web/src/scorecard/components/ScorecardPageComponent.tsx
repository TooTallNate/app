import React, { useEffect } from "react";
import ScorecardYesNo, {
  isComplete as isYesNoComplete
} from "./ScorecardYesNo";
import ScorecardLivestockJob, {
  isComplete as isLivestockJobComplete
} from "./ScorecardLivestockJob";
import ScorecardCaretaker, {
  isComplete as isCaretakerComplete
} from "./ScorecardCaretaker";
import ScorecardSupervisor, {
  isComplete as isSupervisorComplete
} from "./ScorecardSupervisor";
import ScorecardScores, {
  isComplete as isScoresComplete
} from "./ScorecardScores";
import ScorecardHealthInput, {
  isComplete as isHealthInputComplete
} from "./ScorecardHealthInput";
import ScorecardWeeksOnFeed, {
  isComplete as isWeeksOnFeedComplete
} from "./ScorecardWeeksOnFeed";
import ScorecardMortality, {
  isComplete as isMortalityComplete
} from "./ScorecardMortality";
import ScorecardPostingDate, {
  isComplete as isPostingDateComplete
} from "./ScorecardPostingDate";
import ScorecardTargetTemp, {
  isComplete as isTargetTempComplete
} from "./ScorecardTargetTemp";
import ScorecardTempInput, {
  isComplete as isTempComplete
} from "./ScorecardTemp";
import ScorecardPassFail, {
  isComplete as isPassFailComplete
} from "./ScorecardPassFail";
import { FormValue } from "../contexts/scorecard";
import ScorecardRangeInput, {
  isComplete as isRangeComplete
} from "./ScorecardRange";
import ScorecardSliderInput, {
  isComplete as isSliderComplete
} from "./ScorecardSlider";
import ScorecardSlider from "./ScorecardSlider";

export interface ScorecardPageComponentProps {
  code: string;
  label: string;
  id: string;
}

const ScorecardPageComponent: React.FC<ScorecardPageComponentProps> = ({
  code,
  ...props
}) => {
  const codeArray = code.split("-");
  const codeMap = {
    title: codeArray[0],
    min: parseInt(codeArray[1]),
    max: parseInt(codeArray[2]),
    step: parseInt(codeArray[3] || "1")
  };

  if (codeMap.title === "RANGE") {
    return (
      <ScorecardRangeInput {...props} min={codeMap.min} max={codeMap.max} />
    );
  } else if (codeMap.title === "SLIDER") {
    return (
      <ScorecardSliderInput
        {...props}
        min={codeMap.min}
        max={codeMap.max}
        step={codeMap.step}
      />
    );
  } else {
    switch (code) {
      case "YN":
        return <ScorecardYesNo {...props} />;
      case "JOB":
        return <ScorecardLivestockJob {...props} />;
      case "CARETAKER":
        return <ScorecardCaretaker {...props} />;
      case "SUPERVISOR":
        return <ScorecardSupervisor {...props} />;
      case "SCORE5":
        return <ScorecardScores {...props} min={0} max={5} step={1} />;
      case "SCORE10":
        return <ScorecardScores {...props} min={0} max={10} step={1} />;
      case "HEALTH":
        return <ScorecardHealthInput {...props} min={0} max={100} />;
      case "WEEKSONFEED":
        return <ScorecardWeeksOnFeed {...props} />;
      case "MORTALITY":
        return <ScorecardMortality {...props} />;
      case "POSTDATE":
        return <ScorecardPostingDate {...props} />;
      case "TARGETTEMP":
        return <ScorecardTargetTemp {...props} />;
      case "TEMP":
        return <ScorecardTempInput {...props} />;
      case "PASSFAIL":
        return <ScorecardPassFail {...props} />;
      default:
        return null;
    }
  }
};

const isCompleteMap: { [code: string]: (values: FormValue) => boolean } = {
  // Anytihng not here but in the switch up there needs to be added
  YN: isYesNoComplete,
  JOB: isLivestockJobComplete,
  CARETAKER: isCaretakerComplete,
  SUPERVISOR: isSupervisorComplete,
  SCORE5: isScoresComplete,
  SCORE10: isScoresComplete,
  HEALTH: isHealthInputComplete,
  WEEKSONFEED: isWeeksOnFeedComplete,
  MORTALITY: isMortalityComplete,
  POSTDATE: isPostingDateComplete,
  TARGETTEMP: isTargetTempComplete,
  TEMP: isTempComplete,
  PASSFAIL: isPassFailComplete,
  RANGE: isRangeComplete
};

export const isElementComplete = (code: string, values: FormValue) => {
  const fn = isCompleteMap[code];
  return !!fn && fn(values);
};

export default ScorecardPageComponent;
