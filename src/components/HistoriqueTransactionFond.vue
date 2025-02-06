<template>
  <div class="historique-container">
    <h2>HISTORIQUE DES TRANSACTIONS FOND</h2>
    <br />
    <form @submit.prevent="filtrerTransactions" class="filtre-form">
      <!-- Formulaire de filtrage -->
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
          <option v-for="user in utilisateurs" :key="user.id" :value="user.id">
            {{ user.nom }}
          </option>
        </select>
      </div>

      <button type="submit" class="filtre-btn">Filtrer</button>
    </form>

    <!-- Liste des transactions -->
    <div class="list-container">
      <div
        class="element"
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="{
          depot: transaction.type === 'depot',
          retrait: transaction.type === 'retrait',
        }"
      >
        <div class="element-fond">
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
                Date: {{ formatDate(transaction.dateCreation) }}
              </p>
            </div>
          </div>

          <!-- Détails transaction -->
          <div class="details">
            <p
              class="montant"
              :class="{
                depot: transaction.typeTransaction === 'depot',
                retrait: transaction.typeTransaction === 'retrait',
              }"
            >
              Montant:
              <span>{{ transaction.montant.toLocaleString("fr-FR") }} $</span>
            </p>
          </div>

          <!-- Type transaction -->
          <div class="type-transaction">
            <p
              :class="{
                depot: transaction.typeTransaction === 'depot',
                retrait: transaction.typeTransaction === 'retrait',
              }"
            >
              {{ transaction.typeTransaction }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/axios"; // Assurez-vous d'importer l'instance API

export default {
  data() {
    return {
      filtre: {
        dateDebut: "",
        dateFin: "",
        utilisateurId: "",
      },
      utilisateurs: [], // Pour stocker les utilisateurs récupérés de l'API
      transactions: [], // Pour stocker les transactions filtrées
    };
  },
  mounted() {
    this.getAllData();
    this.filtrerTransactions(); // Appeler la méthode pour récupérer les utilisateurs au montage
  },
  methods: {
    // Récupérer les utilisateurs depuis l'API
    async getAllData() {
      try {
        const users = await api.get("/utilisateurs"); // Remplacez par l'URL correcte pour les utilisateurs
        this.utilisateurs = users.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    },

    // Méthode pour filtrer les transactions selon les critères
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
        };

        const response = await api.post(
          "/transactionfonds/filtre",
          requestData
        ); // Remplacez par l'URL pour récupérer les transactions filtrées
        this.transactions = response.data;
        if (this.transactions.length === 0) {
          this.message = "Aucune transaction trouvée";
        }
      } catch (error) {
        console.error("Erreur lors du filtrage des transactions", error);
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
/* Styles principaux */
.historique-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

h2 {
  text-align: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
}

.filtre-form {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.filtre-group {
  display: flex;
  flex-direction: column;
}

.filtre-group label {
  color: white;
  font-weight: bold;
}

.filtre-group input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid white;
}
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

/* Liste des transactions */
.list-container {
  width: 100%;
  height: 100%;
  margin-top: 25px;
}

.element {
  border: 2px solid white;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
  transition: transform 0.2s ease-in-out;
  background-color: rgba(255, 255, 255, 0.1);
}

.element:hover {
  transform: scale(1.02);
}

.depot {
  border-left: 5px solid #19d187;
}

.retrait {
  border-left: 5px solid #d11919;
}

.element-fond {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.infos {
  display: flex;
  gap: 20px;
}

.image-container img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.montant {
  font-size: 18px;
  font-weight: bold;
}

.montant span {
  color: #19d187;
}

.depot .montant span {
  color: #19d187;
}

.retrait .montant span {
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

.type-transaction .depot {
  color: #19d187;
}

.type-transaction .retrait {
  color: #d11919;
}
</style>
