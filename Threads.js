


const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();




function doRequest(){
    https.request('https://www.google.com', res =>{
        res.on('data', () =>{});
        res.on('end', ()=>{
            console.log('Web:', Date.now()- start);
        });

    }).end();
}



function doHash(){
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=>{
        console.log('Hash:', Date.now()- start);
    })
}



function readFile(){
    fs.readFile('Threads.js', 'utf8', ()=>{
    console.log('FS:', Date.now()- start)
    })
}


//The request is done first because its not using a threadpool
//but rather OS abilities to implement the request.
doRequest();


//All of the below are using threadpool to implement its functions

//readFile(){
//  gettings stats by accessing HD -> returning stats, then reading file, 
//  returns readings back to nodeapp, then shows it to us.
//  while it waits for results to come back, node starts implementing
//  1 doHash function.
// THAT is the reason why the operation starts with web, hash, and fs
//  The thread doesnt wait for fs task to complete, it rather implements
// another task that is on the line
//}
readFile();

//the rest of the hashes implement as normal in the threadpool 1 by 1

doHash();
doHash();
doHash();
doHash();

//WE CAN INCREASE AND DECREASE THREADPOOL SIZE

/*

INCREASE => process.env.UV_THREADPOOL_SIZE = 5;
if we increase the size then 1 thread will be assigned to readFunction

IF we decrease it, then FS will be done at the end as it requires a waiting period



*/