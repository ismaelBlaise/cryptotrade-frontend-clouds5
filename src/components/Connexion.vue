<template>
  <div class="form-wrapper">
    <form @submit.prevent="connexion" class="connexion-form">
      <div
        v-if="message"
        :class="{ success: isSuccess, error: !isSuccess }"
        class="message"
      >
        {{ message }}
      </div>
      <div class="form-group">
        <h2>Connexion</h2>
      </div>

      <div class="form-group">
        <input
          type="email"
          id="email"
          v-model="formData.email"
          placeholder="exemple@gmail.com"
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          id="mdp"
          v-model="formData.mot_de_passe"
          placeholder="********"
        />
      </div>

      <div class="form-group">
        <button type="submit" :disabled="loading">
          Connexion
          <span v-if="loading" class="loading-spinner"></span>
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
        email: "",
        mot_de_passe: "",
      },
      message: "",
      isSuccess: false,
      loading: false,
    };
  },
  methods: {
    async connexion() {
      this.loading = true;
      this.message = "";

      try {
        const response = await api.post("/auth/connexion", this.formData);

        if (response.status === 200) {
          localStorage.setItem("email", this.formData.email);
          this.$router.push({ name: "validationPin" });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.message =
            "Trop de tentatives de connexion. Veuillez consulter votre boîte email.";
        } else {
          this.message = error.response.data;
        }
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

.connexion-form {
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

input,
button {
  width: 100%;
  padding: 12px 16px;
  border-radius: 4px;
}

input {
  background-color: transparent;
  border: 1px solid white;
  font-size: 16px;
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
