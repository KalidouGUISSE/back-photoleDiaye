import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Plateforme d\'Annonces',
            version: '1.0.0',
            description: 'API REST pour une plateforme de publication et modération d\'annonces',
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3000',
                description: 'Serveur de développement',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/modules/*/routes/*.routes.ts'], // Chemins vers les fichiers de routes
};
const specs = swaggerJSDoc(options);
export { swaggerUi, specs };
//# sourceMappingURL=swagger.js.map