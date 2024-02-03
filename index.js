import { log } from "node:console"
import { readFile } from "node:fs/promises"
import { createServer } from "node:http"
import { dirname,join } from "node:path"
import { fileURLToPath } from "node:url"
import { selectType } from "./selectExtention.js"


const filname = fileURLToPath(import.meta.url)
const dir = dirname(filname) 

createServer((req,res)=>{
    if(req.method === "GET" && req.url === "/"){
        (async () =>{
            try{
                const data = await readFile(join(dir,"/public/index.html"))
                res.writeHead(200,`Content-Type: text/html`) 
                res.end(data)
            }catch(err){
                log(err)
                res.writeHead(404,"Content-Type: text/html")
                res.end("<h1>404</h1>")
            }
        })()
    }else if(req.method === "GET"){
        (async ()=>{
            try{
                const fileType = String(req.url).split(".")
                const data = await readFile(join(dir,
                (fileType.length < 2)?`/public/${req.url}.html`:`/public/${req.url}`
                ))
                res.writeHead(200,`Content-Type: ${selectType(fileType[fileType.length-1])}`)
                res.end(data)
            }catch(err){
                log(err)
                res.writeHead(404,"Content-Type: text/html")
                res.end("<h1>404</h1>")
            }
        })()
    }else if(req.method === "POST"){
        fetch(req.url,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                title:"data",
            })
        }).then((res)=>res.json())
        
    }
    
}).listen(4000,()=>{log("Server Running")})