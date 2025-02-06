<template>
  <div class="achat-container">
    <h2>Solde actuel : {{ solde.toLocaleString() }} $</h2>

    <div class="list-container">
      <div class="columns">
        <!-- Colonne des Dépôts -->
        <div class="column">
          <h3>Dépôts</h3>
          <div class="scroll-view">
            <div
              v-for="transaction in depots"
              :key="transaction.id"
              class="element"
            >
              <div class="element-crypto">
                <div>
                  <div class="infos">
                    <div class="image-container">
                      <img src="@/assets/icons/transaction.png" alt="" />
                    </div>
                    <div>
                      <p class="nomCrypto">
                        TYPE: {{ transaction.typeTransaction }}
                      </p>
                      <p class="date">
                        {{ formatDate(transaction.dateCreation) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="statut">STATUT: {{ transaction.statut }}</p>
                  <p class="prix">
                    {{ transaction.montant.toLocaleString() }} $
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne des Retraits -->
        <div class="column">
          <h3>Retraits</h3>
          <div class="scroll-view">
            <div
              v-for="transaction in retraits"
              :key="transaction.id"
              class="element"
            >
              <div class="element-crypto">
                <div>
                  <div class="infos">
                    <div class="image-container">
                      <img src="@/assets/icons/transaction.png" alt="" />
                    </div>
                    <div>
                      <p class="nomCrypto">
                        TYPE: {{ transaction.typeTransaction }}
                      </p>
                      <p class="date">
                        {{ formatDate(transaction.dateCreation) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="statut">STATUT: {{ transaction.statut }}</p>
                  <p class="prix">
                    {{ transaction.montant.toLocaleString() }} $
                  </p>
                </div>
              </div>
            </div>
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
      transactions: [],
      solde: 0,
    };
  },
  computed: {
    depots() {
      return this.transactions.filter(
        (t) => t.typeTransaction.toLowerCase() === "depot"
      );
    },
    retraits() {
      return this.transactions.filter(
        (t) => t.typeTransaction.toLowerCase() === "retrait"
      );
    },
  },
  methods: {
    async getTransactionFond() {
      try {
        const response = await api.get("/transactionfonds");
        if (response.status === 200) {
          this.transactions = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getSolde() {
      try {
        const response = await api.get("/portefeuilles");
        if (response.status === 200) {
          this.solde = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(timestamp) {
      if (!timestamp) return "Date Invalide";
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Date Invalide";
      return date.toLocaleString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
  },
  created() {
    this.getTransactionFond();
    this.getSolde();
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

.infos {
  display: flex;
  align-items: center;
  gap: 50px;
}

.nomCrypto {
  font-weight: bold;
}

.date {
  font-size: 14px;
  color: grey;
}

.image-container img {
  width: 60px;
  height: auto;
  object-fit: contain;
}

.prix {
  color: #19d187;
}

.statut {
  font-weight: bold;
  color: #f1c40f;
}

.list-container {
  width: 100%;
  height: 100%;
  margin-top: 25px;
  display: flex;
  justify-content: center;
}

.columns {
  display: flex;
  gap: 20px;
  width: 500vh;
  max-width: 900px;
}

.column {
  width: 100vh;
  flex: 1;
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px;
  background-image: linear-gradient(#0d144e, #1a5562);
  display: flex;
  flex-direction: column;
}

.column h3 {
  color: white;
  text-align: center;
  margin-bottom: 15px;
}

.scroll-view {
  max-height: 510px;
  overflow-y: auto;
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
