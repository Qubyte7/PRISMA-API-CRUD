import express from "express"
import type { Request, Response} from "express"
import {body,validationResult} from "express-validator"

import * as AuthorService from "./author.service"

export const authorRouter = express.Router();
//GET ALL AUHTOR
 authorRouter.get("/",async(req:Request, res:Response)=>{
    try{
       const authors  = await AuthorService.listAuthors()
       return res.status(200).json(authors)
    }catch(error:any){
           return res.status(500).json(error.message);
    }
})
//Get an author
authorRouter.get("/:id",async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id,10);
    try{
        const author = await AuthorService.getAuthor(id)
        if(author ){
            return res.status(200).json(author)
        }else{
            return res.status(404).json("Author could not be found")
        }
    }catch(error:any){
          return res.status(500).json(error.message);
    }
})
//POST:create an Author
//Params: first name, lastname
authorRouter.post("/", body("firstName"))

































































