import {Worker} from 'worker_threads';
import fs from 'fs';

const buf = fs.readFileSync('./image-highest.jpg');
const buf2 = fs.readFileSync('./image-highest.jpg');
const buf3 = fs.readFileSync('./image-highest.jpg');
const buf4 = fs.readFileSync('./image-highest.jpg');
const buf5 = fs.readFileSync('./image-highest.jpg');

console.time('cropper');
console.time('cropper2');
console.time('cropper3');
console.time('cropper4');
console.time('cropper5');

const worker = new Worker('./worker-thread.ts', {workerData: {src: buf}});
const worker2 = new Worker('./worker-thread.ts', {workerData: {src: buf2}});
const worker3 = new Worker('./worker-thread.ts', {workerData: {src: buf3}});
const worker4 = new Worker('./worker-thread.ts', {workerData: {src: buf4}});
const worker5 = new Worker('./worker-thread.ts', {workerData: {src: buf5}});

worker.on('message', (msg) => {
  console.log('msg :>> ', msg);
});

worker.on('error', (err) => {
  console.error(err);
});

worker.on('exit', (code) => {
  if (code !== 0){
    console.error(new Error(`Worker stopped with exit code ${code}`));
  }
  console.timeEnd('cropper');
  
});
worker2.on('exit', (code) => {
  if (code !== 0){
    console.error(new Error(`Worker stopped with exit code ${code}`));
  }
  console.timeEnd('cropper2');
});
worker3.on('exit', (code) => {
  if (code !== 0){
    console.error(new Error(`Worker stopped with exit code ${code}`));
  }
  console.timeEnd('cropper3');
});
worker4.on('exit', (code) => {
  if (code !== 0){
    console.error(new Error(`Worker stopped with exit code ${code}`));
  }
  console.timeEnd('cropper4');
});
worker5.on('exit', (code) => {
  if (code !== 0){
    console.error(new Error(`Worker stopped with exit code ${code}`));
  }
  console.timeEnd('cropper5');
});
