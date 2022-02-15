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
        <section id="profileDelete">
            <div class="card">
                <!---------- Profil ---------->
                <h1>SUPRRESSION DU COMPTE</h1>
                <!---------- Avatar ---------->
                <div class="avatar">
                    <img src="../assets/avatar-woman.png"/>  
                </div>
                <!---------- Infos ---------->
                <div class="infos">
                   <h2>Prénom Nom</h2>
                   <p>Êtes-vous sûr de vouloir supprimer votre profil ? </p>
                </div>  
                <!---------- Boutons ---------->
                <div class="buttons">
                    <a href="/Login"><button class="confirm">Confirmer</button></a>
                    <a href="/Profile"><button class="cancel">Annuler</button></a>
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

/******** PROFILE DELETE *********/
#profileDelete {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#profileDelete .card {
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
#profileDelete .avatar{
    display: flex;
    align-self: center;
}
#profileDelete .avatar img{
    width: 100px;
    border-radius: 50%;
}
#profileDelete .infos{
    margin: 10px 20px 10px 20px;
    text-align: center;
}
h2{
    font-size: 16px;
    margin: 15px 2px 2px 5px;
}
p {
    padding: 0px 5px 0px 5px ;
    font-size: 14px;
    margin: 15px 2px 10px 5px;

}
#profileDelete .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
#profileDelete .buttons button {
    background: #1976D2;
    color:white;
    border-radius: 15px;
    border: none;
    padding: 8px;
    margin: 0px 10px 10px 10px;
}
</style>