import React from 'react';

const JobListItem = ({job}) => {
  return (
    <li className="jobLI">
      <h3>{job.title}</h3>
    </li>
  );
}

export default JobListItem;
