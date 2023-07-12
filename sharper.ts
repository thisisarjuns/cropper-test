import sharp from 'sharp';
import fs from 'fs';

const buf = fs.readFileSync('./image-highest.jpg');

const box_height =  998
const box_width =  960
const box_x_top =  1956
const box_y_top =  405
console.time('start');
sharp(buf).extract({
  left: box_x_top,
  top: box_y_top,
  width: box_width,
  height: box_height
}).toFile('./newone2.jpg', (err, info) => {
  console.timeEnd('start');
  console.log('err :>> ', err);
  console.log('info :>> ', info);
});