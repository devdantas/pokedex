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
  // console.log(search.value.toLowerCase())
  // console.log(isNaN(search.value))

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
      container.innerHTML = createPoke(res).toString().replace(/,/g,"")
    }, 3000); 
  }
}

function createPoke(res) {
    let card = []
    let icon = []
    let i=0
    for (const item of res) {
      if(i%6 == 0){
        for (const itemTy of item.type) {
          icon.push(`<img src="./img/icons_type/Icon_${itemTy}.png" class="icon__type">`)
        }
        card.push(`
          <div class="break"></div>
          <div class="poke__main">
            <img src="${item.img}" alt="Sprite of ${item.name}" class="poke__photo"> 
              <div class="poke__name">
                <h2>${item.name}</h2>
              </div>
              <div class="poke__attr">
                ${icon}
              </div>          
          </div>`)
          icon = []
      }else{
        for (const itemTy of item.type) {
          icon.push(`<img src="./img/icons_type/Icon_${itemTy}.png" class="icon__type">`)
        }
        card.push(`
          <div class="poke__main">
            <img src="${item.img}" alt="Sprite of ${item.name}" class="poke__photo">  
              <div class="poke__name">
                <h2>${item.name}</h2>
              </div>
              <div class="poke__attr">
                ${icon}
              </div>            
          </div>`)
        icon = []
      }
      i++      
    }
    return card
}
button.onclick = getJSON