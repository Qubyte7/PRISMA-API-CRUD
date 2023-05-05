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
authorRouter.post("/", body("firstName").isString(), body("lastName").isString(),async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});//checks if there is an validation error
    }
    try{
        const author = req.body;
        const newAuthor = await AuthorService.createAuthor(author)
        return res.status(201).json(newAuthor)
    }catch(error:any){
        return  res.status(500).json(error.message);
    }
})
//Updating  an author
authorRouter.put("/update/:id",body("firstName").isString(),body("lastName").isString(),async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});//checks if there is an validation error
    }
    const id:number = parseInt(req.params.id,10);//turning the id into an integer that would be order wise be  a string using base 10
    try{
        const author = req.body
        const updateAuthor = await AuthorService.updateAuthor(author,id);
        return res.status(200).json(updateAuthor)

    }catch(error:any){
        return res.status(500).json(error.message);
    }

})

//delete an Author

authorRouter.delete("/delete/:id", async(req:Request,res:Response)=>{
    const id: number = parseInt(req.params.id,10);
    try{
        await AuthorService.deleteAuthor(id)
        return res.status(204).json("Author has been successfully deleted")
   
    }catch(error:any){
        return res.status(500).json(error.message);
    }





})






















































