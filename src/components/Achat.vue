<template>
  <div class="achat-container">
    <h2>ACHAT</h2>

    <!-- Champ de recherche -->
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
            <p class="prix">Prix actuel: {{ crypto.prix }} $</p>
          </div>
        </div>
        <div class="element-action">
          <div
            v-if="message[crypto.id]"
            :class="{
              success: isSuccess[crypto.id],
              error: !isSuccess[crypto.id],
            }"
            class="message"
          >
            {{ message[crypto.id] }}
          </div>
          <form
            @submit.prevent="acheter(crypto.id, quantites[crypto.id] || '')"
          >
            <div class="form-group">
              <input
                step="0.0001"
                type="number"
                placeholder="Quantité"
                v-model="quantites[crypto.id]"
              />
            </div>
            <div class="form-group">
              <button type="submit" :disabled="loadingStates[crypto.id]">
                {{ loadingStates[crypto.id] ? "Chargement..." : "Acheter" }}
              </button>
            </div>
          </form>
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
      cryptomonnaies: [],
      filteredCryptomonnaies: [],
      searchQuery: "", // Valeur du champ de recherche
      formData: {
        idCrypto: "",
        quantite: "",
      },
      loadingStates: {},
      quantites: {},
      message: {},
      isSuccess: {},
      updateInterval: null,
    };
  },
  methods: {
    async getCryptomonnaies() {
      try {
        const response = await api.get("/cryptomonnaies");
        if (response && response.data) {
          this.cryptomonnaies = response.data;
          this.filteredCryptomonnaies = this.cryptomonnaies; // Initialisation avec toutes les cryptos
        } else {
          console.error("Aucune donnée disponible dans la réponse");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des cryptomonnaies:",
          error
        );
      }
    },
    async acheter(id, quantite) {
      if (!quantite || quantite <= 0) {
        alert("Veuillez entrer une quantité valide.");
        return;
      }

      this.loadingStates[id] = true;
      this.formData.idCrypto = id;
      this.formData.quantite = quantite;

      try {
        const response = await api.post(
          "/transactioncryptos/achat",
          this.formData
        );

        if (response.status === 200) {
          this.message[id] = response.data;
          this.isSuccess[id] = true;
          this.quantites[id] = "";
        }
      } catch (error) {
        this.message[id] =
          error.response?.data?.message ||
          "Erreur lors de l'achat. Veuillez réessayer.";
        this.isSuccess[id] = false;
      } finally {
        this.loadingStates[id] = false;
      }
    },
    filterCryptos() {
      const query = this.searchQuery.toLowerCase();
      this.filteredCryptomonnaies = this.cryptomonnaies.filter((crypto) =>
        crypto.nom.toLowerCase().includes(query)
      );
    },
    startAutoUpdate() {
      this.updateInterval = setInterval(() => {
        this.getCryptomonnaies();
      }, 10000); // Mise à jour toutes les 10 secondes
    },
  },
  mounted() {
    this.getCryptomonnaies();
    this.startAutoUpdate();
  },
  beforeUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
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

.prix {
  color: #19d187;
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
  display: grid;
  grid-template-columns: 85% 15%;
  align-items: center;
}

.element-crypto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}

form {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-right: 10px;
}

input,
button {
  width: 100%;
  padding: 10px 16px;
  border-radius: 4px;
  outline: none;
}

input {
  background-color: transparent;
  border: 1px solid white;
  font-size: 16px;
  color: white;
}

input::placeholder {
  color: white;
  opacity: 1;
}

button {
  background-color: #e7361a;
  border: 1px solid #e7361a;
  color: white;
  font-size: 16px;
  min-width: 100px;
}

.message {
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
}

.success {
  background-color: #28a745;
  color: white;
}

.error {
  background-color: #dc3545;
  color: white;
}
</style>
