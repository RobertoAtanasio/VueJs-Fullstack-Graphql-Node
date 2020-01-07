<template>
  <div>
    <div id="domain">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <AppItemList
              title="Prefixos"
              :items="items.prefixos"
              type="prefixos"
              v-on:adicionarItem="addItem"
              v-on:excluirItem="deleteItem"
            ></AppItemList>
          </div>
          <div class="col-md">
            <AppItemList
              title="Sufixos"
              :items="items.sufixos"
              type="sufixos"
              v-on:adicionarItem="addItem"
              v-on:excluirItem="deleteItem"
            ></AppItemList>
          </div>
        </div>
        <br />
        <h5>
          Domínios
          <span class="badge badge-info">{{ domains.length }}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="domain in domains" :key="domain.name">
                <div class="row">
                  <div class="col-md-6">
                    {{ domain.name }}
                  </div>
                  <div class="col-md-3">
                    <span class="badge badge-info" :class="{'badge-danger': !domain.available}">
                      {{ (domain.available) ? "Disponível" : "Não disponível" }} 
                    </span>
                  </div>
                  <div class="col-md-3 text-right">
                    <a class="btn btn-info" v-bind:href="domain.checkout" target="_blank">
                      <span class="fa fa-shopping-cart"></span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios/dist/axios";
import AppItemList from "./AppItemList";
import { baseApiUrl } from "@/global.js";

