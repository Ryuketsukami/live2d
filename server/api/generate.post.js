export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const response = await $fetch('/api/v1/generate', {
      method: 'POST',
      baseURL: 'http://localhost:8000',
      body
    })
    return response
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Generation failed'
    })
  }
})