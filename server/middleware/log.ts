import { consola } from "consola"
//Prints message to console when a new request is made
export default defineEventHandler((event) => {
    consola.log('New request: ' + getRequestURL(event))
  })

  //Switching to consola for logging management 
  //"log requests both to the api and page requests, and log any errors that are caught."