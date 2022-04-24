// keep in mind:
// - below URL paramateres are necessary to connect
//   - authMechanism=DEFAULT
//   - authSource=admin (try to authenticate in the default mongo database: admin)
// - the name of the mongo server in URL must be the name of the database service defined in docker-compose.yml or localhost (if db and backend are not started together)
function get_url(username, password, db_name) {
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);
    db_name = encodeURIComponent(db_name);
    return `mongodb://${username}:${password}@mongodb_container:27017/${db_name}?authMechanism=DEFAULT&authSource=admin`;
}

module.exports = get_url;
