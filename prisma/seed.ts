import { type } from "os"
import {db} from "../src/utils/db.server"

type Author={
    firstname:string;
    lastname:string;
};
type Book ={
    title:string;
    isFiction:boolean;
    datePublished: Date;
};

function getAuthors():Array<Author>{
    return[{
        firstname:"innocent",
        lastname:"Ettiene"
    },{
        firstname:"Michael",
        lastname:"Sabrina",
    },{
        firstname:"MIKE",
        lastname:"Hitesh",
    }]
}
//SEED
async function seed(){

    await Promise.all(
        getAuthors().map((author)=>{
            return db.author.create({
                data:{
                    firstName:author.firstname,
                    lastName:author.lastname
                }
            })
        })
    )
    const author = await db.author.findFirst({
        where:{
            firstName:"innocent",
        },
    });
  if(author){
    await Promise.all(
        getBooks().map((book)=>{
            const {title, isFiction, datePublished} = book;
            return db.book.create({
                data:{
                    title,
                    isFiction,
                    datePublished,
                    authorId: author.id,
                },
            })
        })
    )
  }
}
seed()




function getBooks():Array<Book>{
    return[{
        title:"Vampire System",
        isFiction:false,
        datePublished:new Date(),
    },{
        title:"Homo Deus",
        isFiction:false,
        datePublished: new Date(),
    },{
        title:"The Ugly Duckling",
        isFiction:true,
        datePublished:new Date(),
    }]
}



