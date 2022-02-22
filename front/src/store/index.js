//Importation des moduldes de Vue
import { createStore } from 'vuex'

//Axios
const axios = require('axios');

//Récupération des informations du User
let user = localStorage.getItem('user');
if (!user){
    user= {
        userId: -1,
        token: '',
    };
} else {
    try{
        user= JSON.parse(user);
        axios.defaults.headers.common['Authorization'] = `token ${user.token}`;
    } catch (ex) {
        user= {
            userId: -1,
            token: '',
        };
    }
}

//Création du store
const store = createStore({

    state: {
        status: '',
        user : user,
        userInfos: {
            lastname: '',
            firstname: '',
            email: '',
            bio: '',
            avatar: '',
        }
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            //Rajoute un token dans le header de toutes les requêtes
            axios.defaults.headers.common['Authorization'] = `token ${user.token}`;
            console.log(user.token);
            //Envoi des données utilisateurs dans le local storage
            localStorage.setItem('user', JSON.stringify(user));
            //MAJ le state de user de l'utilisateur connecté
            state.user = user;
        },
        userInfos: function(state, userInfos) {
            state.userInfos = userInfos;
        }
    },
    actions: {
        //Fonction SignUp
        signup : ({commit}, userInfos) => {
            return new Promise ((resolve, reject) => {
                commit('setStatus', 'loading');
                console.log(userInfos);
                axios.post('http://localhost:3000/api/user/signup', userInfos)
                .then(response => {
                        console.log(response),
                        commit('setStatus', 'created');
                        resolve(response);
                })
               .catch(error => {
                    console.log(error),
                    commit('setStatus', 'error_create');
                    reject(error);
                })
            })
            
        },
        //Fonction Login
        login : ({commit}, userInfos ) => {
            return new Promise ((resolve, reject) => {
                commit('setStatus', 'loading');
                console.log(userInfos);
                axios.post('http://localhost:3000/api/user/login', userInfos)
                .then(response => {
                        console.log(response),
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                })
               .catch(error => {
                    console.log(error),
                    commit('setStatus', 'error_login');
                    reject(error);
                })
            })
            
        },
        //Fonction de récupération des infos utilisateur
        getUserInfos : ({commit}, userId)=> {
            console.log(commit);
            console.log(userId);
            axios.get(`http://localhost:3000/api/user/profil/${userId}`)
            .then(response => {
                console.log(response);
                commit('userInfos', response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        //Fonction ModifyProfile
        modifyProfile : ({commit}, userId) => {
            return new Promise ((resolve, reject) => {
                commit;
           
                axios.put(`http://localhost:3000/api/user/profil/${userId}`)
                .then(response => {
                    console.log(response)
                    resolve(response);
                })
               .catch(error => {
                    console.log(error)
                    reject(error);
                })
            })
            
        },
    }
})

window.store = store;

//Exportation du store
export default store;