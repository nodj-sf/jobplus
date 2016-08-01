import React from 'react';

const JobListItem = ({job}) => {
  return (
        <li>
          <h3>{job.title}</h3>
        </li>
         );
}

export default JobListItem;