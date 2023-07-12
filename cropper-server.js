
const express = require( 'express');
const app = express()
const port = 3000
const Jimp = require('jimp');
const sharp = require('sharp');
const fs = require('fs');
const buf1 = fs.readFileSync('./image-highest.jpg');

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

function sharper(buf){
  return new Promise((resolve, reject) => {
    const box_height =  998
    const box_width =  960
    const box_x_top =  1956
    const box_y_top =  405
    sharp(buf).extract({
      left: box_x_top,
      top: box_y_top,
      width: box_width,
      height: box_height
    }).toFile('./newone2.jpg', (err, info) => {
      if(err){
        return reject(err);
      }
      resolve(info);
    });
  });
}
app.get('/jimp', (_req, res) => {
  cropper(buf1).then(() => {
    console.log('buf success')
    return res.status(200).send('done');
  }).catch((err) => {
    console.log('err :>> ', err);
    return res.status(500).send('error');
  });
});

app.get('/sharp', (_req, res) => {
  sharper(buf1).then(() => {
    console.log('buf success')
    return res.status(200).send('done');
  }).catch((err) => {
    console.log('err :>> ', err);
    return res.status(500).send('error');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})