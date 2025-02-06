<template>
  <div class="achat-container">
    <h2>PORTEFEUILLE CRYPTO</h2>
    <div class="search-container">
      <input
        type="text"
        placeholder="Rechercher par nom de cryptomonnaie..."
        v-model="searchQuery"
        @input="filterCryptos"
      />
    </div>
    <div class="list-container">
      <div
        class="element"
        v-for="crypto in filteredCryptomonnaies"
        :key="crypto.id"
      >
        <div class="element-crypto">
          <div class="infos">
            <div class="image-container">
              <img src="@/assets/images/currency.png" alt="Crypto" />
            </div>
            <div>
              <p class="nomCrypto">{{ crypto.nom }} ({{ crypto.symbole }})</p>
            </div>
          </div>
          <div>
            <p class="quantite">Quantité: {{ crypto.quantite }}</p>
            <p class="prix">
              Prix unitaire: {{ crypto.prix.toLocaleString("fr-FR") }} $
            </p>
            <p class="total">
              Total:
              {{ (crypto.prix * crypto.quantite).toLocaleString("fr-FR") }} $
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/axios";

export default {
  data() {
    return {
      filteredCryptomonnaies: [],
      searchQuery: "", // Valeur du champ de recherche
      cryptomonnaies: [],
      intervalId: null,
    };
  },
  methods: {
    getCryptomonnaies() {
      api
        .get("/portefeuillecryptos")
        .then((response) => {
          this.cryptomonnaies = response.data;
          this.filteredCryptomonnaies = this.cryptomonnaies;
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des cryptomonnaies:",
            error
          );
        });
    },
    filterCryptos() {
      const query = this.searchQuery.toLowerCase();
      this.filteredCryptomonnaies = this.cryptomonnaies.filter((crypto) =>
        crypto.nom.toLowerCase().includes(query)
      );
    },
  },
  mounted() {
    this.getCryptomonnaies();
    this.intervalId = setInterval(this.getCryptomonnaies, 10000); // Met à jour toutes les 10 secondes
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // Nettoie l'intervalle lors de la destruction du composant
  },
};
</script>

<style scoped>
.achat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
  color: white;
  margin-left: auto;
  margin-right: auto;
  font-size: 30px;
}
.search-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-container input {
  padding: 10px 16px;
  font-size: 16px;
  width: 50%;
  border-radius: 4px;
  outline: none;
  background-color: transparent;
  border: 1px solid white;
  color: white;
}

.search-container input::placeholder {
  color: white;
}
.infos {
  display: flex;
  align-items: center;
  gap: 50px;
}

.nomCrypto {
  font-weight: bold;
}

.image-container img {
  width: 60px;
  height: auto;
  object-fit: contain;
}

.quantite,
.prix,
.total {
  color: #19d187;
  font-size: 18px;
  font-weight: bold;
}

.list-container {
  width: 100%;
  height: 100%;
  margin-top: 25px;
}

.element {
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.element-crypto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
