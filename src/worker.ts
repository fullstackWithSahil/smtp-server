//worker.js
import { connection } from './connection.js';
import { Worker } from 'bullmq';


function sendMail(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, 5000);
  });
}

const worker = new Worker('foo', async(job) => {
  const data=await sendMail();
  console.log(data);
  console.log(job.data);
},{ connection });

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
  if(!job){
    console.log("job not found");
    return;
  }
  console.error(`Job ${job.id} failed:`, err);
});
