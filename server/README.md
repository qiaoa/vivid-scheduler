# Server

Run `npm start` to launch server

## Database setup

Install MongoDB. Start up an instance of MongoDB that is running on mongodb://localhost:27017/ (MongoDB's default port). Create a database called vivid-scheduler.

## Initial database setup instructions:
1. Install MongoDB Community Server https://www.mongodb.com/try/download/community
2. In terminal, run `mongod`
3. In another terminal, run `mongo`. This should start up the mongo shell and tell you the port number it is running on (by default it is mongodb:///localhost:27017)
4. Run `use vivid-scheduler` to create and use the vivid-scheduler database
5. Optional - to add to the database, run `db.projects.insert({...})` e.g. `db.projects.insert({"title": "LaLisa Lisa", "startDate": new Date()})`