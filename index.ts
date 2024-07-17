import { Queue } from 'bullmq';
import { connection } from './src/connection.ts';
import express  from 'express';
const app = express();

app.use(express.json());

const myQueue = new Queue('foo', { connection });


app.post('/api/addone',async(req, res) => {
  try {
    const task = req.body;
    await myQueue.add("emails",task);
    res.json({message:"successfully added a task to the queue"});
  } catch (error) {
    console.log("error adding one iteam" + error);
    res.json({message:"error adding one iteam"});
  }
});

app.post('/api/addMany',async(req, res) =>{
  try {
    const tasks = req.body;
    const promises = tasks.map((task:any)=>{
      return new Promise(async(resolve,reject)=>{
        try {
          const data = await myQueue.add("emails",task);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    });
    Promise.all(promises).then((data)=>{
      console.log(data);
      res.json({message:"successfully added many tasks to the queue"});
    }).catch((error)=>{
      throw new Error(error);
    });
    res.json({message:"successfully added many tasks to the queue"});
  } catch (error) {
    console.log("error adding many iteam" + error);
    res.json({message:"error adding many iteam"});
  }
});

app.listen(process.env.PORT,()=>{
  console.log("listening on port 3000")
});