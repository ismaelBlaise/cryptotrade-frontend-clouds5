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
                <div class="form-group">
                    <h2>retrait</h2>
                </div>
                <div class="form-group">
                    <input type="montant" id="montant" v-model="formData.montant" placeholder="montant de la transaction" />
                </div>
                <div class="form-group">
                    <button type="submit">valider</button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>

    export default {
        data() {
            return {
                formData: {
                    montant: '',
                }
            };
        },
        methods: {
            async retrait() {
                try {
                    // await axios.post('http://localhost:8080/utilisateurs/connexion', this.formData);
                    console.log('Retrait réussie');
                } catch (error) {
                    console.error('Erreur lors du retrait');
                }
            }
        }
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

</style>
    