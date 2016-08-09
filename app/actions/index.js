const FETCH_JOBS = 'FETCH_JOBS';
const JOB_SELECTED = 'JOB_SELECTED';

export const fetchJobs = (jobData) => {
  console.log('Redux Action:', jobData);
  return {
    type: FETCH_JOBS,
    payload: jobData
  };
};

export const selectJob = (job) => {
  console.log('A job has been selected:', job);
  return {
    type: JOB_SELECTED,
    payload: job
  };
};
