import express from "express";
import fs from 'fs';
import path from "path"
import { start } from "repl";
import {fileURLToPath} from "url";
import renderApp from "./dist/server/ServerApp.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT ||  3001

const html = fs.readFileSync(path.resolve(__dirname, "./dist/client/index.html")).toString();

const parts = html.split("not rendered")

const app = express()
app.use("/assets", express.static(path.resolve(__dirname, "./dist/client/assets")))

app.use((req,res)=>{
  res.write(parts[0])

  const stream = renderApp(req.url, {
    onShellReady(){
      //if it is the crawler do nothing here
      stream.pipe(res)
      //node data type streams
      //res and react stream are connected to each other 

    },
    onShellError(){
      //error handling/ logging
    },
    onAllReady(){
      //if its crawler do stream.pipe(res) here 
      //last thing to write
      res.write(parts[1])
      res.end()

    },
    onError(err){
      console.log(err)
    }

  })
})

app.listen(PORT)

