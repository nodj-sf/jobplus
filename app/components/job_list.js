import React from 'react';
import JobListItem from './job_list_item';

const JobList = (props) => {
  const jobItems = props.jobs.map((job) => {
    return <JobListItem key={job.id} job={job} />; 
  });
  
  return (
    <ul>
      {jobItems}
    </ul>
    );
};

export default JobList;
