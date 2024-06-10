
var modal = document.getElementById("myModal");

modal.style.display = "none";

var btn = document.getElementById("AddSanPham");

btn.onclick = function() {
  modal.style.display = "block";
}
 var modal = document.getElementById("myModal");
 var closeModalBtn = document.getElementById("closeModalBtn");

 closeModalBtn.onclick = function() {
   modal.style.display = "none";
 }
var overlay = document.getElementById("overlay");
var modal = document.getElementById("myModal");

modal.style.display = "none";
overlay.style.display = "none";

btn.onclick = function() {
 modal.style.display = "block";
 overlay.style.display = "block";
}

closeModalBtn.onclick = function() {
 modal.style.display = "none";
 overlay.style.display = "none";
}


// function OutAcount()  {
//  var cofirm = confirm("Bạn có muốn đăng xuất không")
//  if(cofirm){
//    window.location.href = 'login.html'
//  }
//  else{
//    return
//  }
// }

