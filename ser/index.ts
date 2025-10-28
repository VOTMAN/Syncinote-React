import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!\n')
})

app.post('/api/create', async (c) => {
  console.log(c)
  const val = await c.req.json()
  return c.text("hello " + val.name)
  
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
