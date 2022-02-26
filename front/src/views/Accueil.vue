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
    <section id="wall">
      <!---------- Nouveau message ----------->
      <div class="card new-message">
        <!---------- Avatar ---------->
        <div class="user">
          <div class="avatar">
            <img :src="userInfos.avatar" />
          </div>
          <div class="welcome">
            <h1>Bienvenue {{ userInfos.firstname }}</h1>
          </div>
        </div>
        <!---------- Zone de texte ---------->
        <div class="corps">
          <div>
            <input v-model="content" type="textarea" placeholder="  Quoi de neuf docteur ?"/>
          </div>
          <!---------- Boutons ---------->
          <div class="footer">
            <label for="file" class="label-file">
            <i class="fas fa-paperclip"><span class="fichier">
              {{ (uploadFile) ? uploadFile.name : "Sélectionnez un fichier" }}
            </span></i></label>
          <input id="file" accept="image/*" @change="uploadImage" class="input-file" type="file"/>
            <button @click="newMessage()" class="publier">Publier</button>
          </div>
        </div>
      </div>
      <!---------- Messages ----------->
      <div v-for="message in messages" :key="message.id" class="card">
        <!---------- Entête messages ---------->
        <div class="card_header">
          <div class="avatar">
            <img :src="message.User.avatar"/>
          </div>
          <div class="name">
            <p>{{message.User.firstname}} {{message.User.lastname}}</p>
          </div>
          <div class="when">
            <p>{{humanizeDate(message.createdAt)}}</p>
          </div>
        </div>
        <!---------- Corps du messages ---------->
        <div class="card_body">
          <a :href="'./messageGetOne/' + message.id">
          <div v-if="message.attachement !== null" class="files">
            <img :src="message.attachement" />
          </div>
          <div class="text">
            <p>{{ message.content }}</p>
          </div>
          </a>
          <!---------- Modif et Suppression ---------->
          <div v-if="message.owner" class="buttons">
             <a :href="'/MessageUpdate/' + message.id"><i class="far fa-edit"></i></a>
             <a :href="'/MessageDelete/' + message.id"><i class="far fa-trash-alt"></i></a>
          </div>
        </div>
        <!---------- Icons ---------->
        <div class="card_footer">
          <div class="comment">
            <p><i class="fas fa-comments"></i> <span class="number">{{message.Comments.length}}</span></p>
          </div>
          <div class="like">
            <p><i @click="likeClick($event, message.id)" class="fas fa-heart" v-bind:class="{ liked: message.liked }" ></i> <span class="number">{{message.Likes.length}}</span></p>
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
              <div v-if="commentMode === 'updateComment'" class=" comments_body">
                  <input type="text" name="content" :value="comment.content" @input="updateCommentField"/> 
                  <div class="buttons">
                    <button @click="updateComment(comment.id)" class="confirm">Sauvegarder</button>
                  </div>
              </div> 
              <div v-else-if="commentMode === 'deleteComment'" class="deleteMode comments_body">
                <p>Voulez-vous vraiment supprimé votre commentaire ?</p>
                <div class="buttons">
                  <button @click="deleteComment(comment.id)" class="confirm">Confirmer</button>
                  <button @click="getMode()" class="cancel">Annuler</button>
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
              <div v-if="comment.owner" class="buttons">
                <i @click="updateMode()" class="far fa-edit"></i>
                <i @click="deleteMode()" class="far fa-trash-alt"></i>
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
    this.$store.dispatch("getAllMessages");
    this.$store.dispatch("getAllComments", this.$store.state.messages.id);
  },
    computed: {
        ...mapState([
            "userInfos", 
            "messages", 
            "comments",
            "uploadFile"
        ]),
        ...mapGetters([
            "humanizeDate"
        ]),
    },
  data: function () {
    return {
      showComments: false,
      addPicture: false,
      previewImage: null,
      commentMode : 'Comment',
      content: '',
      date: ''
    };
  },
  methods: {
    //Afficharge des commentaires
    switchComments: function () {
      this.showComments = true;
    },
    uploadImage(e) {
      let image = e.target.files[0];
      this.$store.commit("uploadImage", {image});
    },    
    //Creation d'un nouveau message
    newMessage: function () {
      this.$store
        .dispatch("newMessage", {
          content: this.content,
          userId: this.$store.state.user.userId,
        })
        this.$router.go()	// Refreshes page
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error.message);
          }
        );
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
        this.commentMode = "Comment";
        this.$router.go()	// Refreshes page
    },
    //Suppression d'un commentaire
    deleteComment: function (commentId) {
        console.log('fonction delete');
        this.$store.dispatch("deleteComment", {
          messageId :this.$route.params.id, 
          commentId : commentId});
          this.commentMode = "Comment";
          this.$router.go()	// Refreshes page
    },
    //Changement de vue de comment
    getMode: function () {
        this.commentMode = 'Comment';
    },
    updateMode: function () {
        this.commentMode = 'updateComment';
    },
    deleteMode: function () {
        this.commentMode = 'deleteComment';
    },   

    //Like / Unlike
    likeClick : function (e, messageId) {
      console.log('likeClick');
      console.log(e);
      console.log(messageId);
      if (e.target.classList.contains('liked')) {
        console.log('todo : to dislike');
      } else {
        console.log('todo : to like');
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
#wall {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#wall .card {
  display: flex;
  flex-direction: column;
  width: 800px;
  height: auto;
  background: white;
  border-radius: 16px;
  margin: 10px;
}
#wall .avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
/********NOUVEAU MESSAGES*********/
#wall .new-message {
  display: flex;
  flex-direction: COLUMN;
  align-items: center;
  padding: 15px;
}
/**** HEADER ****/
#wall .new-message .user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
#wall .new-message .avatar {
  flex: 5%;
}
#wall .new-message .welcome {
  flex: 95%;
  align-self: center;
}
/****  BODY ****/
#wall .new-message .corps {
  width: 100%;
  margin: 10px;
}
#wall .new-message h1 {
  text-align: center;
  font-size: 18px;
  margin-block-start: 0px;
  margin-block-end: 10px;
}
#wall .new-message input {
  border-radius: 15px;
  border: solid 1px transparent;
  width: 100%;
  height: 40px;
  background: #eff4f7;
}
#wall .new-message .input-file {
  display: none;
}
/**** FOOTER ****/
#wall .new-message .footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
#wall .new-message .footer i {
  font-size: 18px;
  color: #1976d2;
}
#wall .new-message .footer .fichier {
  color: grey;
  font-size: 12px;
  font-weight: 300;
  margin-left: 8px;
}
#wall .new-message .publier {
  background: #1976d2;
  color: white;
  border-radius: 15px;
  border: none;
  padding: 8px;
}
/********MESSAGE PUBLIE*********/
/**** HEADER ****/
#wall .card_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
}
#wall .card_header .name {
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}
#wall .card_header .when {
  color: grey;
  font-size: 12px;
}
/**** BODY ****/
#wall .card_body img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
#wall .card_body .text {
  margin: 15px;
}
/**** BOUTTONS MODIF SUPP MESSAGE ****/
#wall .card_body .buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
/**** FOOTER ****/
#wall .card_footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 0px 10px;
}
#wall .card_footer .like {
  display: flex;
  flex-direction: row;
}
#wall .card_footer p {
  padding: 0 15px 0 15px;
}
#wall .card_footer i {
  font-size: 20px;
  color: grey;
}
#wall .card_footer .fa-comments {
  color: #1976d2;
}
#wall .card_footer .fa-heart {
  cursor: pointer;
}
#wall .card_footer .fa-heart.liked {
  color: #1976d2;
}
#wall .card_footer .number {
  font-size: 15px;
  color: grey;
  padding-left: 5px;
}

