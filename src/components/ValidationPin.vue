<template>
  <div class="validation-email-container">
    <div>
      <h2>Un email vous a été envoyé</h2>
      <p>Veuillez saisir le code PIN ici…</p>
    </div>
    <div>
      <div class="pin-container">
        <form @submit.prevent="validerPin">
          <div
            v-if="message"
            :class="{ success: isSuccess, error: !isSuccess }"
            class="message"
          >
            {{ message }}
          </div>
          <div class="form-group">
            <input
              type="number"
              v-model="formData.codepin"
              placeholder="PIN"
              required
            />
          </div>
          <div class="form-group">
            <button type="submit" :disabled="loading">
              Valider
              <span v-if="loading" class="loading-spinner"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/axios";

export default {
  data() {
    return {
      formData: {
        email: localStorage.getItem("email") || "",
        codepin: "",
      },
      message: "",
      isSuccess: false,
      loading: false,
    };
  },
  methods: {
    async validerPin() {
      this.loading = true;
      this.message = "";

      try {
        const response = await api.post("/auth/valider-pin", this.formData);
        if (response.status === 200) {
          this.isSuccess = true;
          localStorage.setItem("token", response.data.token);
          if (response.data.role === "administrateur") {
            this.$router.push({ name: "depottransaction" });
            return;
          }
          this.message = "Code PIN validé avec succès !";
          setTimeout(() => {
            this.$router.push({ name: "acceuil" });
          }, 1500);
        }
      } catch (error) {
        this.isSuccess = false;
        if (error.response) {
          this.message = error.response.data.message || "Code PIN invalide.";
        } else {
          this.message = "Erreur de connexion. Veuillez réessayer.";
        }
      } finally {
        this.loading = false;
        setTimeout(() => (this.message = ""), 5000);
      }
    },
  },
};
</script>

<style scoped>
.validation-email-container {
  height: 100%;
  width: 100%;
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

.pin-container {
  width: 350px;
}

.form-group {
  width: 100%;
}

form {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

input,
button {
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

button {
  background-color: #e7361a;
  border: 1px solid #e7361a;
  color: white;
  font-size: 16px;
  position: relative;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

button .loading-spinner {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.message {
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
