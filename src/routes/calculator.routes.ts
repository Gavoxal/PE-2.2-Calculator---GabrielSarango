import { FastifyInstance } from 'fastify'
import calculatortolls from '../tools/calculator.tools.json'

interface Calculator {
    operation: 'add' | 'subtract' | 'multiply' | 'divide',
    a: number;
    b: number;
}

export const calculatorRouter = (fastify: FastifyInstance) => {
    fastify.post<{Body: Calculator}>(
        '/tools/calculator',
        {
            schema:{ 
                description: `
# Ejecutar operaciones aritméticas

Realiza cálculos matemáticos básicos entre dos números. Soporta cuatro operaciones:
- **add**: Suma dos números
- **subtract**: Resta el segundo número del primero
- **multiply**: Multiplica dos números
- **divide**: Divide el primer número por el segundo

## Validaciones
- Ambos números deben ser valores numéricos válidos
- La operación debe ser una de las cuatro soportadas
- En división, el divisor (b) no puede ser cero

## Casos de uso
- Cálculos matemáticos en aplicaciones cliente
- Procesamiento de operaciones en batch
- Validación de lógica de cálculo
- Integración con sistemas de facturación o inventario
                `,
                summary: 'Realizar operación aritmética',
                tags: ['calculator'],
                body: {
                    ...calculatortolls.inputSchema,
                    examples: [
                        {
                            operation: 'add',
                            a: 10,
                            b: 5
                        },
                        {
                            operation: 'subtract',
                            a: 20,
                            b: 8
                        },
                        {
                            operation: 'multiply',
                            a: 7,
                            b: 6
                        },
                        {
                            operation: 'divide',
                            a: 100,
                            b: 4
                        }
                    ]
                },
                response: {
                    200: {
                        description: 'Operación ejecutada exitosamente',
                        type: 'object',
                        properties: {
                            result: { 
                                type: 'number',
                                description: 'Resultado de la operación aritmética'
                            },
                            operation: { 
                                type: 'string',
                                description: 'Tipo de operación realizada',
                                enum: ['add', 'subtract', 'multiply', 'divide']
                            }
                        },
                        examples: [
                            {
                                description: 'Ejemplo de suma: 10 + 5',
                                value: {
                                    result: 15,
                                    operation: 'add'
                                }
                            },
                            {
                                description: 'Ejemplo de resta: 20 - 8',
                                value: {
                                    result: 12,
                                    operation: 'subtract'
                                }
                            },
                            {
                                description: 'Ejemplo de multiplicación: 7 × 6',
                                value: {
                                    result: 42,
                                    operation: 'multiply'
                                }
                            },
                            {
                                description: 'Ejemplo de división: 100 ÷ 4',
                                value: {
                                    result: 25,
                                    operation: 'divide'
                                }
                            }
                        ]
                    },
                    400: {
                        description: 'Error en la solicitud - parámetros inválidos o división por cero',
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
                        },
                        examples: [
                            {
                                description: 'Error: División por cero',
                                value: {
                                    message: 'No se puede dividir por 0',
                                    error: 'Bad Request',
                                    statusCode: 400
                                }
                            },
                            {
                                description: 'Error: Operación inválida',
                                value: {
                                    message: 'Operación no soportada',
                                    error: 'Bad Request',
                                    statusCode: 400
                                }
                            },
                            {
                                description: 'Error: Parámetros faltantes',
                                value: {
                                    message: 'El campo "operation" es requerido',
                                    error: 'Bad Request',
                                    statusCode: 400
                                }
                            }
                        ]
                    },
                    500: {
                        description: 'Error interno del servidor',
                        type: 'object',
                        properties: {
                            message: { 
                                type: 'string',
                                description: 'Descripción del error interno'
                            },
                            error: {
                                type: 'string',
                                description: 'Tipo de error'
                            },
                            statusCode: {
                                type: 'number',
                                description: 'Código de estado HTTP'
                            }
                        },
                        examples: [
                            {
                                description: 'Error interno del servidor',
                                value: {
                                    message: 'Error inesperado al procesar la operación',
                                    error: 'Internal Server Error',
                                    statusCode: 500
                                }
                            }
                        ]
                    }
                }
            }
        },
        async (request, reply) => {
            try {
                const {operation, a, b} = request.body;
                let result: number = 0;
                
                switch (operation){
                    case 'add':
                        result = a + b;
                        break;
                    case 'subtract':
                        result = a - b;
                        break;
                    case 'multiply':
                        result = a * b;
                        break;
                    case 'divide':
                        if (b === 0){
                            return reply.status(400).send({
                                message: 'No se puede dividir por 0',
                                error: 'Bad Request',
                                statusCode: 400
                            })
                        }
                        result = a / b;
                        break;
                    
                    default:
                        return reply.status(400).send({
                            message: 'Operación no soportada',
                            error: 'Bad Request',
                            statusCode: 400
                        })
                }
                
                return {result, operation};
            } catch (error) {
                fastify.log.error(error);
                return reply.status(500).send({
                    message: 'Error inesperado al procesar la operación',
                    error: 'Internal Server Error',
                    statusCode: 500
                })
            }
        }
    )
};