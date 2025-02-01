<template>
    <div class="validation-email-container">
        <div>
            <h2>Un email vous a été envoyé</h2>
            <p>Veuillez saisir le code PIN ici…</p>
        </div>
        <div>
            <div class="pin-container">
                <form @submit.prevent="validerPin">
                    <div class="form-group">
                        <input type="text" v-model="formData.codepin" placeholder="PIN">
                    </div>
                    <div class="form-group">
                        <button type="submit">Valider</button>
                    </div>
                    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                email: localStorage.getItem('email') || '',
                codepin: ''
            },
            errorMessage: ''
        };
    },
    methods: {
        async validerPin() {
            try {
                const response = await axios.post('http://localhost:8080/auth/valider-pin', this.formData);
                if (response.status === 200) {
                    this.$router.push({ path: '/compte/accueil' });
                }
            } catch (error) {
                this.errorMessage = error.response?.data || "Erreur lors de la validation du code PIN";
            }
        }
    }
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

    input , button {
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
        background-color: #E7361A;
        border: 1px solid #E7361A;
        color: white;
        font-size: 16px;
    }

    .error-message {
        color: #ff4c4c;
        font-size: 14px;
        text-align: center;
    }
</style>
