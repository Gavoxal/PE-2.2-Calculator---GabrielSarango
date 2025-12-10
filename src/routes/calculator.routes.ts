import { error } from 'console';
import { FastifyInstance } from 'fastify'
import calculatortolls from '../tools/calculator.tools.json'

interface Calculator {
    operation: 'add' | 'subtract' | 'multiply' | 'divide',
    a: number;
    b: number;


}

export const calculatorRouter = (fastify: FastifyInstance) => {
    fastify.post<{Body: Calculator}>(
        '/tools/calculator', //especificar ruta 
        
        {
            schema:{ 
                description: 'Ejecutar operaciones aritmeticas',
                tags: ['calculator'],
                body: calculatortolls.inputSchema,
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            result: { type: 'number' },
                            operation: { type: 'string' }
                        },
                    },
                    400: {
                        type: 'object',
                        properties: {
                            error: { type: 'string' }

                        },

                    },
                }
            }

        },
        
        (request, reply) => {
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
                    if (b == 0){
                        return reply.status(400).send({message: 'No se puede dividir por 0'})
                    }
                    result = a / b;
                    break;
                
                default:
                    

            }
            return {result, operation};
        }
    )
    

};




