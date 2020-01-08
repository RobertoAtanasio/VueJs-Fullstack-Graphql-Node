<template>
  <div>
    <div class="text-center" id="slogan">
      <h1>
        NameGator
        <span class="fa fa-check"></span>
      </h1>
      <br />
      <h6 class="text-secundary">Gerador de Nomes Utilizando Vue.JS, GraphQl e Node</h6>
    </div>
    <div id="main">
      <router-view></router-view>
      <!-- <DomainList></DomainList> -->
    </div>
    
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
  name: "app",
};
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}

#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
