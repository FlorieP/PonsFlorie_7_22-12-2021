<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};

</script>

<style>
#app {
  max-width: 100%;
}
body {
  background-color: #D0E1F2;
  max-width: 100%;
  margin: 0px;
  font-size: 15px;
}
a {
  text-decoration: none;
  color: black;
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}
/******** HEADER *********/
header{ /*Mise en place de la Flexbox Header*/
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 4px #1976D2;
    margin-bottom: 10px ;
}

/********LOGO********/
#logo{
    margin-left: 20px;
    flex: 1;
}
#logo img{
    height: 30px;
}


/********MENU*********/
#menu{
    display: inline-block;
}
#menu ul{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-inline-start: 0px;
    margin-block: 0px;
}
#menu li{ 
    position: relative;
    padding: 15px 20px 15px 20px;
    list-style-type: none;
    text-align: center;
    height: 100%;
}
#menu .fas{
    font-size: 22px;
}

#menu .fas:hover{
    color: #1976D2;
}


</style>