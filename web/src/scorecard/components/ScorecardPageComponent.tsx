import React from "react";
import ScorecardYesNo from "./ScorecardYesNo";
import ScorecardPigJob from "./ScorecardPigJob";
import ScorecardCaretaker from "./ScorecardCaretaker";
import ScorecardSupervisor from "./ScorecardSupervisor";
import ScorecardScores from "./ScorecardScores";
import ScorecardNumberInput from "./ScorecardNumberInput";

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
    default:
      return null;
  }
};

export default ScorecardPageComponent;
