import React from "react";
import ScorecardYesNo from "./ScorecardYesNo";
import ScorecardPigJob from "./ScorecardPigJob";
import ScorecardCaretaker from "./ScorecardCaretaker";
import ScorecardSupervisor from "./ScorecardSupervisor";

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
    default:
      return null;
  }
};

export default ScorecardPageComponent;
