import process from 'node:process';
import fs from 'node:fs/promises';

const  argv = process.argv
const file = argv[2]

const rl = await fs.readFile(file);

const url = 'http://localhost:8000/upload'

const res = await fetch(url, {
  method: 'POST', 
  headers: { 'Content-Type': 'application/octet-stream' }, 
  body: rl 
})

console.log(await res.text());
