import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        
     
    },
    apis: ['./Routes/*.js', './Controllers/*.js'],
};

const specs = swaggerJsDoc(options);

export { swaggerUI, specs };