import Jimp from 'jimp';
import { workerData, Worker, threadId} from 'worker_threads';
console.log('threadId :>> ', threadId);
let {src} = workerData
src = Buffer.from(src);
Jimp.read(src)
  .then(image => {
    
    const box_height =  998
    const box_width =  960
    const box_x_top =  1956
    const box_y_top =  405

    image.crop(
      box_x_top,
      box_y_top,
      box_width, 
      box_height,
    );
    image.write('./newone2.jpg');
  })
  .catch(err => {
    console.error(err);
  });
