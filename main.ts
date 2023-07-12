import Jimp from 'jimp';
import fs from 'fs';

const buf = fs.readFileSync('./image-highest.jpg');
const buf2 = fs.readFileSync('./image-highest.jpg');
const buf3 = fs.readFileSync('./image-highest.jpg');
const buf4 = fs.readFileSync('./image-highest.jpg');
const buf5 = fs.readFileSync('./image-highest.jpg');

function cropper(buf){
  return new Promise((resolve, reject) => {
    Jimp.read(buf)
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
        resolve('done')
      })
      .catch(err => {
        reject(err)
      }
    );
  });
}

cropper(buf).then((res) => {
  console.log('buf success')
});
cropper(buf2).then((res) => {
  console.log('buf2 success')
});
cropper(buf3).then((res) => {
  console.log('buf3 success')
});
cropper(buf4).then((res) => {
  console.log('buf4 success')
});
cropper(buf5).then(() => {
  console.log('buf5 success')
});

console.log('jey 1');
