import {db} from "../utils/db.server"
import  type {Author}  from "../author/author.service";
import { type } from "os";

type BookRead = {
    id : number;
    title :string;
    datePublished:Date;
    isFiction:boolean;
    author : Author;
    // authorId:number
}
type BookWrite = {
    title: string;
    datePublished:Date;
    authorId:number;
    isFiction:boolean

}


//Get All books

export const listBooks = async():Promise<BookRead[]> =>{
    return db.book.findMany({
        select:{
            id:true,
            title:true,
            datePublished:true,
            isFiction:true,
             author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true
                }
             } 
        }
    })
}
//Get a Book
export const getBook = async (id:number):Promise<BookRead | null> =>{
    return db.book.findUnique({
        where:{
            id,
        },
        select:{
            id:true,
            title:true,
            isFiction:true,
            datePublished:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true
                }
            }
        }
    })
}

//Update Book
export const createBook = async (book : BookWrite):Promise<BookRead> =>{
    const {title,authorId,datePublished,isFiction} = book;
    const  parserDate: Date = new Date(datePublished);

     return db.book.create({
        data:{
            title,//rember this is as we can write title=title,
            authorId,
            isFiction,
            datePublished:parserDate,
        },
        select:{
            id:true,
            title:true,
            isFiction:true,
            datePublished:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true
                }
            }
        }
     })
}
//UPDATE A bok
export const updateBook = async (book: BookWrite,id:number):Promise<BookRead> =>{
    const{title, isFiction, datePublished,authorId} = book;
    return db.book.update({
        where:{
            id,
        },
        data:{
            title,
            isFiction,
            datePublished,
            authorId,
        },select:{
            id:true,
            title:true,
            isFiction:true,
            datePublished:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true
                }
            }
        }
    })
}
//DELETE A BOOk
export const deleteBook = async (id:number):Promise<void> =>{
    await db.book.delete({
        where:{
            id,
        }
    })
}






















