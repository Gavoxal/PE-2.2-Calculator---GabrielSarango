// Import the framework and instantiate it
import Fastify from 'fastify'
import { calculatorRouter } from './routes/calculator.routes';
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'


//inicializar 
const fastify = Fastify({
    logger: true
})

fastify.register(swagger, { 
    openapi: {
        info: {
            title: 'MCP Calculator Server API',
            description: `
# Servidor MCP para Operaciones Aritméticas Básicas

Este servidor implementa el protocolo Model Context Protocol (MCP) para proporcionar 
capacidades de cálculo aritmético básico. Permite realizar operaciones de suma, resta, 
multiplicación y división de manera programática.

## Propósito

El MCP Calculator Server está diseñado para:
- Proporcionar operaciones aritméticas básicas de forma confiable y eficiente
- Servir como ejemplo de implementación de MCP Server
- Facilitar la integración de capacidades de cálculo en aplicaciones cliente
- Demostrar mejores prácticas en diseño y documentación de APIs

## Características

- **Operaciones soportadas**: suma, resta, multiplicación y división
- **Validación de entrada**: esquemas JSON estrictos para garantizar datos válidos
- **Manejo de errores**: respuestas claras para casos como división por cero
- **Documentación interactiva**: Swagger UI para pruebas y exploración

## Seguridad

En versiones futuras, este API implementará autenticación mediante API Key o Bearer Token.
Se recomienda usar HTTPS en producción y validar todas las entradas para prevenir 
ataques de Tool Poisoning.

### Mitigación de Tool Poisoning

El servidor implementa las siguientes medidas de seguridad:
- Validación estricta de esquemas de entrada usando JSON Schema
- Sanitización de parámetros antes del procesamiento
- Límites en los valores numéricos para prevenir overflow
- Rate limiting (a implementar en producción)
- Logging de todas las operaciones para auditoría
            `,
            version: '1.0.0',
            contact: {
                
               
            },
            license: {
                name: 'MIT',
                
            },
            
        },
        
        servers: [
            
        ],
        tags: [
            
        ],
        components: {
            securitySchemes: {
                apiKey: {
                    type: 'apiKey',
                    name: 'X-API-Key',
                    in: 'header',
                    description: `
**API Key Authentication**

Para usar este esquema de autenticación:
1. Obtén una API Key desde el portal de desarrolladores
2. Incluye la key en el header \`X-API-Key\` de cada petición
3. La API Key debe mantenerse confidencial y no compartirse

**Ejemplo de uso:**
\`\`\`
curl -H "X-API-Key: tu-api-key-aqui" \\
     -X POST http://localhost:3000/tools/calculator \\
     -H "Content-Type: application/json" \\
     -d '{"operation": "add", "a": 5, "b": 3}'
\`\`\`

**Nota:** Este esquema de seguridad está documentado para futuras implementaciones.
En la versión actual (v1.0.0), el servidor no requiere autenticación.
                    `
                },
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: `
**Bearer Token Authentication (JWT)**

Para usar este esquema de autenticación:
1. Autentícate en el endpoint \`/auth/login\` con tus credenciales
2. Recibe un JWT token en la respuesta
3. Incluye el token en el header \`Authorization\` con el formato: \`Bearer <token>\`

**Ejemplo de uso:**
\`\`\`
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
     -X POST http://localhost:3000/tools/calculator \\
     -H "Content-Type: application/json" \\
     -d '{"operation": "multiply", "a": 7, "b": 6}'
\`\`\`

**Expiración del token:** Los tokens expiran después de 24 horas.

**Nota:** Este esquema de seguridad está documentado para futuras implementaciones.
En la versión actual (v1.0.0), el servidor no requiere autenticación.
                    `
                },
                oauth2: {
                    type: 'oauth2',
                    description: `
**OAuth 2.0 Authentication**

Para aplicaciones empresariales que requieren delegación de acceso segura.

**Flujos soportados:**
- Authorization Code (recomendado para aplicaciones web)
- Client Credentials (para server-to-server)

**Scopes disponibles:**
- \`calculator:read\` - Permite realizar operaciones de cálculo
- \`calculator:admin\` - Acceso administrativo completo

**Nota:** Este esquema de seguridad está documentado para futuras implementaciones.
En la versión actual (v1.0.0), el servidor no requiere autenticación.
                    `,
                    flows: {
                        authorizationCode: {
                            authorizationUrl: 'https://auth.mcpcalculator.example.com/oauth/authorize',
                            tokenUrl: 'https://auth.mcpcalculator.example.com/oauth/token',
                            scopes: {
                                'calculator:read': 'Realizar operaciones de cálculo',
                                'calculator:admin': 'Acceso administrativo completo'
                            }
                        },
                        clientCredentials: {
                            tokenUrl: 'https://auth.mcpcalculator.example.com/oauth/token',
                            scopes: {
                                'calculator:read': 'Realizar operaciones de cálculo'
                            }
                        }
                    }
                }
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Descripción del error'
                        },
                        error: {
                            type: 'string',
                            description: 'Tipo de error'
                        },
                        statusCode: {
                            type: 'number',
                            description: 'Código de estado HTTP'
                        }
                    }
                },
                CalculatorResult: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'number',
                            description: 'Resultado de la operación aritmética'
                        },
                        operation: {
                            type: 'string',
                            enum: ['add', 'subtract', 'multiply', 'divide'],
                            description: 'Tipo de operación realizada'
                        }
                    }
                }
            }
        },
        security: [
            // Por defecto, no se requiere autenticación en v1.0.0
            // En futuras versiones, descomentar una de estas opciones:
            // { apiKey: [] },
            // { bearerAuth: [] },
            // { oauth2: ['calculator:read'] }
        ]
    }
})


fastify.register(swaggerUi, { 
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
        displayOperationId: true,
        displayRequestDuration: true,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        tryItOutEnabled: true
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
})

// Health check endpoint
fastify.get('/', {
    schema: {
        description: 'Endpoint de salud del servidor - verifica que el servicio esté funcionando correctamente',
        summary: 'Health check del servidor',
        tags: ['health'],
        response: {
            200: {
                description: 'El servidor está funcionando correctamente',
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
                    version: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' }
                },
                examples: [
                    {
                        description: 'Respuesta exitosa de health check',
                        value: {
                            message: 'MCP Server corriendo correctamente',
                            status: 'healthy',
                            version: '1.0.0',
                            timestamp: '2024-01-15T10:30:00.000Z'
                        }
                    }
                ]
            }
        }
    }
}, async (request, reply) => {
    return {
        message: 'MCP Server corriendo correctamente',
        status: 'healthy',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    }
})

//declarar rutas
fastify.register(calculatorRouter)

const start = async() => {
    try {
        await fastify.listen({ port: 3000 })
        console.log('🚀 MCP Calculator Server iniciado exitosamente')
        console.log('📚 Documentación disponible en: http://localhost:3000/docs')
        console.log('🏥 Health check disponible en: http://localhost:3000/')
        console.log('📖 Versión: 1.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()