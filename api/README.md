## Code Structure
`controller` folder responsible the operation with mysql using ORM library `Sequelize`  
Use `sequelize-cli` to create and migrate with database. `models` folder is to define
the data model using sequelize with Configurator Model specify in configurator.js
`graphql/schema.js` is to specify the schema and resolver for graphql

### Run the Project
`$ docker-compose build`
`$ docker-compose up`

use [http://localhost:5000](http://localhost:5000) to connect API server.

### Stop
`$ docker-compose down`




