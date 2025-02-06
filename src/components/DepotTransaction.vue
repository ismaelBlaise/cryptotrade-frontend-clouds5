<template>
  <div class="achat-container">
    <h2>DEPOT</h2>
    <div v-if="message" :class="['message', messageType]">{{ message }}</div>
    <div class="list-container">
      <div
        class="element"
        v-for="transaction in transactions"
        :key="transaction.id"
      >
        <div class="element-crypto">
          <div>
            <div class="infos">
              <div class="image-container">
                <img
                  src="@/assets/icons/transaction.png"
                  alt="Transaction Icon"
                />
              </div>
              <div>
                <p class="nomCrypto">
                  {{ formatDate(transaction.dateCreation) }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p class="email">{{ transaction.email }}</p>
          </div>
          <div>
            <p class="prix">+ {{ transaction.montant.toLocaleString() }} $</p>
          </div>
        </div>
        <div class="element-action">
          <button @click="validerTransaction(transaction.id)">
            <img class="icon" src="@/assets/icons/check.png" alt="Valider" />
          </button>
          <button @click="annulerTransaction(transaction.id)">
            <img class="icon" src="@/assets/icons/croix.png" alt="Annuler" />
          </button>
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
      transactions: [],
      message: "",
      messageType: "",
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await api.get("/transactionfonds/depot");
        this.transactions = response.data;
        if (this.transactions.length == 0) {
          this.message = "Aucun depot pour l'instant";
        }
      } catch (error) {
        console.error("Erreur lors du chargement des transactions :", error);
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR");
    },

    async validerTransaction(id) {
      try {
        const response = await api.get("/transactionfonds/valider/" + id);
        if (response.status === 200) {
          this.showMessage(response.data, "success");
        }
        this.fetchTransactions();
      } catch (error) {
        this.showMessage(error.response.data, "error");
      }
    },

    async annulerTransaction(id) {
      try {
        const response = await api.get("/transactionfonds/refuser/" + id);
        if (response.status === 200) {
          this.showMessage(response.data, "error");
        }
        this.fetchTransactions();
      } catch (error) {
        this.showMessage(error.response.data, "error");
      }
    },

    showMessage(msg, type) {
      this.message = msg;
      this.messageType = type;
      setTimeout(() => {
        this.message = "";
        this.messageType = "";
      }, 3000); // Disparaît après 3 secondes
    },
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
  text-align: center;
  font-size: 30px;
}

.message {
  text-align: center;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  font-weight: bold;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.infos {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nomCrypto {
  font-weight: bold;
  color: white;
}

.image-container img {
  width: 60px;
  height: auto;
  object-fit: contain;
}

.prix {
  color: #19d187;
  font-weight: bold;
}

.list-container {
  width: 100%;
  margin-top: 25px;
  max-height: 700px;
  overflow-y: auto;
  padding-right: 10px;
}

.element {
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px;
  display: grid;
  grid-template-columns: 90% 10%;
  align-items: center;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}

.element-crypto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.element-action {
  display: flex;
  justify-content: space-around;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.icon {
  width: 25px;
  transition: transform 0.2s;
}

button:hover .icon {
  transform: scale(1.1);
}
</style>
