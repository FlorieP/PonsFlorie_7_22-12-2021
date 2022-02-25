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
        // USER //
        user : user,
        userInfos: {
            lastname: '',
            firstname: '',
            email: '',
            bio: '',
            avatar: '',
        },
        //MESSAGE //
        //Tous les messages
        messages: [],
        //Un message
        messageInfos: {
            content: '',
            attachement: '',
            createdAt: '',
            User:{
                avatar:'', 
                firstname :'', 
                lastname: '',
            }
         },
        //MESSAGE //
        //Tous les commentaires
        comments: [],
        commentInfos: {
            content: '',
            createdAt: '',
            User:{
                avatar:'', 
                firstname :'', 
                lastname: '',
            }
         },
    },
    getters: {
        humanizeDate: function(state, dateIso) {
            if (!dateIso) {
                return ""
            }
            const dateToHumanize = new Date(dateIso);
            const dateHumanized = new Intl.DateTimeFormat('fr-FR').format(dateToHumanize);
            const timeHumanized = new Intl.DateTimeFormat('fr-FR', {timeStyle: 'short' }).format(dateToHumanize);
            return `${dateHumanized} | ${timeHumanized}`;
        }
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        ////////////////// MUTATIONS DE USER ////////////////// 
        //MAJ du state user 
        logUser: function (state, user) {
            //Rajoute un token dans le header de toutes les requêtes
            axios.defaults.headers.common['Authorization'] = `token ${user.token}`;
            console.log(user.token);
            //Envoi des données utilisateurs dans le local storage
            localStorage.setItem('user', JSON.stringify(user));
            //MAJ le state de user de l'utilisateur connecté
            state.user = user;
        },
        //MAJ du state userInfos
        userInfos: function(state, userInfos) {
            state.userInfos = userInfos;
        },
        //MAJ du state userInfos après MAJ profile par user
        updateUserField (state, {newValue, fieldName }) {
            state.userInfos[fieldName] = newValue
        },
       /* uploadImage (state, {imageUrl}) {
            state.userInfos.avatar= imageUrl;
        },*/
        ////////////////// MUTATIONS DE MESSAGE ////////////////// 
        //MAJ du state messageInfos après MAJ updateMessage
        updateMessageField (state, {newValue, fieldName }) {
            state.messageInfos[fieldName] = newValue,
            console.log(fieldName),
            console.log(newValue)
        },    
        //MAJ du state du tableau messages
        messages: function(state, messages) {
            state.messages = messages;
        },
        //MAJ du state d'un message
        messageInfos: function(state, messageInfos) {
            state.messageInfos = messageInfos;
        },
        ////////////////// MUTATIONS DE COMMENTAIRE ////////////////// 
        //MAJ du state messageInfos après MAJ updateMessage
        updateCommentField (state, {newValue, fieldName }) {
            state.commentInfos[fieldName] = newValue,
            console.log(fieldName),
            console.log(newValue)
        },    
        //MAJ du state du tableau messages
        comments: function(state, comments) {
            state.comments = comments;
        },
    },
    actions: {
        ///////////////////  ACTIONS USER ////////////////// 
        //Fonction d'inscription de l'utilisateur
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
        //Fonction de connexion de l'utilisateur
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
            //console.log(commit);
            //console.log(userId);
            axios.get(`http://localhost:3000/api/user/profil/${userId}`)
            .then(response => {
                //console.log(response);
                commit('userInfos', response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        //Fonction de modification du profil utilisateur
        modifyProfile : ({commit, state}) => {
            console.log(state.user.userId)
            console.log(commit)
            let userId = state.user.userId;
                return new Promise ((resolve, reject) => {
                commit;
                axios.put(`http://localhost:3000/api/user/profil/${userId}`, state.userInfos)
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
        //Fonction de suppression de l'utilisateur
        deleteProfile : ({commit, state}) => {
            console.log(state.user.userId)
            console.log(commit)
            let userId = state.user.userId;
            return new Promise ((resolve, reject) => {
                commit;
                axios.delete(`http://localhost:3000/api/user/profil/${userId}`, state.userInfos)
                .then(response => {
                    //console.log(response)
                    resolve(response);
                })
               .catch(error => {
                    console.log(error)
                    reject(error);
                })
            })  
        },

        ///////////////////  ACTIONS MESSAGE ////////////////// 
        //Fonction de récupération de tous les messages
        getAllMessages : ({commit})=> {
            axios.get(`http://localhost:3000/api/message/`)
                .then(response => {
                    commit('messages', response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        },
        //Fonction de récupération des infos d'un message
        getOneMessage : ({commit}, messageId)=> {
            axios.get(`http://localhost:3000/api/message/${messageId}`)
                .then(response => {
                    console.log(messageId);
                    commit('messageInfos', response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
            },
        //Fonction de création d'un nouveau message
        newMessage : ({commit}, messages) => {
            return new Promise ((resolve, reject) => {
                console.log(messages);
                axios.post('http://localhost:3000/api/message/new', messages)
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
        //Fonction de modification d'un message
        updateMessage : ({commit, state}, messageId) => {
            console.log(commit)
            console.log('id du message est :' + messageId)
            console.log('bouh 2' + state.messageInfos)
            return new Promise ((resolve, reject) => {
            commit;
            axios.put(`http://localhost:3000/api/message/${messageId}`, state.messageInfos)
                .then(response => {
                    console.log(response)
                    resolve(response);
                })
               .catch(error => {
                    console.log(error.message)
                    reject(error.message);
                })
            })
        },
        //Fonction de suppression d'un message
        deleteMessage : ({commit}, messageId) => {
            console.log(commit)
            console.log('id du message est :' + messageId)
            return new Promise ((resolve, reject) => {
                commit;
                axios.delete(`http://localhost:3000/api/message/${messageId}`)
                .then(response => {
                    //console.log(response)
                    resolve(response);
                })
               .catch(error => {
                    console.log(error.message)
                    reject(error.message);
                })
            })  
        },
        
        ///////////////////  ACTIONS COMMENTAIRE ////////////////// 
        //Fonction de récupération de tous les commentaires
        getAllComments : ({commit}, messageId)=> {
            axios.get(`http://localhost:3000/api/message/${messageId}/comment'`)
                .then(response => {
                    commit('comments', response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        },
        //Fonction de modification d'un commentaire
        updateComment : ({commit, state}, messageId, commentId) => {
            console.log(commit)
            console.log('id du message est :' + messageId + 'id du comment est :' + commentId)
            return new Promise ((resolve, reject) => {
            commit;
            axios.put(`http://localhost:3000/api/message/${messageId}/comment/${commentId}`, state.commentInfos)
                .then(response => {
                    console.log(response)
                    resolve(response);
                })
               .catch(error => {
                    console.log(error.message)
                    reject(error.message);
                })
            })
        },
        //Fonction de suppression d'un commentaire
        deleteComment : ({commit}, messageId, commentId) => {
            console.log(commit)
            console.log('id du message est :' + messageId + 'id du comment est :' + commentId)
            return new Promise ((resolve, reject) => {
                commit;
                axios.delete(`http://localhost:3000/api/message/${messageId}/comment/${commentId}`)
                .then(response => {
                    //console.log(response)
                    resolve(response);
                })
               .catch(error => {
                    console.log(error.message)
                    reject(error.message);
                })
            })  
        },
    }   
})

window.store = store;

//Exportation du store
export default store;