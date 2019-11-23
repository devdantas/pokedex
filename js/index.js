let search = document.querySelector("#search")
let button = document.querySelector("#go")
let container = document.querySelector("#container")
let loading = document.querySelector(".loading")
let modal = document.querySelector("#modal")

let lista = []

window.onload = function() {
  modal.innerHTML = bodyModal(null, false)
}
function getAPI(){
  var URL = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';
  var request = new XMLHttpRequest();
  request.open('GET', URL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    lista = request.response.pokemon
    list(lista, search.value)
  }
}

const list = (param, search) => {
  switch (isNaN(search)) {
    case true:
      res = param.filter(item => {
        return item.name.toLowerCase().includes(search.toLowerCase())
      })
      verifica(res)
      break;
    case false:
      res = param.filter(item => {
        return item.num.toLowerCase().includes(search.toLowerCase())
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
    let card = [], icon = [], i=0
    for (const item of res) {
      if(i%6 == 0){
        for (const itemTy of item.type) {
          icon.push(`<img src="./img/icons_type/Icon_${itemTy}.png" class="icon__type">`)
        }
        card.push('<div class="break"></div>' + bodyItem(item.img, item.name))
          icon = []
      }else{
        for (const itemTy of item.type) {
          icon.push(`<img src="./img/icons_type/Icon_${itemTy}.png" class="icon__type">`)
        }
        card.push(bodyItem(item.img, item.name))
        icon = []
      }
      i++      
    }
    return card
}

function bodyItem(itemImg, itemName){
  let body = "";
  body = `<div class="poke__main" id="${itemName}" onclick="openModal('${itemName}')">
          <img src="${itemImg}" alt="Sprite of ${itemName}" class="poke__photo">  
            <div class="poke__name">
              <h2>${itemName}</h2>
            </div>
            <div class="poke__attr">
            <div class="pokeball pokeball__wtwo">          
              <div class="poke__red"></div>          
                <div class="poke__black">
                  <div class="circle__two "></div>
                </div>
              </div>
            </div>            
        </div>`
  return body  
}

function bodyModal(res, bool) {
  let contentModal = ""
  if(bool){
    contentModal = `
        <div class="modal__close" onclick="closeModal()">
          X
        </div>
        <div class="modal__container">
        </div>`
  } else {    
    modal.style.display = 'none'
    modal.style.padding = '0'
    contentModal = `<div id="pokeball__modal" class="pokeball pokeball__wone animation__360">          
                      <div class="poke__red"></div>          
                      <div class="poke__black">
                        <div class="circle__one"></div>
                      </div>
                    </div>`
  }
  return contentModal
}

function openModal(name) {
  let res = lista.filter(item => {
    return item.name.toLowerCase().includes(name.toLowerCase())
  })
  modal.classList.add('animation__scale')
  modal.style.display = 'flex'
  let i = setInterval(() => {
    clearInterval(i)
    modal.style.padding = '15px'
    modal.innerHTML = bodyModal(res[0], true)
  }, 1200);
}
function closeModal() {
  modal.innerHTML = bodyModal(res, false)
}

button.onclick = getAPI