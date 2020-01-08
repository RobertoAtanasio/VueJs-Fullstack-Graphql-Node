const database = require("./database");

// obs: o database.execute retorna sempre um array!

exports.getItemsByType = function (type) {
	return database.execute("select * from item where type = $1", [type]);
};

exports.getItems = function () {
	return database.execute("select * from item");
};

exports.saveItem = function (item) {
    // o parâmetro returning * faz com que o comando retorne o conteúdo do insert
    return database
        .execute(
            "insert into item (type, description) values ($1, $2) returning *", 
            [item.type, item.description]);
};

exports.deleteItem = function (id) {
	return database.execute("delete from item where id = $1", [id]);
};