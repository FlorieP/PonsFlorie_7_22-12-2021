//Importation des modules du routeur
import { createWebHistory, createRouter } from "vue-router";

//Importation des routes
import Login from "@/views/Login.vue";
import Accueil from "@/views/Accueil.vue";
import Profile from "@/views/Profile.vue";

//Création du tableau de routes
const routes = [
  //route pour l'inscription et la connexion
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  //route pour la page d'acceuil
  {
    name: 'accueil',
    path: '/accueil',
    component: Accueil,
  },
  //route pour la page de profil utilisateur
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
  }
]

//Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

//Exportation du router
export default router;