/********COMMENTAIRES*********/
#wall .card_comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
}
#wall .comments {
  display: flex;
  flex-direction: column;
  width: 750px;
  height: auto;
  background: #eff4f7;
  border-radius: 16px;
  margin-bottom: 5px;
}
/**** INPUT NOUVEAU COMMENTAIRE ****/
#wall .comments input {
  border-radius: 15px;
  border: solid 1px transparent;
  width: 100%;
  height: 40px;
  background: white;
}
#wall .publier {
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
#wall .comments .comments_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}
#wall .comments .comments_header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
/**** COMMENTAIRE BODY ****/ 
#wall .comments .comments_body p {
  margin-block: 0px;
  width: 100%;
}
#wall .comments .comments_body {
  display: flex;
  flex-direction: column;
  margin: 5px 5px 5px 15px;
  flex: 80%;
}
#wall .comments .comments_body .who {
  color: grey;
  font-size: 11px;
}
#wall .comments .comments_body .who .name {
  font-weight: bold;
  color: #1976d2;
}
#wall .comments .comments_body .text {
  font-size: 13px;
}
/******* SUPPRESSION ******/
#wall .deleteMode p {
    padding: 0px 5px 0px 5px ;
    font-size: 14px;
    margin: 15px 2px 10px 5px;
    text-align: center;
}
#wall .comments_body .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
/************* BOUTONS MODIF ET DELETE ************/
#wall .buttons i {
  font-size: 15px;
  margin: 15px;
  color: grey;
}
#getOneMessage .comments .buttons {
  display: flex;
  flex-direction: column;
}
#wall .buttons i:hover {
  color: #1976d2;
}
/**** BOUTONS COMMENT ****/
#wall .comments .buttons {
  display: flex;
  flex-direction: column;
}
</style>
