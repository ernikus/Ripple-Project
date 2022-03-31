function get_url(username, password, db_name) {
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);
    db_name = encodeURIComponent(db_name);
    return `mongodb://${username}:${password}@localhost:27017/${db_name}?authMechanism=DEFAULT&authSource=admin`;
}

module.exports = get_url;
