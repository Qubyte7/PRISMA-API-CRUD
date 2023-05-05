import express from "express";
import  type {Request,Response} from "express"
import {body, validationResult} from "express-validator"
import * as BookService from"./book.service"
import { isDate } from "util/types";

export const bookRouter = express.Router();
//Get list all the books
bookRouter.get("/",async(req:Request,res:Response)=>{
    try{
        const books =await BookService.listBooks();
        return res.status(200).json(books)
    }catch(error:any){
        return res.status(500).json(error.message)
    }
})

//GET A BOOK BASED ON id
bookRouter.get('/:id',async(req:Request,res:Response)=>{
    const id : number = parseInt(req.params.id,10);
    try{
        const book =await BookService.getBook(id)
        if(book){
            return res.status(200).json(book)
        }
    }catch(error:any){
        return res.status(500).json(error.message);
    }
});
//POSTING A BOOK
bookRouter.post("/",body("title").isString(),
                    body("authorId").isInt(), 
                    body("datePublished").isDate().toDate(),
                    body("isFiction").isBoolean(),
        async(req:Request,res:Response) =>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors : errors.array()})
            }
        try{
             const book = req.body
             const newBook = await BookService.createBook(book)
             return res.status(201).json(newBook)  
        }catch(error:any){
            return res.status(500).json(error.message)
        }
        }                       
)
//Update Book
bookRouter.put("/update/:id",body("title").isString(),
                    body("authorId").isInt(), 
                    body("datePublished").isDate().toDate(),
                    body("isFiction").isBoolean(),
        async(req:Request,res:Response) =>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors : errors.array()})
            }
            const id:number = parseInt(req.params.id,10)
        try{
             const book = req.body
             const updatedBook = await BookService.updateBook(book,id)
             return res.status(201).json(updatedBook)  
        }catch(error:any){
            return res.status(500).json(error.message)
        }
        }                       
)
//delete book
bookRouter.delete("/delete/:id",async(req:Request,res:Response) =>{
    const id:number = parseInt(req.params.id,10);
     try{
        await BookService.deleteBook(id)
        return res.status(204).json("Book succesfully deleted")
     }catch(error:any){
        return res.status(500).json(error.message)
    }




})












