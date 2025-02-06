<template>
  <div class="page-container">
    <div class="navbar">
      <a class="logo">Cryptotrade administrateur</a>
      <div class="links">
        <!-- Affichage des autres icônes sauf déconnexion -->
        <router-link
          v-for="(iconPath, key) in iconMap"
          :key="key"
          :to="key"
          v-if="key !== 'deconnexion'"
        >
          <button>
            <img :src="iconPath" :alt="key" class="icon" />
          </button>
        </router-link>

        <!-- Icône de déconnexion hors de la boucle -->
        <button @click="logout">
          <img
            :src="iconDeconnexion.deconnexion"
            alt="Déconnexion"
            class="icon"
          />
        </button>
      </div>
    </div>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import api from "@/services/axios";
import DepotTransactionIcon from "@/assets/icons/depot.png";
import RetraitTransactionIcon from "@/assets/icons/retrait.png";
import Deconnexion from "@/assets/icons/log-out.png";
import HistoriqueCryptoIcon from "@/assets/icons/portefeuille-numerique.png"; // Nouvelle icône
import HistoriqueFondIcon from "@/assets/icons/portefeuille.png"; // Nouvelle icône

export default {
  data() {
    return {
      iconMap: {
        "depot-transaction": DepotTransactionIcon,
        "retrait-transaction": RetraitTransactionIcon,
        "historique-transaction-crypto": HistoriqueCryptoIcon, // Nouvelle icône
        "historique-transaction-fond": HistoriqueFondIcon, // Nouvelle icône
      },
      iconDeconnexion: {
        deconnexion: Deconnexion,
      },
    };
  },
  methods: {
    async logout() {
      try {
        const response = await api.get("/auth/logout", {
          withCredentials: true,
        }); // Assurer la gestion des cookies de session
        if (response.status === 200) {
          this.$router.push("/connexion"); // Redirection vers la page d'accueil
        } else {
          console.warn("La déconnexion n'a pas été traitée correctement.");
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 92vh;
  padding: 20px;
  color: white;
}

.links {
  gap: 20px;
}

button {
  border: none;
  padding: 4px;
  border-radius: 4px;
}

.icon {
  width: 35px;
}
</style>
