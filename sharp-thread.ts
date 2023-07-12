import { workerData, Worker, threadId} from 'worker_threads';
import sharp from 'sharp';

console.log('threadId :>> ', threadId);
let {src} = workerData
src = Buffer.from(src);
const box_height =  998
const box_width =  960
const box_x_top =  1956
const box_y_top =  405
sharp(src).extract({
  left: box_x_top,
  top: box_y_top,
  width: box_width,
  height: box_height
}).toFile('./newone2.jpg', (err, info) => {
  if(err){
    console.error(err);
    throw err;
  }
  return info;
});