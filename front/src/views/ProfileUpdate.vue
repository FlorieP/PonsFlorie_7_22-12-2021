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
        <section id="profileUpdate">
            <div class="card">
                <!---------- Profil ---------->
                <h1>MODIFICATION PROFIL</h1>
                <!---------- Avatar ---------->
                <div class="avatar">
                    <img src="../assets/avatar-woman.png"/>
                    <i class="fas fa-paperclip"><span class="fichier">Aucun fichier</span></i>
                </div>
                <!---------- Infos ---------->
                <div class="infos">
                   <label>Nom</label>
                   <input type="text" name="lastname" placeholder="  Nom"/>
                   <label>Prénom</label>
                   <input type="text" name="firstname" placeholder="  Prénom"/>
                   <label>Bio</label>
                   <input type="text" name="bio" placeholder="  Bio"/>
                </div>  
                <!---------- Boutons ---------->
                <div class="buttons">
                    <a href="/Profile"><button class="save">Sauvegarder</button></a>
                </div>
            </div>   
        </section>      
    </div>
</template>

<script>

</script>

<style scoped>
body {
  background-color: #D0E1F2;
  max-width: 100%;
  margin: 0px;
  font-size: 15px;
}
/******** PROFILE UPDATE *********/
#profileUpdate{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#profileUpdate .card {
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
#profileUpdate input{
    border-radius: 15px;
    border:  solid 1px transparent;
    width: 100%;
    height: 35px;
    padding: 0px 10px 0px 10px ;
    background:#eff4f7;
}
#profileUpdate .avatar{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 20px 10px 20px;
}
#profileUpdate .avatar img{
    width: 75px;
    border-radius: 50%;
    margin-right: 20px;
}
#profileUpdate .avatar i {
    font-size: 18px;
    color: #1976D2;
}
#profileUpdate .avatar .fichier {
    color:  grey;
    font-size: 12px;
    font-weight: 300;
    margin-left: 8px;
}
#profileUpdate .infos{
    margin: 10px 20px 10px 20px;
    display: flex;
    flex-direction: column;
}
#profileUpdate .infos label{
    margin: 15px 2px 2px 5px;
    font-weight: bold;
    font-size: 16px;
}
#profileUpdate .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 15px 2px 2px 5px;
}
#profileUpdate .save {
    background: #1976D2;
    color:white;
    border-radius: 15px;
    border: none;
    padding: 8px;
}
</style>