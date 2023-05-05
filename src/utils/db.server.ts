import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global{
    var __db:PrismaClient | undefined;
}

if(!global.__db){
    global.__db = new PrismaClient();
}
db=global.__db;
//this is a way of creating our prisma client that will establish a connection to our database so that whenever we mae changes on our application
//it update to our database


export{db};