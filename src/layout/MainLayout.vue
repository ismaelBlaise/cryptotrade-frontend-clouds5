<template>
    <div class="page-container">
        <div class="navbar">
            <a class="logo">Crypto</a>
            <div class="links">
                <router-link
                    v-for="(iconPath, key) in iconMap"
                    :key="key"
                    :to="key">
                    <button>
                        <img :src="iconPath" :alt="key" class="icon" />
                    </button>
                </router-link>
            </div>
        </div>

        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>

    import AcceuilIcon from '@/assets/icons/accueil.png';
    import DepotIcon from '@/assets/icons/depot.png';
    import RetraitIcon from '@/assets/icons/retrait.png';
    import AchatIcon from '@/assets/icons/achat.png';
    import VenteIcon from '@/assets/icons/vente.png';
    import FondIcon from '@/assets/icons/portefeuille.png';
    import CryptoIcon from '@/assets/icons/portefeuille-numerique.png';
    import CoursIcon from '@/assets/icons/cours.png';

    export default {
        data() {
            return {
                iconMap: {
                    acceuil: AcceuilIcon,
                    depot: DepotIcon,
                    retrait: RetraitIcon,
                    achat: AchatIcon,
                    vente: VenteIcon,
                    cours: CoursIcon, 
                    'portefeuille-fond': FondIcon,
                    'portefeuille-crypto': CryptoIcon,
                }
            };
        }
    };
</script>

<style scoped>

    .container {
        height: 92vh;
        padding: 20px;
        color: white;
    }

    .links {
        gap: 20px;
    }

    button {
        border: none;
        padding: 4px;
        border-radius: 4px;
    }

    .icon {
        width: 35px;
    }

</style>