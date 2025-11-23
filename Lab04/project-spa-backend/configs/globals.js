require("dotenv").config();
// Global configurations object contains Application Level variables such as:
// client secrets, passwords, connection strings, and misc flags
const configurations = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    },
     clientServer: 'http://localhost:3000/projects'
}
module.exports = configurations;
