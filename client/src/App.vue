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
    
    <DomainList></DomainList>
    
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import DomainList from "./components/DomainList";

export default {
  name: "app",
  components: { DomainList },
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
