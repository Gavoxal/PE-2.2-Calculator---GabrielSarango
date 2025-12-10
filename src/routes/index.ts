// Import the framework and instantiate it
import Fastify from 'fastify'
import { calculatorRouter } from './calculator.routes'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'


//inicializar 
const fastify = Fastify({
    logger: true
})

fastify.register(swagger, { 
    openapi: {
        info: {
            title: 'Servidor MSP para calcular operaciones basicas',
            description: 'Servicio para calcular operaciones basicas usando MCP',
            version: '1.0.0',
        },
        // Cambié 'Server' a 'servers' (minúscula) que es la propiedad correcta en OpenAPI.
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'servidor de desarrollo'
            }
        ],
        tags: [{ name: 'calculator', description: 'calculadora de operaciones' }],
    }
})


fastify.register(swaggerUi, { 
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
    }
})

// Declare a route
fastify.get('/', async (request, reply) => {
    return {message: 'MCP Server corriendo' }
})

//declarar rutas
fastify.register(calculatorRouter)

const start = async() =>{
    try {
        await fastify.listen({ port: 3000 })
        console.log("sesion")
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}



start()