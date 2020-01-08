const { ApolloServer } = require("apollo-server");
const dns = require("dns");
// const database = require("./database");
const service = require("./service");

// const typeDefs = `

//     type Item {
//         id: Int
//         type: String
//         description: String
//     }

//     type Query {
//         prefixes: [Item]
//         sufixes: [Item]
//     }

// `;

const typeDefs = `

    type Item {
        id: Int
        type: String
        description: String
    }

    type Domain {
        name: String
        extension: String
		checkout: String
		available: Boolean
	}

    type Query {
        items (type: String): [Item]
    }

    input ItemInput {
        type: String
        description: String
    }
    
    type Mutation {
        saveItem (item: ItemInput): Item
        deleteItem (id: Int): Boolean
        generateDomains: [Domain]
        generateDomain (name: String): [Domain]
    }

`;

// em generateDomains: [Domain] retornar um array de Domain acima!

// const prefixos = "prefixos";
// const sufixos = "sufixos";

// const items = []

// const items = [
//     { id: 1, type: prefixos, description: "Air" },
//     { id: 2, type: prefixos, description: "Jet" },
//     { id: 3, type: prefixos, description: "Flight" },
//     { id: 4, type: sufixos, description: "Hub" },
//     { id: 5, type: sufixos, description: "Station" },
//     { id: 6, type: sufixos, description: "Mart" },
// ]

// const resolvers = {
//     Query: {
//         prefixes() {
//             return items.filter(item => item.type === "prefix");
//         },
//         sufixes() {
//             return items.filter(item => item.type === "sufix");
//         }
//     }
// }

const isDomainAvailable = function (url) {
	return new Promise(function (resolve, reject) {
		dns.resolve(url, function (error) {
			if (error) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
};

const resolvers = {
    Query: {
        // o type é passado pelo frontend
        async items(_, args) {
            // const items = await database.execute("select * from item where type = $1", [args.type]);
            const items = await service.getItemsByType(args.type);
            return items;
            // return items.filter(item => item.type === args.type);
            // return items.filter(item => item.type === "prefix");
        }
    },
    Mutation: {
        async saveItem(_, args) {
            const item = args.item;
            // item.id = Math.floor(Math.random() * 1000);
            // items.push(item);

            // aqui é feito um destructure para obter apenas o 1° elemento
            const [newItem] = await service.saveItem(item);
			return newItem;
            return item;
        },
        async deleteItem(_, args) {
            const id = args.id;
            // const item = items.find(item => item.id === id);
            // if (!item) return false;
            // items.splice(items.indexOf(item), 1);
            await service.deleteItem(id);
            return true;
        },
        // como existe o await dentro da função, é necessário marcar a função como async
        async generateDomains() {
            // console.log("generateDomains");
            const domains = [];
            // const items = await database.execute("select * from item");
            const items = await service.getItems();
			for (const prefix of items.filter(item => item.type === "prefixos")) {
				for (const suffix of items.filter(item => item.type === "sufixos")) {
					const name = prefix.description + suffix.description;
					const url = name.toLowerCase();
					const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
					const available = await isDomainAvailable(`${url}.com.br`);
					domains.push({
						name,
						checkout,
						available
					});
				}
			}
			return domains;
        },
        async generateDomain(_, args) {
            const name = args.name;
			const domains = [];
			const extensions = [".com.br", ".com", ".net", ".org"];
			for (const extension of extensions) {
				const url = name.toLowerCase();
				const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=${extension}`;
				const available = await isDomainAvailable(`${url}${extension}`);
				domains.push({
					name,
					extension,
					checkout,
					available
				});
			}
			return domains;
		}
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen();