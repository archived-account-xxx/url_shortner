form = document.getElementById("form")
firstPage = document.getElementById("first-page")
secondPage = document.getElementById("second-page")
message = document.getElementById("message")
form.addEventListener("submit",function(e){
  e.preventDefault()
  url = document.getElementById("url").value
  xhr = new XMLHttpRequest()
  xhr.open("POST","/url",true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(`url=${url}`);
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      firstPage.style.display = "none"
      secondPage.style.display = "block"
      message.innerText =  `Your url has been created here is the link : ${xhr.responseText}`
    }else{
      firstPage.style.display = "none"
      secondPage.style.display = "block"
      message.innerText =  `There was an error!`
    }
  }
})
