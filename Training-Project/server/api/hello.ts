//When an event is received a "hello" object"
export default defineEventHandler((event) => {
    return {
      hello: 'world'
    }
  })
  