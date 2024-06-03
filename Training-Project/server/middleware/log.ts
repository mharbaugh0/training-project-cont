//Prints message to console when a new request is made
export default defineEventHandler((event) => {
    console.log('New request: ' + getRequestURL(event))
  })
  