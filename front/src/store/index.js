//Importation des moduldes de Vue
import { createStore } from 'vuex'

//Axios
const axios = require('axios');

//Création du store
const store = createStore({
    state: {
        status: '',
        user: {
            userId: -1,
            token: '',
        },
        userInfos: {
            nom: '',
            prenom: '',
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
            axios.defaults.headers.common['Authorization'] = user.token;
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
        login : ({commit}, userInfos) => {
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
        getUserInfos : ()=> {
        }
    }
})

//Exportation du store
export default store;