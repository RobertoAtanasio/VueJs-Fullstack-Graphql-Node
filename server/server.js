const { ApolloServer } = require("apollo-server");
const dns = require("dns");

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
    }

`;

// em generateDomains: [Domain] retornar um array de Domain acima!

const prefixos = "prefixos";
const sufixos = "sufixos";

const items = [
    { id: 1, type: prefixos, description: "Air" },
    { id: 2, type: prefixos, description: "Jet" },
    { id: 3, type: prefixos, description: "Flight" },
    { id: 4, type: sufixos, description: "Hub" },
    { id: 5, type: sufixos, description: "Station" },
    { id: 6, type: sufixos, description: "Mart" },
]

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
        items(_, args) {
            // console.log(args);
            // o type é passado pelo frontend
            return items.filter(item => item.type === args.type);
            // return items.filter(item => item.type === "prefix");
        }
    },
    Mutation: {
        saveItem(_, args) {
            const item = args.item;
            item.id = Math.floor(Math.random() * 1000);
            items.push(item);
            return item;
        },
        deleteItem(_, args) {
            const id = args.id;
            const item = items.find(item => item.id === id);
            if (!item) return false;
            items.splice(items.indexOf(item), 1);
            return true;
        },
        // como existe o await dentro da função, é necessário marcar a função como async
        async generateDomains() {
            const domains = [];
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
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen();