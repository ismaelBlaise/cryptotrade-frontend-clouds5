<template>
  <div class="page-container">
    <div class="navbar">
      <a class="logo">Cryptotrade</a>
      <div class="links">
        <router-link
          v-for="(component, key) in componentsMap"
          :key="key"
          :to="key"
        >
          <button>
            {{ key }}
          </button>
        </router-link>
      </div>
    </div>

    <div class="container">
      <div class="illustration-container">
        <div>
          <h2>Projet cloud S5</h2>
          <p>Achat & vente de cryptomonnaie</p>
        </div>
      </div>
      <div class="form-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Connexion from "@/components/Connexion.vue";
import Inscription from "@/components/Inscription.vue";

export default {
  data() {
    return {
      view: "connexion",
      componentsMap: {
        connexion: Connexion,
        inscription: Inscription,
      },
    };
  },
};
</script>

<style scoped>
.container {
  height: 92vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.illustration-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
}

.illustration-container h2 {
  font-size: 50px;
}

.illustration-container p {
  font-size: 20px;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
