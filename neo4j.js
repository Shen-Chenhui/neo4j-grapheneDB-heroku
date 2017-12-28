require('dotenv').config()
const neo4j = require('neo4j-driver').v1
const username = process.env.NEO4J_USERNAME || 'neo4j'
const password = process.env.NEO4J_PASSWORD || 'neo4j'
const databaseUrl = process.env.GRAPHENEDB_BOLT_URL || process.env.NEO4J_DATABASE_URL || 'bolt://localhost:7687/'
const driver = neo4j.driver(databaseUrl, neo4j.auth.basic(username, password))
const session = driver.session()
console.log(password,databaseUrl)
module.exports = {
  driver,
  session
}
