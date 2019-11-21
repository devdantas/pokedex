let search = document.querySelector("#search")
let button = document.querySelector("#go")
let container = document.querySelector("#container")
let loading = document.querySelector(".loading")

const getJSON = async (req, res) => {
  var URL = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';
  var request = new XMLHttpRequest();
  request.open('GET', URL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    list(request.response.pokemon)
  }
}

const list = (param) => {
  switch (isNaN(search.value)) {
    case true:
      res = param.filter(item => {
        return item.name.toLowerCase().includes(search.value.toLowerCase())
      })
      verifica(res)
      break;
    case false:
      res = param.filter(item => {
        return item.num.toLowerCase().includes(search.value.toLowerCase())
      })
      verifica(res)
      break;
    default:
      alert("Não aceito")
      break;
  }
}

function verifica(res){
  if(res.length == 0){
    alert("Pokemon não existe")
  }else{
    container.innerHTML = ""
    loading.style.display = 'flex'
    let timer = setInterval(() => {
      clearInterval(timer)
      loading.style.display = 'none'
      container.innerHTML = createCard(res).toString().replace(/,/g,"")
    }, 3000); 
  }
}

function createCard(res) {
    let card = []
    let icon = []
    let i=0
    for (const item of res) {
      if(i%6 == 0){
        for (const itemTy of item.type) {
          icon.push(`<img src="./img/icons_type/Icon_${itemTy}.png" class="icon__type">`)
        }
        card.push('<div class="break"></div>' + bodyItem(icon, item.img, item.name))
          icon = []
      }else{
        for (const itemTy of item.type) {
          icon.push(`<img src="./img/icons_type/Icon_${itemTy}.png" class="icon__type">`)
        }
        card.push(bodyItem(icon, item.img, item.name))
        icon = []
      }
      i++      
    }
    return card
}

function bodyItem(icon, itemImg, itemName){
  let body = "";
  body = `<div class="poke__main">
          <img src="${itemImg}" alt="Sprite of ${itemName}" class="poke__photo">  
            <div class="poke__name">
              <h2>${itemName}</h2>
            </div>
            <div class="poke__attr">
              ${icon}
            </div>            
        </div>`
  return body  
}

button.onclick = getJSON