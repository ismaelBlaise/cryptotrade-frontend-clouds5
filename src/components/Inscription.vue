<template>
    <div  class="form-wrapper">
        <form @submit.prevent="inscription" class="inscription-form">
            <div class="form-group">
                <h2>inscription</h2>
            </div>
            <div class="form-group">
                <input type="text" id="nom" v-model="formData.nom" placeholder="nom" />
            </div>
            <div class="form-group">
                <input type="text" id="prenom" v-model="formData.prenom" placeholder="prenom" />
            </div>
            <div class="form-group">
                <input type="date" id="dateNaissance" v-model="formData.dateNaissance" />
            </div>
            <div class="form-group">
                <input type="text" id="photo" v-model="formData.photo" placeholder="URL photo" />
            </div>
            <div class="form-group">
                <input type="text" id="email" v-model="formData.email" placeholder="exemple@gmail.com" />
            </div>
            <div class="form-group">
                <input type="text" id="mdp" v-model="formData.mdp" placeholder="********" />
            </div>
            <div class="form-group">
                <select v-model="formData.idSexe" required>
                    <option disabled value="">sexe</option>
                    <option value="1">Homme</option>
                    <option value="2">Femme</option>
                </select>
            </div>
            <div class="form-group">
                <button type="submit">Inscription</button>
            </div>
        </form>
    </div>
</template>

<script>

    import axios from 'axios';
    import ValidationEmail from '@/components/ValidationEmail.vue';

    export default {
        data() {
            return {
                formData: {
                    nom: '',
                    prenom: '',
                    dateNaissance: '',
                    photo: '',
                    email: '',
                    mdp: '',
                    idSexe: '',
                }
            };
        },
        methods: {
            async inscription() {
                try {
                    // await axios.post('http://localhost:8080/utilisateurs/inscription', this.formData);
                    this.$router.push({ name: 'validationEmail' });
                } catch (error) {
                    console.error('Erreur lors de la création de l\'entité :', error);
                }
            }
        }
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

    input , button, select {
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
        background-color: #E7361A;
        border: 1px solid #E7361A;
        color: white;
        font-size: 16px;
    }

    select {
        background-color: transparent;
        border: 1px solid white;
        color: white;
        font-size: 16px;
    }

    select option {
        background-color: #1A5562;
        color: white;
    }

</style>
