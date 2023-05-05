import express from "express";
import  type {Request,Response} from "express"
import {body, validationResult} from "express-validator"
import * as BookService from"./book.service"

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

















