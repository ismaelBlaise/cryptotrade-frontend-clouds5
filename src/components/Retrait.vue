<template>
  <div class="depot-container">
    <div class="illustration-container">
      <div>
        <h2>Retrait de fond</h2>
        <p>Entrez le montant du retrait</p>
      </div>
    </div>
    <div class="form-container">
      <form @submit.prevent="retrait" class="form">
        <div
          v-if="message"
          :class="{ success: isSuccess, error: !isSuccess }"
          class="message"
        >
          {{ message }}
        </div>
        <div class="form-group">
          <h2>retrait</h2>
        </div>
        <div class="form-group">
          <input
            type="montant"
            id="montant"
            v-model="formData.montant"
            placeholder="montant de la transaction"
          />
        </div>
        <div class="form-group">
          <button type="submit">Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/axios";

export default {
  data() {
    return {
      formData: {
        montant: "",
      },
      message: "",
      isSuccess: false,
    };
  },
  methods: {
    async retrait() {
      this.message = "";
      this.isSuccess = false;

      try {
        console.log(this.formData);
        const response = await api.post(
          "/transactionfonds/retrait",
          this.formData
        );
        if (response.status === 200) {
          this.message = response.data;
          this.isSuccess = true;
          this.formData.montant = "";
        }
      } catch (error) {
        this.message = error.response.data;
        this.isSuccess = false;
      }
    },
  },
};
</script>

<style scoped>
.depot-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: Arial, Helvetica, sans-serif;
}

.illustration-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
}

.illustration-container h2 {
  font-size: 50px;
}

.illustration-container p {
  font-size: 20px;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
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
