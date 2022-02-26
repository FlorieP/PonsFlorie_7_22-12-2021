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
            <p>Date | Heure</p>
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
          <div v-if="mode == 'owner'" class="buttons">
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
            <p><i class="fas fa-heart"></i> <span class="number">{{message.Likes.length}}</span></p>
            <!--<p><i class="fas fa-heart-broken"></i> <span class="number">2</span></p>-->
          </div>
        </div>
      </div>
      <!---------- Messages ----------->
      <div class="card">
        <!---------- Entête messages ---------->
        <div class="card_header">
          <div class="avatar">
            <img src="../assets/avatar-man.png" />
          </div>
          <div class="name">
            <p>Nom Prénom</p>
          </div>
          <div class="when">
            <p>Date | Heure</p>
          </div>
        </div>
        <!---------- Corps du messages ---------->
        <div class="card_body">
          <div class="files">
            <img src="../assets/flower.jpg" />
          </div>
          <div class="text">
            <p>Mon super texte qui détaille ma super image.</p>
          </div>
        </div>
        <!---------- Icons ---------->
        <div class="card_footer">
          <div class="comment">
            <p>
              <i @click="switchComments()" class="fas fa-comments"></i>
              <span class="number">2</span>
            </p>
          </div>
          <div class="like">
            <p><i class="fas fa-heart"></i> <span class="number">6</span></p>
            <p>
              <i class="fas fa-heart-broken"></i> <span class="number">2</span>
            </p>
          </div>
        </div>
        <!---------- Commentaires ---------->
        <div v-show="showComments === true" class="card_comments">
          <div class="comments">
            <!---------- Entête messages ---------->
            <div class="comments_header">
              <div class="avatar">
                <img src="../assets/avatar-woman.png" />
              </div>
              <div class="comments_body">
                <div class="who">
                  <p>Publié par <span class="name">Nom Prénom</span> le Date à Heure</p>
                </div>
                <div class="text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac rhoncus nibh, sed placerat nisl. Praesent nisi massa, varius tincidunt erat accumsan, molestie lobortis orci. Etiam in magna ut neque congue luctus. Pellentesque dignissim laoreet luct.</p>
                </div>
              </div>
              <div v-if="mode == 'owner'" class="buttons">
                <i class="far fa-edit"></i>
                <i class="far fa-trash-alt"></i>
              </div>
            </div>
          </div>
          <div class="comments">
            <!---------- Entête messages ---------->
            <div class="comments_header">
              <div class="avatar">
                <img src="../assets/avatar-woman.png" />
              </div>
              <div class="comments_body">
                <div class="who">
                  <p>Publié par <span class="name">Nom Prénom</span> le Date à Heure</p>
                </div>
                <div class="text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac rhoncus nibh, sed placerat nisl. Praesent nisi massa, varius tincidunt erat accumsan, molestie lobortis orci. Etiam in magna ut neque congue luctus. Pellentesque dignissim laoreet luct.</p>
                </div>
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

export default {
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/login");
      return;
    }
    this.$store.dispatch("getUserInfos", this.$store.state.user.userId);
    this.$store.dispatch("getAllMessages");
    console.log(this.$store.state.messages);	
  },
  computed: mapState(["userInfos", "messages", "uploadFile"]),
  data: function () {
    return {
      showComments: false,
      addPicture: false,
      mode: "owner",
      previewImage: null,
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
#wall .card_footer .fa-heart:hover {
  color: #1976d2;
}
#wall .card_footer .fa-heart-broken:hover {
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
/**** COMMENT HEADER ****/
#wall .comments .comments_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
}
#wall .comments .comments_header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
/**** COMMENT BODY ****/
#wall .comments .comments_body p {
  margin-block: 0px;
}
#wall .comments .comments_body {
  margin: 5px 5px 5px 15px;
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

/************* BOUTONS MODIF ET DELETE ************/
#wall .buttons i {
  font-size: 15px;
  margin: 15px;
  color: grey;
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
