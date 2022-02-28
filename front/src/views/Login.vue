<template>
  <div class="body">
    <div class="card">
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>
      <p class="card__subtitle" v-if="mode == 'login'">
        Tu n'as pas encore de compte ?
        <span class="card__action" @click="switchToSignup()"
          >Créer un compte</span
        >
      </p>
      <p class="card__subtitle" v-else>
        Tu as déjà un compte ?
        <span class="card__action" @click="switchToLogin()">Se connecter</span>
      </p>
      <div class="form" v-if="mode == 'signup'">
        <input v-model="firstname" class="form__input" type="text" placeholder="Prénom"/>
        <input v-model="lastname" class="form__input" type="text" placeholder="Nom"/>
      </div>
      <div class="form">
        <input v-model="email" class="form__input" type="email" placeholder="Adresse mail"/>
      </div>
      <div class="form">
        <input v-model="password" class="form__input" type="password" placeholder="Mot de passe"/>
      </div>
      <div class="form message_error" v-if="mode == 'login' && status == 'error_login'">
        <p>Adresse mail et/ou mot de passe invalide</p>
      </div>
      <div class="form message_error" v-if="mode == 'create' && status == 'error_create'">
        <p>Adresse mail déjà utilisée</p>
      </div>
      <div class="form">
        <button @click="login()" class="button" :class="{ 'button--disabled': !validatedFields }" v-if="mode == 'login'">
          <span v-if="status == 'loading'">Connexion en cours</span>
          <span v-else>Se connecter</span>
        </button>
        <button @click="signup()" class="button" :class="{ 'button--disabled': !validatedFields }" v-else>
          <span v-if="status == 'loading'">Création en cours</span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      mode: "login",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "signup") {
        if (
          this.firstname != "" &&
          this.lastname != "" &&
          this.email != "" &&
          this.password != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    switchToLogin: function () {
      this.mode = "login";
    },
    switchToSignup: function () {
      this.mode = "signup";
    },
    signup: function () {
      const self = this;
      this.$store.dispatch('signup',  {
        email: this.email,
        lastname: this.lastname,
        firstname: this.firstname,
        password: this.password
      })
      .then(response => {
        console.log(response);
        self.login();
      }, error => {
        console.log(error.message)
      })
    },
    login: function () {
      const self = this.$router;
      this.$store.dispatch('login',  {
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log(response);
        self.push('/accueil');
      }, error => {
        console.log(error.message)
      })
    },
  },
};
</script>

<style scoped>
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}

.card {
  max-width: 100%;
  width: 500px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.card__title {
  text-align: center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.button {
  background: #1976d2;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #1976d2;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
}
.button {
  background: #cecece;
  color: #ececec;
}
.button:hover {
  background: #1976d2;
}

.form {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.message_error {
  color: red;
  justify-content: center;
  font-size: 13px;
}

.form__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #eff4f7;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}

.form__input::placeholder {
  color: #aaaaaa;
}
/******************** RESPONSIVE ********************/
/******** MOBILE ********/
@media screen and (max-width: 505px){
body{
  margin: 5px;
} 
.card {
  width: 100%;
}
.card .card__subtitle{
  display: flex;
  flex-direction: column;
}
}
</style>