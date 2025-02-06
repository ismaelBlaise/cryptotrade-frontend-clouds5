<template>
  <div class="form-wrapper">
    <form @submit.prevent="inscription" class="inscription-form">
      <div class="form-group">
        <h2>Inscription</h2>
      </div>
      <div
        v-if="message"
        :class="{ success: isSuccess, error: !isSuccess }"
        class="message"
      >
        {{ message }}
      </div>
      <div class="form-group">
        <input
          type="text"
          id="nom"
          v-model="formData.nom"
          placeholder="Nom"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          id="prenom"
          v-model="formData.prenom"
          placeholder="Prénom"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="date"
          id="dateNaissance"
          v-model="formData.date_naissance"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          id="email"
          v-model="formData.email"
          placeholder="exemple@gmail.com"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          id="mot_de_passe"
          v-model="formData.mot_de_passe"
          placeholder="Mot de passe"
          required
        />
      </div>
      <div class="form-group">
        <select v-model="formData.sexe" required>
          <option disabled value="">Sexe</option>
          <option value="1">Homme</option>
          <option value="2">Femme</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" :disabled="loading">
          {{ loading ? "Inscription en cours..." : "Inscription" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/services/axios";

export default {
  data() {
    return {
      formData: {
        nom: "",
        prenom: "",
        date_naissance: "",
        email: "",
        mot_de_passe: "",
        sexe: "",
      },
      message: "",
      isSuccess: false,
      loading: false,
    };
  },
  methods: {
    async inscription() {
      this.message = "";
      this.loading = true;

      try {
        console.log("Sending data:", this.formData);
        const response = await api.post("/auth/inscrire", this.formData);
        this.message = response.data;
        this.isSuccess = true;

        this.formData = {
          nom: "",
          prenom: "",
          date_naissance: "",
          email: "",
          mot_de_passe: "",
          sexe: "",
        };

        setTimeout(() => {
          this.$router.push({ name: "validationEmail" });
        }, 2000);
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error.response);

        if (error.response) {
          this.message = error.response.data || "Erreur lors de l'inscription.";
        } else if (error.request) {
          this.message =
            "Impossible de contacter le serveur. Vérifiez votre connexion.";
        } else {
          this.message = "Une erreur inattendue est survenue.";
        }

        this.isSuccess = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  font-family: Arial, Helvetica, sans-serif;
}

.inscription-form {
  width: 350px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  width: 100%;
}

.form-group h2 {
  color: white;
}

.message {
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
}

.success {
  background-color: #28a745;
  color: white;
}

.error {
  background-color: #dc3545;
  color: white;
}

input,
button,
select {
  width: 100%;
  padding: 12px 16px;
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

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

button {
  background-color: #e7361a;
  border: 1px solid #e7361a;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

select {
  background-color: transparent;
  border: 1px solid white;
  color: white;
  font-size: 16px;
}

select option {
  background-color: #1a5562;
  color: white;
}
</style>