export default {
  name: "DomainList",
  components: { AppItemList },
  data() {
    return {
      items: {
        prefixos: [],
        sufixos: []
      },
      domains: []   // uma vez que foi retirada a computed domains() teremos que defini-la aqui
      // prefixos: [],
      // sufixos: []
      // prefixos: ["Air", "Jet", "Flight"],
      // sufixos: ["Hub", "Station", "Mart"]
    };
  },
  methods: {
    addItem(item) {
      // this.items.prefixos.push(prefixo);

      // o item tem o seguinte formato agora (ver em AppitemList.vue):
      // {
      //   type,
      //   description
      // }

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
      }).then( response => {
        // this.getPrefixos();
        // Da forma abaixo evita uma nova chamada ao servidor!
        const query = response.data;
        const newItem = query.data.newItem;
        // // eslint-disable-next-line
        // console.log(newPrefixo);
        this.items[item.type].push(newItem);
        this.generateDomains();
      });
    },
    // addPrefixo(prefixo) {
    //   // this.items.prefixos.push(prefixo);
    //   axios({
    //     url: baseApiUrl,
    //     method: "post",
    //     data: {
    //       query: `
    //         mutation ($item: ItemInput) {
    //           newPrefixo: saveItem(item: $item) {
    //             id
    //             type
    //             description
    //           }
    //         } 
    //       `,
    //       variables: {
    //         item: {
    //           type: "prefixos",
    //           description: prefixo
    //         }
    //       }
    //     }
    //   }).then( response => {
    //     // this.getPrefixos();
    //     // Da forma abaixo evita uma nova chamada ao servidor!
    //     const query = response.data;
    //     const newPrefixo = query.data.newPrefixo;
    //     // // eslint-disable-next-line
    //     // console.log(newPrefixo);
    //     this.items.prefixos.push(newPrefixo);
    //   });
    // },
    // addSufixo(sufixo) {
    //   // this.items.sufixos.push(sufixo);
    //   axios({
    //     url: baseApiUrl,
    //     method: "post",
    //     data: {
    //       query: `
    //         mutation ($item: ItemInput) {
    //           newSufixo: saveItem(item: $item) {
    //             id
    //             type
    //             description
    //           }
    //         } 
    //       `,
    //       variables: {
    //         item: {
    //           type: "sufixos",
    //           description: sufixo
    //         }
    //       }
    //     }
    //   }).then( response => {
    //     const query = response.data;
    //     const newSufixo = query.data.newSufixo;
    //     this.items.sufixos.push(newSufixo);
    //   });
    // },
    deleteItem(item) {
      // this.items.prefixos.splice(this.prefixos.indexOf(prefixo), 1);

      // o deleteItem retorna um Boolean, logo não tem objeto associado.
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
            id: item.item.id
          }
        }
      }).then( () => {
        // this.getPrefixos();
        // this.getItems(item.type);
        this.items[item.type].splice(
          this.items[item.type].indexOf(item), 1);
        this.generateDomains();
      });
    },
    // deletePrefixo(prefixo) {
    //   // this.items.prefixos.splice(this.prefixos.indexOf(prefixo), 1);

    //   // o deleteItem retorna um Boolean, logo não tem objeto associado.
    //   axios({
    //     url: baseApiUrl,
    //     method: "post",
    //     data: {
    //       query: `
    //         mutation ($id: Int) {
    //           deleted: deleteItem(id: $id) 
    //         } 
    //       `,
    //       variables: {
    //         id: prefixo.id
    //       }
    //     }
    //   }).then( () => {
    //     // this.getPrefixos();
    //     this.getItems("prefixos");
    //   });
    // },
    // deleteSufixo(sufixo) {
    //   // this.sufixos.splice(this.sufixos.indexOf(sufixo), 1);

    //   // o deleteItem retorna um Boolean, logo não tem objeto associado.
    //   axios({
    //     url: baseApiUrl,
    //     method: "post",
    //     data: {
    //       query: `
    //         mutation ($id: Int) {
    //           deleted: deleteItem(id: $id) 
    //         } 
    //       `,
    //       variables: {
    //         id: sufixo.id
    //       }
    //     }
    //   }).then( () => {
    //     // this.getSufixos();
    //     this.getItems("sufixos");
    //   });
    // },
    getItems(type) {
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
        this.items[type] = query.data.itens;
        // this.items.prefixos = query.data.prefixes;
        // this.prefixos = query.data.prefixes.map(prefix => prefix.description);
        // // eslint-disable-next-line
        // console.log(query.data.itens);
      });
    },
    // getPrefixos() {
    //   axios({
    //     url: baseApiUrl,
    //     method: "post",
    //     data: {
    //       query: `
    //       {
    //         prefixes: items (type: "prefix") {
    //           id
    //           type
    //           description
    //         }
    //       }
    //     `
    //     }
    //   }).then(response => {
    //     const query = response.data;
    //     this.items.prefixos = query.data.prefixes;
    //     // this.prefixos = query.data.prefixes.map(prefix => prefix.description);
    //     // // eslint-disable-next-line
    //     // console.log(query.data);
    //   });
    // },
    // getSufixos() {
    //   axios({
    //     url: baseApiUrl,
    //     method: "post",
    //     data: {
    //       query: `
    //         {
    //           sufixes: items (type: "sufix") {
    //             id
    //             type
    //             description
    //           }
    //         }
    //       `
    //     }
    //   }).then(response => {
    //     const query = response.data;
    //     this.items.sufixos = query.data.sufixes;
    //   });
    // }
    generateDomains() {
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
			}).then( response => {
				const query = response.data;
				this.domains = query.data.domains;
			});

      // --- código movido para o servidor (server.js) em server
      // // sempre que prefixos ou sufixos forem alterados, será invocado essa função.
      // this.domains = [];
      // for (const prefix of this.items.prefixos) {
      //   for (const sufix of this.items.sufixos) {
      //     const name = prefix.description + sufix.description;
      //     const url = name.toLowerCase();
      //     const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
      //     this.domains.push({
      //       name,
      //       checkout
      //     });
      //   }
      // }
    }
  },
  // computed: {
    // domains() {
      // // sempre que prefixos ou sufixos forem alterados, será invocado essa função.
      // const domains = [];
      // for (const prefix of this.items.prefixos) {
      //   for (const sufix of this.items.sufixos) {
      //     const name = prefix.description + sufix.description;
      //     const url = name.toLowerCase();
      //     const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
      //     domains.push({
      //       name,
      //       checkout
      //     });
      //   }
      // }
      // return domains;
    // }
  // },
  created() {
    // é preciso fazer via Promise, pois os getItems são assícronos, daí a necessidade da
    // espera deles processarem para se chamar a generateDomains. Em getItems incluir o 
    // o return em axios para que a Promise seja retornada
    Promise.all([
			this.getItems("prefixos"),
      this.getItems("sufixos"),
		]).then(() => {
			this.generateDomains();
		});

    // this.getItems("prefixos");
    // this.getItems("sufixos");

    // this.getPrefixos();
    // this.getSufixos();
    // axios({
    //   url: baseApiUrl,
    //   method: "post",
    //   data: {
    //     query: `
    //       {
    //         prefixes: items (type: "prefix") {
    //           id
    //           type
    //           description
    //         }
    //         sufixes: items (type: "sufix") {
    //           description
    //         }
    //       }
    //     `
    //   }
    // }).then(response => {
    //   const query = response.data;
    //   this.prefixos = query.data.prefixes.map(prefix => prefix.description);
    //   this.sufixos = query.data.sufixes.map(sufix => sufix.description);

    //   // // eslint-disable-next-line
    //   // console.log(query.data);
    // });
  }
  // created() {
  //   axios({
  //     url: baseApiUrl,
  //     method: "post",
  //     data: {
  //       query: `
  //         {
  //           prefixes {
  //             id
  //             type
  //             description
  //           }
  //           sufixes {
  //             description
  //           }
  //         }
  //       `
  //     }
  //   }).then(response => {
  //     const query = response.data;
  //     // this.prefixos = query.data.prefixes.map(prefix => prefix.description);
  //     // this.sufixos = query.data.sufixes.map(sufix => sufix.description);

  //     // eslint-disable-next-line
  //     console.log(query.data);
  //   });
  // },
};
</script>

<style>
</style>
