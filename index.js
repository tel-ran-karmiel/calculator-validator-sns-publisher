const zod = require("zod")
function handler(event) {
   const CalcSechema = zod.object({
    op1:zod.number(),
    op2:zod.number(),
    operation: zod.string()
   })
   try {
    const data = CalcSechema.parse(JSON.parse(event.body))
    return response(200, event.body)
   } catch (error) {
      return response (400, error.message)
   }
  
}
handler()
function response(code, body){
    return {
        "status": code,
        "body": body
    }
}
module.exports = {
    handler
}