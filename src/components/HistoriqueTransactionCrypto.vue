<template>
  <div class="historique-container">
    <h2>HISTORIQUE DES TRANSACTIONS CRYPTO</h2>
    <div v-if="message" :class="['message', messageType]">{{ message }}</div>
    <br />
    <!-- Formulaire de filtrage -->
    <form @submit.prevent="filtrerTransactions" class="filtre-form">
      <div class="filtre-group">
        <label>Date début :</label>
        <input type="datetime-local" v-model="filtre.dateDebut" />
      </div>
      <div class="filtre-group">
        <label>Date fin :</label>
        <input type="datetime-local" v-model="filtre.dateFin" />
      </div>
      <div class="filtre-group">
        <label>Utilisateur :</label>
        <select v-model="filtre.utilisateurId">
          <option disabled value="">Sélectionner un utilisateur</option>
          <option value="null">tous</option>

          <option
            v-for="user in utilisateurs"
            :key="user.idU"
            :value="user.idU"
          >
            {{ user.nom }} {{ user.prenom }}
          </option>
        </select>
      </div>
      <div class="filtre-group">
        <label>Cryptomonnaie :</label>
        <select v-model="filtre.cryptoId">
          <option disabled value="">Sélectionner une cryptomonnaie</option>
          <option
            v-for="crypto in cryptomonnaies"
            :key="crypto.id"
            :value="crypto.id"
          >
            {{ crypto.nom }}
          </option>
        </select>
      </div>
      <button type="submit" class="filtre-btn">Filtrer</button>
    </form>
    <div class="list-container">
      <div
        class="element"
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="{
          achat: transaction.type === 'achat',
          vente: transaction.type === 'vente',
        }"
      >
        <div class="element-crypto">
          <!-- Info utilisateur -->
          <div class="infos">
            <div class="image-container user-image">
              <img src="@/assets/images/user.png" alt="Utilisateur" />
            </div>
            <div>
              <p class="utilisateur">
                {{ transaction.nom }} {{ transaction.prenom }}
              </p>
              <p class="date">
                Date:
                {{ formatDate(transaction.dateTransaction) }}
              </p>
            </div>
          </div>

          <!-- Info crypto -->
          <div class="infos">
            <div class="image-container">
              <img src="@/assets/images/currency.png" alt="Crypto" />
            </div>
            <div>
              <p class="nomCrypto">
                {{ transaction.nomCrypto }} ({{ transaction.symbole }})
              </p>
            </div>
          </div>

          <!-- Détails transaction -->
          <div class="details">
            <p class="quantite">
              Quantité: <span>{{ transaction.quantite }}</span>
            </p>
            <p class="prix">
              Prix unitaire:
              <span
                >{{
                  (transaction.montant / transaction.quantite).toLocaleString(
                    "fr-FR"
                  )
                }}
                $</span
              >
            </p>
            <p class="total">
              Total:
              <span>{{ transaction.montant.toLocaleString("fr-FR") }} $</span>
            </p>
          </div>

          <!-- Type transaction -->
          <div class="type-transaction">
            <p
              :class="{
                achat: transaction.type === 'achat',
                vente: transaction.type === 'vente',
              }"
            >
              {{ transaction.type }}
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
      filtre: {
        dateDebut: "",
        dateFin: "",
        utilisateurId: "",
        cryptoId: "",
        message: "",
      },
      utilisateurs: [],
      cryptomonnaies: [],
      transactions: [],
    };
  },
  mounted() {
    this.getAllData();
    this.filtrerTransactions();
  },
  methods: {
    async getAllData() {
      try {
        const users = await api.get("/utilisateurs");
        this.utilisateurs = users.data;
        const cryptos = await api.get("/cryptomonnaies");
        this.cryptomonnaies = cryptos.data;
      } catch (error) {}
    },

    async filtrerTransactions() {
      try {
        const requestData = {
          debut: this.filtre.dateDebut
            ? new Date(this.filtre.dateDebut).toISOString()
            : null,
          fin: this.filtre.dateFin
            ? new Date(this.filtre.dateFin).toISOString()
            : null,
          utilisateurId: this.filtre.utilisateurId || null,
          cryptoId: this.filtre.cryptoId || null,
        };

        const response = await api.post(
          "/transactioncryptos/filtre",
          requestData
        );

        this.transactions = response.data;
        if (this.transactions.length == 0) {
          this.message = "Aucune transaction";
        }
        // this.messageType = "success";
      } catch (error) {
        console.error("Erreur lors du filtrage :", error);
        this.message = "Erreur lors du filtrage.";
        this.messageType = "error";
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
};
</script>

<style scoped>
.historique-container {
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

/* Liste des transactions */
.list-container {
  width: 100%;
  height: 500px; /* Ajustez la hauteur selon vos besoins */
  margin-top: 25px;
  overflow-x: auto; /* Active le défilement vertical */
}

.element {
  border: 2px solid white;
  border-radius: 4px;
  padding: 15px;
  align-items: center;
  margin-bottom: 10px;
  transition: transform 0.2s ease-in-out;
  background-color: rgba(255, 255, 255, 0.1);
}

.element:hover {
  transform: scale(1.02);
}

.achat {
  border-left: 5px solid #19d187;
}

.vente {
  border-left: 5px solid #d11919;
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

.element-crypto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}

.infos {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nomCrypto {
  font-weight: bold;
}

.image-container img {
  width: 60px;
  height: auto;
  object-fit: contain;
}

.user-image img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.quantite,
.prix,
.total {
  font-size: 18px;
  font-weight: bold;
}

.quantite span,
.prix span,
.total span {
  color: #19d187;
}

.achat .quantite span,
.achat .prix span,
.achat .total span {
  color: #19d187;
}

.vente .quantite span,
.vente .prix span,
.vente .total span {
  color: #d11919;
}

.date {
  font-size: 14px;
  color: lightgray;
}

.type-transaction {
  font-weight: bold;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 5px;
}

.type-transaction .achat {
  color: #19d187;
}

.type-transaction .vente {
  color: #d11919;
}

/* Formulaire de filtre */
.filtre-form {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
}
.filtre-group {
  display: flex;
  flex-direction: column;
}
.filtre-group label {
  color: white;
  font-weight: bold;
}
.filtre-group input,
.filtre-group select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid white;
  width: 200px;
}
.filtre-btn {
  background-color: #19d187;
  border: none;
  padding: 10px 15px;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}
</style>
