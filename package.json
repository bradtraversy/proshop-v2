{
  "name": "proshop2",
  "version": "2.0.0",
  "type": "module",
  "description": "Ecommerce application built with the MERN stack",
  "main": "server.js",
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "data:import": "node backend/seeder",
    "data:destroy": "node backend/seeder -d",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
    "generate-toc": "markdown-toc -i readme.md"
  },
  "author": "Brad Traversy",
  "license": "MIT",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "colors": "^1.4.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.1",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "concurrently": "^7.6.0",
    "markdown-toc": "^1.2.0",
    "nodemon": "^2.0.21"
  }
}
