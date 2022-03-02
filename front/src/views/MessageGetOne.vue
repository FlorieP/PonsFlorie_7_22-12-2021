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
    <section id="getOneMessage">
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
        <!---------- Modif et Suppression ---------->
        <div class="buttons buttons_message">
          <a :href="'/messageUpdate/' + this.$route.params.id" v-if="messageInfos.owner"><i class="far fa-edit"></i></a>
          <a :href="'/messageDelete/' + this.$route.params.id" v-if="messageInfos.owner || userInfos.isAdmin"><i class="far fa-trash-alt"></i></a>
        </div>
        <!---------- Icons ---------->
        <div class="card_footer">
          <div class="comment">
            <p><i class="fas fa-comments"></i> <span class="number">{{messageInfos.Comments.length}}</span></p>
          </div>
          <div class="like">
            <p><i @click="likeClick($event, messageInfos.id)" class="fas fa-heart" v-bind:class="{ liked: messageInfos.liked }" ></i> <span class="number">{{messageInfos.Likes.length}}</span></p>
          </div>
        </div>
        <!---------- Commentaires ---------->
        <div class="card_comments">
          <!---------- Nouveau Commentaires ---------->
          <div class="comments">
            <div class="comments_header">
              <div class="avatar">
                <img :src="userInfos.avatar"/>
              </div>
              <div class="comments_body">
                <input v-model="content" type="textarea" placeholder="  Quoi de neuf docteur ?"/>
                <button @click="newComment()" class="publier">Publier</button>
              </div>
            </div>
          </div>
          <!---------- Commentaires ---------->
          <div v-for="comment in comments" :key="comment.id" class="comments">
            <div class="comments_header">
              <div class="avatar">
                <img :src="comment.User.avatar" />
              </div>
              <div v-if="commentUpdateMode.indexOf(comment.id) > -1" class=" comments_body">
                  <input type="text" name="content" :value="comment.content" @input="updateCommentField"/> 
                  <div class="buttons">
                    <button @click="updateComment(comment.id)" class="confirm">Sauvegarder</button>
                  </div>
              </div> 
              <div v-else-if="commentDeleteMode.indexOf(comment.id) > -1" class="deleteMode comments_body">
                <p>Voulez-vous vraiment supprimé votre commentaire ?</p>
                <div class="buttons">
                  <button @click="deleteComment(comment.id)" class="confirm">Confirmer</button>
                  <button @click="toggleDeleteComment(comment.id)" class="cancel">Annuler</button>
                </div>
              </div>
              <div v-else class="comments_body">
                <div class="who">
                  <p>Publié par <span class="name">{{comment.User.firstname}} {{comment.User.lastname}}</span> le {{humanizeDate(comment.createdAt)}}</p>
                </div>
                <div class="text">
                  <p>{{comment.content}}</p>
                </div>
              </div>
              <div class="buttons">
                <i v-if="comment.owner" @click="toggleUpdateComment(comment.id)" class="far fa-edit"></i>
                <i v-if="comment.owner || userInfos.isAdmin" @click="toggleDeleteComment(comment.id)" class="far fa-trash-alt"></i>
              </div>
            </div>
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
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/login");
      return;
    }
      this.$store.dispatch("getUserInfos", this.$store.state.user.userId);
      this.$store.dispatch("getOneMessage", this.$route.params.id);
      this.$store.dispatch("getAllComments", this.$route.params.id);
      console.log(this.$store.state.messageInfos);
  },
  computed: {
    ...mapState([
      "userInfos", 
      "messageInfos",
      "comments"
    ]),
    ...mapGetters([
      "humanizeDate"
    ]),
  },
  data: function () {
    return {
      commentUpdateMode : [],
      commentDeleteMode : [],
      content: '',
      date: '',

    };
  },
  methods: {
    //Affichage / masquage UpdateComment
    toggleUpdateComment: function (commentId) {
      let deleteIdx = this.commentDeleteMode.indexOf(commentId);
      if (deleteIdx > -1) {
        // on s'assure de ne pas être en mode delete
        this.commentDeleteMode.splice(deleteIdx, 1);
      }
      let updateIdx = this.commentUpdateMode.indexOf(commentId);
      if (updateIdx > -1) {
        // commentId déjà là -> on le retire pour changer de mode
        this.commentUpdateMode.splice(updateIdx, 1);
      } else {
        // commentId pas là -> on l'ajoute pour changer de mode
        this.commentUpdateMode.push(commentId);
      }
    },
    //Affichage / masquage DeleteComment
    toggleDeleteComment: function (commentId) {
      let updateIdx = this.commentUpdateMode.indexOf(commentId);
      if (updateIdx > -1) {
        // on s'assure de ne pas être en mode delete
        this.commentUpdateMode.splice(updateIdx, 1);
      }
      let foundIdx = this.commentDeleteMode.indexOf(commentId);
      if (foundIdx > -1) {
        // commentId déjà là -> on le retire pour changer de mode
        this.commentDeleteMode.splice(foundIdx, 1);
      } else {
        // commentId pas là -> on l'ajoute pour changer de mode
        this.commentDeleteMode.push(commentId);
      }
    },
    //fonction qui récupère le nom des champs etr les valeurs pour les envoyer au mutateur
    updateCommentField(e) {
        this.$store.commit("updateCommentField", {
            newValue: e.target.value,
            fieldName: e.target.name,
        });
    },
    //Creation d'un nouveau message
    newComment: function () {
      console.log('fonction new');
       this.$store
        .dispatch("newComment", {
          valeurContent: this.content,
          messageId : this.$route.params.id,
        })
        .then(
          (response) => {
            console.log(response);
            this.$router.go()	// Refreshes page
          },
          (error) => {
            console.log(error.message);
          }
        ); 
    },
    //Modification d'un commentaire
    updateComment: function (commentId) {
      console.log('fonction update');
        console.log("Messageid " + this.$route.params.id + " Comment id " + commentId);
        this.$store.dispatch("updateComment", {
          messageId :this.$route.params.id, 
          commentId : commentId});
        this.$router.go()	// Refreshes page
    },
    //Suppression d'un commentaire
    deleteComment: function (commentId) {
        console.log('fonction delete');
        this.$store.dispatch("deleteComment", {
          messageId :this.$route.params.id, 
          commentId : commentId});
          this.$router.go()	// Refreshes page
    },
    //Like / Unlike
    likeClick : function (e, messageId) {
      console.log('likeClick');
      console.log(e);
      console.log(messageId);
      if (e.target.classList.contains('liked')) {
        console.log('todo : to dislike');
        this.$store.dispatch('unlike', messageId)
        .then(
          (response) => {
            console.log(response);
            this.$router.go()	// Refreshes page
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log('todo : to like');
        this.$store.dispatch('like', messageId)
  
        .then(
          (response) => {
            console.log(response);
            this.$router.go()	// Refreshes page
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    }        
  },
};
</script>

<style scoped>
/**** BODY ****/
body {
  background-color: #d0e1f2;
  max-width: 100%;
  margin: 0px;
  font-size: 15px;
}
/******** MUR DE PUBLICATION *********/
#getOneMessage {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#getOneMessage .card {
  display: flex;
  flex-direction: column;
  width: 800px;
  height: auto;
  background: white;
  border-radius: 16px;
  margin: 10px;
}
#getOneMessage .avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
/********MESSAGE HEADER*********/
#getOneMessage .card_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
}
#getOneMessage .card_header .name {
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}
#getOneMessage .card_header .when {
  color: grey;
  font-size: 12px;
}
/**** MESSAGE BODY */
#getOneMessage .card_body img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
#getOneMessage .card_body .text {
  margin: 15px;
}
/**** MESSAGE FOOTER ****/
#getOneMessage .card_footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 15px 0px 15px;
}
#getOneMessage .card_footer .like {
  display: flex;
  flex-direction: row;
}
#getOneMessage .card_footer p {
  padding: 0 15px 0 15px;
}
#getOneMessage .card_footer i {
  font-size: 20px;
  color: grey;
}
#getOneMessage .card_footer .fa-comments {
  color: #1976d2;
}
#getOneMessage .card_footer .fa-heart {
  cursor: pointer;
}
#getOneMessage .card_footer .fa-heart.liked {
  color: #1976d2;
}
 #getOneMessage.card_footer .number {
  font-size: 15px;
  color: grey;
  padding-left: 5px;
}
/********COMMENTAIRES*********/
#getOneMessage .card_comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
}
#getOneMessage .comments {
  display: flex;
  flex-direction: column;
  width: 750px;
  height: auto;
  background: #eff4f7;
  border-radius: 16px;
  margin-bottom: 5px;
}
/**** INPUT NOUVEAU COMMENTAIRE ****/
#getOneMessage .comments input {
  border-radius: 15px;
  border: solid 1px transparent;
  width: 100%;
  height: 40px;
  background: white;
}
#getOneMessage .publier {
  display: flex;
  flex-direction: row;
  background: #1976d2;
  color: white;
  border-radius: 15px;
  border: none;
  padding: 8px;
  margin-top: 10px;
  align-self: flex-end;
}
/**** COMMENTAIRE HEADER ****/
#getOneMessage .comments .comments_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}
#getOneMessage .comments .comments_header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
/**** COMMENTAIRE BODY ****/ 
#getOneMessage .comments .comments_body p {
  margin-block: 0px;
  width: 100%;
}
#getOneMessage .comments .comments_body {
  display: flex;
  flex-direction: column;
  margin: 5px 5px 5px 15px;
  flex: 80%;
}
#getOneMessage .comments .comments_body .who {
  color: grey;
  font-size: 11px;
}
#getOneMessage .comments .comments_body .who .name {
  font-weight: bold;
  color: #1976d2;
}
#getOneMessage .comments .comments_body .text {
  font-size: 13px;
}
/************* BOUTONS MODIF ET DELETE ************/
#getOneMessage .buttons_message {
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  margin-right: 15px ;
}
#getOneMessage .comments .buttons {
  display: flex;
  flex-direction: column;
}
#getOneMessage .buttons i {
  font-size: 15px;
  margin: 8px 15px 8px 8px;
  color: grey;
}
#getOneMessage .buttons i:hover {
  color: #1976d2;
}
/******* SUPPRESSION ******/
#getOneMessage .deleteMode p {
    padding: 0px 5px 0px 5px ;
    font-size: 14px;
    margin: 15px 2px 10px 5px;
    text-align: center;
}
#getOneMessage .comments_body .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
#getOneMessage .buttons button {
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
    #getOneMessage {
        margin: 5px;
    }
    #getOneMessage .card {
        width: 100%;
    }
    #getOneMessage .comments {
        width: 100%;
    }
}

/******** TABLETTE ********/
@media screen and (min-width: 768px) and (max-width: 806px){
    #getOneMessage {
        margin: 5px;
    }
    #getOneMessage .card {
        width: 100%;
    }
    #getOneMessage .comments {
        width: 100%;
    }
}
</style>