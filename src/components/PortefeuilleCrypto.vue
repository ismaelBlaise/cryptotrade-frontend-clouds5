<template>
    <div class="achat-container">
        <h2>PORTEFEUILLE CRYPTO</h2>
        <div class="list-container">
            <div class="element">
                <div class="element-crypto">
                    <div>
                        <div class="infos">
                            <div class="image-container">
                                <img src="@/assets/images/currency.png" alt="">
                            </div>
                            <div>
                                <p class="nomCrypto">CRYPTO</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p class="prix">0.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script></script>
  
<style scoped>

    .achat-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    h2 {
        color: white;
        margin-left: auto;
        margin-right: auto;
        font-size: 30px;
    }

    .infos {
        display: flex;
        align-items: center;
        gap: 50px;
    }

    .nomCrypto {
        font-weight: bold;
    }

    .image-container img {
        width: 60px;
        height: auto;
        object-fit: contain;
    }

    .prix {
        color: #19D187;
    }

    .list-container {
        width: 100%;
        height: 100%;
        margin-top: 25px;
    }

    .element {
        border: 1px solid white;
        border-radius: 4px;
        padding: 10px;
        align-items: center;
    }

    .element-crypto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
    }

    form {
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }

    input , button {
        width: 100%;
        padding: 10px 16px;
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
        min-width: 100px;
    }

</style>
    