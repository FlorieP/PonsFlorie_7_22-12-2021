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
        <section id="messageDelete">
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
                    </div>
                    <div class="text">
                        <p>{{messageInfos.content}}</p>
                    </div>
                </div>
                <!---------- Icons ---------->
                <div class="card_footer">
                    <!---------- Infos ---------->
                    <div class="infos">
                        <p>Êtes-vous sûr de vouloir supprimer ce message ? </p>
                    </div>  
                    <!---------- Boutons ---------->
                    <div class="buttons">
                        <button @click="deleteMessage()" class="confirm">Confirmer</button>
                        <button @click="returnToMessage()" class="cancel">Annuler</button>
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
    ]),
    ...mapGetters([
      "humanizeDate"
    ]),
  },
    data: function () {
        return {
            mode : 'owner',
            commentMode: null,

        };
    },
    methods: {
        returnToMessage: function () {
            this.$router.push('/messageGetOne/' + this.$route.params.id);
        },
        deleteMessage: function () {
            this.$store.dispatch("deleteMessage", this.$route.params.id);
            this.$router.push('/accueil');
        }
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
#messageDelete {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#messageDelete .card {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: auto;
    background: white;
    border-radius: 16px;
    margin: 10px;
}
#messageDelete .avatar img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}
/********MESSAGE *********/
#messageDelete .card_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 15px;
}
#messageDelete .card_header .name {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
}
#messageDelete .card_header .when {
    color: grey;
    font-size: 12px;
}
#messageDelete .card_body img {
    width: 100%;
    height: 400px;
    object-fit: cover;
}
#messageDelete .card_body .text {
    margin: 15px;
}
#messageDelete .card_body .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
#messageDelete .card_footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
    background: #eff4f7;
    border-radius: 16px;
}
/******* SUPPRESSION ******/
#messageDelete .card_footer p {
    padding: 0px 5px 0px 5px ;
    font-size: 14px;
    margin: 15px 2px 10px 5px;
}
#messageDelete .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
#messageDelete .buttons button {
    background: #1976D2;
    color:white;
    border-radius: 15px;
    border: none;
    padding: 8px;
    margin: 0px 10px 10px 10px;
}
/******************** RESPONSIVE ********************/
/******** MOBILE ********/
@media screen and (max-width: 767px){
    #messageDelete {
        margin: 5px;
    }
    #messageDelete .card {
        width: 100%;
    }
    #messageDelete .comments {
        width: 100%;
    }
}

/******** TABLETTE ********/
@media screen and (min-width: 768px) and (max-width: 806px){
    #messageDelete {
        margin: 5px;
    }
    #messageDelete .card {
        width: 100%;
    }
    #messageDelete .comments {
        width: 100%;
    }
}
</style>