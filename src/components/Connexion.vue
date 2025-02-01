<template>
    <div class="form-wrapper">
      <form @submit.prevent="connexion" class="connexion-form">

        <div class="form-group">
            <h2>connexion</h2>
        </div>
        
        <div class="form-group">
          <input type="email" id="email" v-model="formData.email" placeholder="exemple@gmail.com" />
        </div>
  
        <div class="form-group">
          <input type="password" id="mdp" v-model="formData.mot_de_passe" placeholder="********" />
        </div>
  
        <div class="form-group" v-if="errorMessage">
            <p class="error-message">{{ errorMessage }}</p>
        </div>
  
        <div class="form-group">
            <button type="submit">Connexion</button>
        </div>
        
      </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                email: '',
                mot_de_passe: '',
            },
            errorMessage: ''
        };
    },
    methods: {
        async connexion() {
            try {
                const response = await axios.post('http://localhost:8080/auth/connexion', this.formData);
                
                if (response.status === 200) {
                    localStorage.setItem('email',this.formData.email);
                    this.$router.push({ name: 'validationPin' });
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.errorMessage = "Trop de tentatives de connexion. Veuillez consulter votre boîte email.";
                } else {
                    this.errorMessage = error.response.data.message;
                }
            }
        }
    }
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

    input , button {
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
        background-color: #E7361A;
        border: 1px solid #E7361A;
        color: white;
        font-size: 16px;
    }

    button ::hover {
        background-color: white;
        color: #E7361A;
    }

    .error-message {
        color: #E7361A;
        font-size: 14px;
        font-weight: bold;
    }
</style>