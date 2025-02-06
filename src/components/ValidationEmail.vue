<template>
  <div class="validation-email-container">
    <div>
      <h2>Un email vous a été envoyé</h2>
      <p v-if="!etat">Veuillez y valider la création du compte...</p>
      <p v-else class="success-message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import api from "@/services/axios";
export default {
  data() {
    return {
      message: "",
      etat: false,
      isChecking: false,
      intervalId: null,
      nbTentative: 0,
    };
  },
  mounted() {
    this.startChecking();
  },
  methods: {
    async recupererCompte() {
      if (this.isChecking) return;
      this.isChecking = true;

      try {
        const response = await api.post("/auth/recuperer");
        console.log(response.data);
        if (response.status === 200) {
          this.etat = response.data;
          this.message = "Votre compte a été validé avec succès.";
          clearInterval(this.intervalId);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du compte:", error);
        this.message =
          "Une erreur s'est produite lors de la vérification de votre compte.";
      } finally {
        this.isChecking = false;
      }
    },

    startChecking() {
      this.intervalId = setInterval(() => {
        if (!this.etat) {
          this.recupererCompte();
        }
      }, 3000);
    },
  },

  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
};
</script>

<style scoped>
.validation-email-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}

h2 {
  font-size: 50px;
}

p {
  font-size: 20px;
}

.success-message {
  color: lightgreen;
  font-weight: bold;
  margin-top: 10px;
}
</style>
