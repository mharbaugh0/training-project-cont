//Prints message to console when a new request is made
export default defineEventHandler((event) => {
    console.log('New request: ' + getRequestURL(event))
  })

  //Nuxt 3.0 doesn't support winston or pino yet so requests are logged at handlers
  //using Nuxt's existing structure
  