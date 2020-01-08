import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import { baseApiUrl } from "@/global.js";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        items: {
            prefixos: [],
            sufixos: []
        },
        domains: []
    },
    mutations: {
        // a mutation recebe sempre o state
        addItem(state, payload) {
            const { item, newItem } = payload;  // receb os dois parâmetros
            state.items[item.type].push(newItem);
        },
        deleteItem(state, payload) {
            const { item } = payload;
            state.items[item.type].splice(state.items[item.type].indexOf(item), 1);
        },
        setItems(state, payload) {
            const { type, items } = payload;
            state.items[type] = items;
        },
        setDomains(state, payload) {
            const { domains } = payload;
            state.domains = domains;
        }
    },
    actions: {
        // payload contém os parâmetros
        async addItem(context, payload) {
            const item = payload;
            axios({
                url: baseApiUrl,
                method: "post",
                data: {
                    query: `
                        mutation ($item: ItemInput) {
                        newItem: saveItem(item: $item) {
                            id
                            type
                            description
                        }
                        } 
                    `,
                    variables: {
                        item
                    }
                }
            }).then(response => {
                const query = response.data;
                const newItem = query.data.newItem;
                // context.state.items[item.type].push(newItem);    // interagindo com o state da store
                context.commit("addItem", { item, newItem });   // invoca a mutation
                context.dispatch("generateDomains");            // invoca a action
            });
        },
        async deleteItem(context, payload) {
            // recebe o objeto definido em this.$emit("excluirItem", { type, item }); no
            // componente AppitemList.vue
            const item = payload.item;
            axios({
                url: baseApiUrl,
                method: "post",
                data: {
                    query: `
						mutation ($id: Int) {
							deleted: deleteItem(id: $id)
						}
					`,
                    variables: {
                        id: item.id
                    }
                }
            }).then(() => {
                // context.state.items[item.type].splice(
                //     context.state.items[item.type].indexOf(item), 1);
                context.commit("deleteItem", { item });
                context.dispatch("generateDomains");
            });
        },
        async getItems(context, payload) {
            const type = payload;
            return axios({
                url: baseApiUrl,
                method: "post",
                data: {
                    query: `
						query ($type: String) {
							itens: items (type: $type) {
								id
								type
								description
							}
						}
					`,
                    variables: {
                        type
                    }
                }
            }).then(response => {
                const query = response.data;
                // context.state.items[type] = query.data.itens;
                context.commit("setItems", { type, items: query.data.itens });
            });
        },
        async generateDomains(context) {
            axios({
                url: baseApiUrl,
                method: "post",
                data: {
                    query: `
						mutation {
							domains: generateDomains {
								name
								checkout
								available
							}
						}
					`
                }
            }).then((response) => {
                const query = response.data;
                // context.state.domains = query.data.domains;
                context.commit("setDomains", { domains: query.data.domains });
            });
        }
    }
});

Promise.all([
    store.dispatch("getItems", "prefixos"),
    store.dispatch("getItems", "sufixos"),
]).then(() => {
    store.dispatch("generateDomains");
});

export default store