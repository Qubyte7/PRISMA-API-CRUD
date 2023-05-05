import { type } from "os"
import {db} from "../utils/db.server"

type Author ={
    id: number;
    firstName:string;
    lastName:string;
    // createdAt: Date;
}
export const listAuthors = async ():Promise<Author[]> =>{//The promise you are seeing is because the function isan async
       return db.author.findMany({
        select:{
            id:true,
            firstName:true,
            lastName:true,
            // createdAt:true
        }
       })
}

export const getAuthor = async (id:number):Promise<Author | null> =>{
    return   db.author.findUnique({
        where:{
            id,//this is the same as id :id,
        },
    })
}

export const createAuthor = async (author: Omit<Author ,"id">):Promise <Author> =>{//omit Omits the id in the Author
    const {firstName,lastName} = author
    return db.author.create({
        data:{
            firstName,
            lastName,
        },select:{
            id:true,
            firstName:true,
            lastName:true,
        }
    })
}
//UpDATING AN AUTHOR
export const updateAuthor = async(author : Omit <Author, "id">, id:number):Promise <Author> => {
    const {firstName,lastName} = author;
    return db.author.update({
        where:{
            id,//remember that is the same as saying id : id,
        },
        data:{
            firstName,//means that firstname = firstname
            lastName,
        },
        select:{
            id:true,
            firstName:true,
            lastName:true,
        }
    })
}
//Deleting  author
export const deleteAuthor = async (id:number):Promise<void> => {
    await db.author.delete({
        where:{
            id,
        }
    })
}










