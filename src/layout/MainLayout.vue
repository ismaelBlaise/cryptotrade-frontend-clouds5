<template>
  <div class="page-container">
    <div class="navbar">
      <a class="logo">Cryptotrade</a>
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
import AcceuilIcon from "@/assets/icons/accueil.png";
import DepotIcon from "@/assets/icons/depot.png";
import RetraitIcon from "@/assets/icons/retrait.png";
import AchatIcon from "@/assets/icons/achat.png";
import VenteIcon from "@/assets/icons/vente.png";
import FondIcon from "@/assets/icons/portefeuille.png";
import CryptoIcon from "@/assets/icons/portefeuille-numerique.png";
import CoursIcon from "@/assets/icons/cours.png";
import Deconnexion from "@/assets/icons/log-out.png";

export default {
  data() {
    return {
      iconMap: {
        acceuil: AcceuilIcon,
        depot: DepotIcon,
        retrait: RetraitIcon,
        achat: AchatIcon,
        vente: VenteIcon,
        cours: CoursIcon,
        "portefeuille-fond": FondIcon,
        "portefeuille-crypto": CryptoIcon,
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
        });
        if (response.status === 200) {
          this.$router.push("/connexion"); // Redirection vers la page de connexion
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
