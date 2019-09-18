/** @jsx jsx */
import { jsx } from "@emotion/core";
import TypeaheadInput from "./ui/TypeaheadInput";
import FormLabel from "./ui/FormLabel";
import { Fragment, useMemo } from "react";
import { useJobs } from "../service";

interface JobSelectorProps {
  title: string;
  value?: string;
  onChange?: (job: string) => void;
}

const JobSelector: React.FC<JobSelectorProps> = ({
  title,
  value,
  onChange
}) => {
  const { jobs } = useJobs();

  const items = useMemo(
    () => jobs.map(job => ({ value: job.number, title: job.number })),
    [jobs]
  );

  return (
    <Fragment>
      <FormLabel id="group-label">{title}</FormLabel>
      <TypeaheadInput
        labelId="group-label"
        items={items}
        value={value}
        onChange={onChange}
      />
    </Fragment>
  );
};

export default JobSelector;
