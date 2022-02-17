//Importation des moduldes de Vue
import { createStore } from 'vuex'

//Axios
const axios = require('axios');

//Création du store
const store = createStore({
    state: {

    },
    actions: {
        //Fonction SignUp
        signup : ({commit}, userInfos) => {
            commit,
            console.log(userInfos);
            axios.post('http://localhost:3000/api/user/signup', userInfos)
            .then(response => console.log(response))
           .catch(error => console.log(error.message));
        
        },
        //Fonction SignUp
        login(){
            axios.post('http://localhost:3000/api/user/login', {
                email: this.email,
                password: this.password
            }).then(response => console.log(response))
            .catch(error => console.log(error));
        } 
    }
})

//Exportation du store
export default store;