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
                        <li><a href="/Accueil"><i class="fas fa-home"></i></a></li>
                        <li><a href="/Profile"><i class="fas fa-user"></i></a></li>
                    </ul>
                </nav>
        </header> 
        <!---------- CORPS ----------->
        <section id="profil">
            <div class="card">
                <!---------- Profil ---------->
                <h1>{{ userInfos.firstname }} {{ userInfos.lastname }}</h1>
                <!---------- Avatar ---------->
                <div class="avatar">
                    <img :src="userInfos.avatar"/> 
                </div>
                <!---------- Infos ---------->
                <div class="infos">
                   <h2>Email</h2>
                   <p>{{ userInfos.email }}</p>
                   <h2>Bio</h2>
                   <p>{{ userInfos.bio }}</p> 
                </div>  
                <!---------- Boutons ---------->
                <div class="buttons">
                    <a href="/ProfileUpdate"><i class="fas fa-user-edit"></i></a>
                    <a href="/ProfileDelete"><i class="far fa-trash-alt"></i></a>
                </div>
            </div>   
        </section>  
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    mounted: function() {
        console.log(this.$store.state.user);
        if (this.$store.state.user.userId == -1){
            this.$router.push('/login');
            return;
        }
        this.$store.dispatch('getUserInfos', this.$store.state.user.userId);
    },
    computed: mapState([
        'userInfos'
    ])
}
</script>

<style scoped>
body {
  background-color: #D0E1F2;
  max-width: 100%;
  margin: 0px;
  font-size: 15px;
}
/******** PROFIL *********/
#profil{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#profil .card {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: auto;
    background: white;
    border-radius: 16px;
    margin: 10px;
    padding: 10px;
}
h1{
    text-align: center;
}
#profil .avatar{
    display: flex;
    align-self: center;
}
#profil .avatar img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
#profil .infos{
    margin: 10px 20px 10px 20px;
}
h2{
    font-size: 16px;
    margin: 15px 2px 2px 5px;
}
p {
    background:#eff4f7;
    border-radius: 8px;
    padding: 0px 10px 0px 10px ;
    font-size: 14px;
    margin: 2px;
}
#profil .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
#profil .buttons i {
    font-size: 24px;
    margin: 15px;
}

#profil .buttons i:hover {
    color: #1976D2;
}
</style>