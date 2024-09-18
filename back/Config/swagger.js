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
                url: 'https://backtaskhive1-vqh14r8m.b4a.run/api',
            },
        ],
        
     
    },
    apis: ['./Routes/*.js', './Controllers/*.js'],
};

const specs = swaggerJsDoc(options);

export { swaggerUI, specs };