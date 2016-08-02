export function selectJob(job) {
  console.log('A job has been selected:', job.title);
  return {
    type: 'JOB_SELECTED',
    payload: job
  }
}