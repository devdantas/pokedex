let search = document.querySelector("#search")
let button = document.querySelector("#go")
let container = document.querySelector("#container")
let loading = document.querySelector(".loading")
let modal = document.querySelector("#modal")

let lista = []

window.onload = function() {
  modal.innerHTML = bodyModal(null, false)
}
function getAPI(e){
  e.preventDefault()
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
    let card = [], i=0
    for (const item of res) {
      if(i%6 == 0){
        card.push('<div class="break"></div>' + bodyItem(item.img, item.name))
      }else{
        card.push(bodyItem(item.img, item.name))
      }
      i++      
    }
    return card
}

function bodyItem(itemImg, itemName){
  let body = "";
  body = `
        <div class="poke__main" id="${itemName}" onclick="openModal('${itemName}')">
          <img src="${itemImg}" alt="Sprite of ${itemName}" class="poke__photo">  
            <div class="poke__name">
              <h3>${itemName}</h3>
            </div>
            <div class="poke__attr">
            <div class="pokeball pokeball__wtwo">          
              <div class="poke__red"></div>          
                <div class="poke__black">
                  <div class="circle__two "></div>
                </div>
              </div>
            </div>            
        </div>
      `
  return body  
}

function bodyModal(res, bool) {
  let contentModal = ""
  if(bool){
    document.querySelector("#shadow__modal").style.display = "block" 
    contentModal = `
        <div class="modal__container">  
          <div class="modal__header">                  
            <div class="modal__close">
              <span onclick="closeModal()">X</span>
            </div>
            <div class="poke__number">
              Nº${res.num}
            </div>     
            <img src="${res.img}" alt="Sprite of ${res.name}" class="poke__photo">
            <div class="poke__name">
              ${res.name}
            </div>        
          </div>
          <div class="modal__body">
            <div class="poke__status">
              status
            </div>
            <div class="poke__body">
              <div class="poke__item">
                <label>Type</label>
                ${bodyIcon(res.type).toString().replace(/,/g,"")}
              </div>
              <div class="poke__item">
                <label>Weight</label>
                ${res.weight}
              </div>
              <div class="poke__item">
                <label>Height</label>
                ${res.height}
              </div>
              <div class="poke__item">
                <label>Weaknesses</label>
                ${bodyIcon(res.weaknesses).toString().replace(/,/g,"")}
              </div>
              <div class="poke__previous__next" style="">
            `
            + evolution(res.next_evolution, res.prev_evolution) +
            `
              </div>
            </div>            
          </div>
        </div>`
  } else {    
    document.querySelector("#shadow__modal").style.display = "none"
    modal.style.display = 'none'
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
    window.scrollTo(0,0)
    modal.innerHTML = bodyModal(res[0], true)
  }, 1200);
}
function closeModal() {
  modal.innerHTML = bodyModal(res, false)
}

function bodyIcon(icons){
  let bodyIcon = []
  bodyIcon.push('<div class="icon__type">')
  for (const icon of icons) {
    bodyIcon.push(`
      <div class="icon__name">
        <label>${icon}</label>
      </div>
      <div class="icon__img">
        <img src="./img/icons_type/Icon_${icon}.png" alt="Type ${icon}">
      </div>
    `)
  }
  bodyIcon.push('</div>')
  return bodyIcon
}

function evolution(nextE, prevE) {
  bodyEv = ""
  if(nextE != null && prevE != null){
    bodyEv = nextEvolution(nextE) + prevEvolution(prevE)
  } else if(nextE != null && prevE == null) {
    bodyEv = nextEvolution(nextE)
  } else if(prevE != null && nextE == null){
    console.log(bodyEv)
    bodyEv = prevEvolution(prevE)
  }
  return bodyEv.toString().replace(/,/g, "")
}

function nextEvolution(nextE) {
  let next = []
  next.push('<div class="poke__item"><label>Next Evolution</label>')
    for (const item of nextE) { 
      next.push(`<div class="poke__np" onclick="openAndClose('${item.name}')">${item.name}</div>`)
    }  
  next.push('</div>')
  return next
}

function prevEvolution(prevE) {
  let prev = []
  prev.push('<div class="poke__item"><label>Previous Evolution</label>')
    for (const item of prevE) { 
      prev.push(`<div class="poke__np" onclick="openAndClose('${item.name}')">${item.name}</div>`)
    }
  prev.push('</div>')
  return prev
}

function openAndClose(name) {
  closeModal()
  let i = setTimeout(() => {
    clearTimeout(i)
    openModal(name)
  }, 100);
}

button.onclick = getAPI