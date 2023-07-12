import {Worker} from 'worker_threads';
import express from 'express';
const app = express()
const port = 3000
import Jimp from 'jimp';
import sharp from 'sharp';
import fs from 'fs';
const buf1 = fs.readFileSync('./image-highest.jpg');

function cropper(buf){  
  return new Promise((resolve, reject) => {
    console.time('jimp parsing');
    Jimp.read(buf)
      .then(image => {
        console.timeEnd('jimp parsing');
        const box_height =  998
        const box_width =  960
        const box_x_top =  1956
        const box_y_top =  405
        console.time('jimp cropping');
        image.crop(
          box_x_top,
          box_y_top,
          box_width, 
          box_height,
        );
        console.timeEnd('jimp cropping');
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

const jimper = {
  count: 0
};
app.get('/jimp', (_req, res) => {
  cropper(buf1).then(() => {
    console.log('buf success');
    console.log(++jimper.count);
    return res.status(200).send('done');
  }).catch((err) => {
    console.log('err :>> ', err);
    return res.status(500).send('error');
  });
});

app.get('/jimp-thread', (req, res) => {
  const worker = new Worker('./jimp-thread.ts', {workerData: {src: buf1}});
  worker.on('message', (msg) => {
    console.log('msg :>> ', msg);    
  });
  
  worker.on('error', (err) => {
    console.error(err);
    return res.status(500).send('error');
  });
  
  worker.on('exit', (code) => {
    if (code !== 0){
      console.error(new Error(`Worker stopped with exit code ${code}`));
      return res.status(500).send('error');
    }
    console.log('done');
    return res.status(200).send('done');
    
  });
});

app.get('/sharp', (_req, res) => {
  sharper(buf1).then(() => {
    console.log('buf success')
    console.log(++jimper.count);
    return res.status(200).send('done');
  }).catch((err) => {
    console.log('err :>> ', err);
    return res.status(500).send('error');
  });
});

app.get('/sharp-thread', (req, res) => {
  const worker = new Worker('./sharp-thread.ts', {workerData: {src: buf1}});
  worker.on('message', (msg) => {
    console.log('msg :>> ', msg);    
  });
  
  worker.on('error', (err) => {
    console.error(err);
    return res.status(500).send('error');
  });
  
  worker.on('exit', (code) => {
    if (code !== 0){
      console.error(new Error(`Worker stopped with exit code ${code}`));
      return res.status(500).send('error');
    }
    console.log('done');
    return res.status(200).send('done');
    
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})