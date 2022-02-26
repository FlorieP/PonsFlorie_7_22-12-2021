<template>
    <div class="body">
        <!---------- HEADER ----------->
        <header id="header">
        <!---------- Logo ---------->
        <div id="logo">
            <img src="../assets/icon-left-font-monochrome-black.png" alt="logoGroupomania" title="Groupomania"/>
        </div>
         <!---------- Menu ---------->
        <nav id="menu">
            <ul>
                <li>
                    <a href="/Accueil"><i class="fas fa-home"></i></a>
                </li>
                <li>
                    <a href="/Profile"><i class="fas fa-user"></i></a>
                </li>
            </ul>
        </nav>
        </header>
        <!---------- CORPS ----------->
        <section id="messageUpdate">
            <!---------- Messages ----------->
            <div class="card">
                <!---------- Entête messages ---------->
                <div class="card_header">
                    <div class="avatar">
                        <img :src="messageInfos.User.avatar" />
                    </div>
                    <div class="name">
                        <p>{{messageInfos.User.firstname}} {{messageInfos.User.lastname}}</p>
                     </div>
                    <div class="when">
                        <p>{{humanizeDate(messageInfos.createdAt)}}</p>
                    </div>
                </div>
                <!---------- Corps du messages ---------->
                <div class="card_body">
                    <div v-if="messageInfos.attachement !== null" class="files">
                        <img :src="messageInfos.attachement" />
                        <label for="file" class="label-file">
                            <i class="fas fa-paperclip"><span class="fichier">
                            {{ (uploadFile) ? uploadFile.name : "Sélectionnez un fichier" }}
                            </span></i></label>
                        <input id="file" accept="image/*" @change="uploadImage" class="input-file" type="file"/>
                    </div>
                    <div class="text">
                        <input type="text" name="content" :value="messageInfos.content" @input="updateMessageField" />    
                    </div>
                </div>
                <!---------- Icons ---------->
                <div class="card_footer">
                    <!---------- Boutons ---------->
                    <div class="buttons">
                        <button @click="updateMessage()" class="confirm">Sauvegarder</button>
                    </div>
                </div>
            </div>
         </section>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
    mounted: function () {
        //console.log(this.$store.state.user);
        if (this.$store.state.user.userId == -1) {
            this.$router.push("/login");
            return;
        }
        this.$store.dispatch("getUserInfos", this.$store.state.user.userId);
        this.$store.dispatch("getOneMessage", this.$route.params.id);
        console.log(this.$store.state.messages);
        console.log(this.$route.params.id);
    },
    computed: {
        ...mapState([
            "userInfos", 
            "messageInfos", 
            "uploadFile"
        ]),
        ...mapGetters([
            "humanizeDate"
        ]),
    },
    data: function () {
        return {
            mode : 'owner',
        };
    },
    methods: {
        uploadImage(e) {
            let image = e.target.files[0];
            this.$store.commit("uploadImage", {image});
        },
        //fonction qui récupère le nom des champs etr les valeurs pour les envoyer au mutateur
        updateMessageField(e) {
            this.$store.commit("updateMessageField", {
                newValue: e.target.value,
                fieldName: e.target.name,
            });
        },
        //Modification d'un message
        updateMessage: function () {
            console.log('Bouh1' + this.$route.params.id);
            this.$store.dispatch("updateMessage", this.$route.params.id);
            this.$router.push('/messageGetOne/' + this.$route.params.id);
        },
    },
};
</script>

<style scoped>
body {
    background-color: #d0e1f2;
    max-width: 100%;
    margin: 0px;
    font-size: 15px;
}
/******** MUR DE PUBLICATION *********/
#messageUpdate {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#messageUpdate .card {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: auto;
    background: white;
    border-radius: 16px;
    margin: 10px;
}
#messageUpdate .avatar img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}
/********MESSAGE *********/
#messageUpdate .card_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 15px;
}
#messageUpdate .card_header .name {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
}
#messageUpdate .card_header .when {
    color: grey;
    font-size: 12px;
}
#messageUpdate .card_body img {
    width: 100%;
    height: 400px;
    object-fit: cover;
}
#messageUpdate .files {
    display: flex;
    flex-direction: column;
}
#messageUpdate .card_body .text {
    margin: 15px;
}
/**** INPUT ****/
#messageUpdate input {
  border-radius: 15px;
  border: solid 1px transparent;
  width: 100%;
  height: 35px;
  padding: 0px 10px 0px 10px;
  background: #eff4f7;
}
#messageUpdate .files input {
    display: flex;
    align-self: flex-end;
    margin: 15px;
}
#messageUpdate .text input {
    border-radius: 15px;
    border: solid 1px transparent;
    width: 100%;
    height: 35px;
    padding: 0px 10px 0px 10px;
    background: #eff4f7;
}
/**** BOUTTONS MODIF SUPP MESSAGE ****/
#messageUpdate .card_body .buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
/**** FOOTER ****/
#messageUpdate .card_footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
}
/******* BOUTTONS ******/
#messageUpdate .buttons button {
    background: #1976D2;
    color:white;
    border-radius: 15px;
    border: none;
    padding: 8px;
    margin: 0px 10px 10px 10px;
}
</style>