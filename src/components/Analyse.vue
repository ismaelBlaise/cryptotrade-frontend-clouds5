<template>
  <div class="vente-container">
    <h2>VENTE</h2>
    <div class="search-container">
      <input
        type="text"
        placeholder="Rechercher une crypto..."
        v-model="searchQuery"
      />
    </div>
    <div class="list-container">
      <div class="element">
        <div class="element-action">
          <form @submit.prevent="analyser()">
            <div class="form-group">
              <select class="" v-for="crypto in getCryptomonnaies">
                <option value=""></option>
              </select>
            </div>
            <div class="form-group">
              <button type="submit">Analyser</button>
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
      quantites: {},
      formData: {
        idCrypto: "",
        quantite: "",
      },
      loadingStates: {},
      message: {},
      isSuccess: {},
    };
  },
  computed: {},
  methods: {
    getCryptomonnaies() {
      api
        .get("/analyse")
        .then((response) => {
          this.cryptomonnaies = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des cryptomonnaies:", error);
        });
    },
    clearMessage(id) {
      if (this.messageTimers[id]) {
        clearTimeout(this.messageTimers[id]);
      }

      this.messageTimers[id] = setTimeout(() => {
        this.message[id] = null;
        this.isSuccess[id] = false;
      }, 5000);
    },
    async analyser(id, quantite) {
      if (!quantite || quantite <= 0) {
        alert("Veuillez entrer une quantité valide.");
        return;
      }

      this.loadingStates[id] = true;
      this.formData.idCrypto = id;
      this.formData.quantite = quantite;

      try {
        const response = await api.post(
          "/transactioncryptos/vente",
          this.formData
        );

        if (response.status === 200) {
          this.message[id] = response.data;
          this.isSuccess[id] = true;
          this.quantites[id] = "";
          await this.getCryptomonnaies();
          this.clearMessage(id);
        }
      } catch (error) {
        this.message[id] =
          error.response?.data?.message ||
          "Erreur lors de la vente. Veuillez réessayer.";
        this.isSuccess[id] = false;
        this.clearMessage(id);
      } finally {
        this.loadingStates[id] = false;
      }
    },
  },
  beforeUnmount() {
    Object.values(this.messageTimers).forEach((timer) => {
      clearTimeout(timer);
    });
  },
  mounted() {
    this.getCryptomonnaies();
  },
};
</script>

<style scoped>
.vente-container {
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
