import { createRouter, createWebHistory } from 'vue-router';
import AuthentificationLayout from './layout/AuthentificationLayout.vue';
import MainLayout from './layout/MainLayout.vue';
import Connexion from '@/components/Connexion.vue';
import Inscription from '@/components/Inscription.vue';
import ValidationEmail from '@/components/ValidationEmail.vue';
import ValidationPin from '@/components/ValidationPin.vue';
import Acceuil from '@/components/Acceuil.vue';
import Achat from '@/components/Achat.vue';
import Vente from '@/components/Vente.vue';
import Depot from '@/components/Depot.vue';
import Retrait from '@/components/Retrait.vue';
import PortefeuilleFond from '@/components/PortefeuilleFond.vue';
import PortefeuilleCrypto from '@/components/PortefeuilleCrypto.vue';
import Cours from '@/components/Cours.vue';
import Graphe from '@/components/Graphe.vue';

const routes = [
    {
        path: '/',
        name: 'AuthentificationLayout',
        component: AuthentificationLayout,
        children: [
            { path: '', redirect: 'connexion' },
            { path: 'connexion', name: 'connexion', component: Connexion },
            { path: 'inscription', name: 'inscription', component: Inscription },
            { path: 'validation-email', name: 'validationEmail', component: ValidationEmail },
            { path: 'validation-pin', name: 'validationPin', component: ValidationPin }
        ]
    },
    {
        path: '/compte',
        component: MainLayout,
        children: [
            { path: '', name: 'MainLayout', redirect: 'acceuil' },
            { path: 'acceuil', name: 'acceuil', component: Acceuil },
            { path: 'depot', name: 'depot', component: Depot },
            { path: 'retrait', name: 'retrait', component: Retrait },
            { path: 'achat', name: 'achat', component: Achat },
            { path: 'vente', name: 'vente', component: Vente },
            { path: 'cours', name: 'cours', component: Cours },
            { path: 'graphe', name: 'graphe', component: Graphe },
            { path: 'portefeuille-fond', name: 'portefeuillefond', component: PortefeuilleFond },
            { path: 'portefeuille-crypto', name: 'portefeuillecrypto', component: PortefeuilleCrypto }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;