const goToGamePage=function(){
 window.location.href="main.html";
}
const addClickListenerOnButton=function(){
  let button=document.getElementById('start-game');
  button.onclick=goToGamePage;
}
const start=function(){
  addClickListenerOnButton();
}
window.onload=start;
