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
                    <button class="btn btn-info ml-2" @click="openDomain(domain)">
                      <span class="fa fa-search"></span>
                    </button>
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
// import axios from "axios/dist/axios";
import { mapState, mapActions } from 'vuex';
import AppItemList from "./AppItemList";
// import { baseApiUrl } from "@/global.js";

export default {
  name: "DomainList",
  components: { AppItemList },
  data() {
    return {
      // items: {
      //   prefixos: [],
      //   sufixos: []
      // },
      // domains: []   // uma vez que foi retirada a computed domains() teremos que defini-la aqui
    };
  },
  methods: {
    ...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),
    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`
      });
    },

    // o mapActions acima substitui as definições abaixo

    // addItem(item) {
    //   this.$store.dispatch("addItem", item);      // invoca a actions em store.js
    // },
    // deleteItem(item) {
    //   this.$store.dispatch("deleteItem", item);
    // },
    // getItems(type) {
    //   this.$store.dispatch("getItems", type);
    // },
    // generateDomains() {
    //   this.$store.dispatch("generateDomains");
    // },

    // addItem(item) {
    //   axios({
    //     url: baseApiUrl,
    //     method: "post",
    //     data: {
    //       query: `
    //         mutation ($item: ItemInput) {
    //           newItem: saveItem(item: $item) {
    //             id
    //             type
    //             description
    //           }
    //         } 
    //       `,
    //       variables: {
    //         item
    //       }
    //     }
    //   }).then( response => {
    //     // this.getPrefixos();
    //     // Da forma abaixo evita uma nova chamada ao servidor!
    //     const query = response.data;
    //     const newItem = query.data.newItem;
    //     // // eslint-disable-next-line
    //     // console.log(newPrefixo);
    //     this.items[item.type].push(newItem);
    //     this.generateDomains();
    //   });
    // },
    // deleteItem(item) {
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
    //         id: item.item.id
    //       }
    //     }
    //   }).then( () => {
    //     // this.getPrefixos();
    //     // this.getItems(item.type);
    //     this.items[item.type].splice(
    //       this.items[item.type].indexOf(item), 1);
    //     this.generateDomains();
    //   });
    // },
    // getItems(type) {
    //   return axios({
    //     url: baseApiUrl,
    //     method: "post",
    //     data: {
    //       query: `
    //         query ($type: String) {
    //           itens: items (type: $type) {
    //             id
    //             type
    //             description
    //           }
    //         }
    //       `,
    //       variables: {
    //         type
    //       }
    //     }
    //   }).then(response => {
    //     const query = response.data;
    //     this.items[type] = query.data.itens;
    //     // this.items.prefixos = query.data.prefixes;
    //     // this.prefixos = query.data.prefixes.map(prefix => prefix.description);
    //     // // eslint-disable-next-line
    //     // console.log(query.data.itens);
    //   });
    // },
    // generateDomains() {
    //   axios({
		// 		url: baseApiUrl,
		// 		method: "post",
		// 		data: {
		// 			query: `
		// 				mutation {
		// 					domains: generateDomains {
		// 						name
    //             checkout
    //             available 
		// 					}
		// 				}
		// 			`
		// 		}
		// 	}).then( response => {
		// 		const query = response.data;
		// 		this.domains = query.data.domains;
		// 	});
    // },
  },
  computed: {
    ...mapState(["items", "domains"])
    // items() {
    //   // eslint-disable-next-line
    //   console.log("items >", this.$store.state.items);
    //   return this.$store.state.items;
    // },
    // domains() {
    //   // eslint-disable-next-line
    //   console.log("domains >", this.$store.state.domains);
    //   return this.$store.state.domains;
    // }
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
  },
  created() {
    // é preciso fazer via Promise, pois os getItems são assícronos, daí a necessidade da
    // espera deles processarem para se chamar a generateDomains. Em getItems incluir o 
    // o return em axios para que a Promise seja retornada

    // Obs: ao mover para o store.js, ao navegar para a consulta do domínio e voltar
    // o sistema não fará novamente a consulta ao servidor, ganhando performance uma vez
    // que o controle está na store

    // Promise.all([
		// 	this.getItems("prefixos"),
    //   this.getItems("sufixos"),
		// ]).then(() => {
		// 	this.generateDomains();
		// });
  }
};
</script>

<style>
</style>
