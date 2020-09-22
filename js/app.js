document.addEventListener('DOMContentLoaded', function(){
  loadProducts()
  searchProduct()
  //searchCoincidence()
  
}, false)

function loadProducts(){
  boxesCat01 = '', boxesCat02 = '', boxesCat04 = '', box = ''
  url = './js/assets/products.json'
  fetch(url)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      data.forEach(function(p){
        category = p.category
        console.log(category)
        if( p.state === 'A' ){
          source = p.source
          box = ' <div class="box">' +
                  ' <img src="image/products/'+source+'" alt="'+p.alt+'" id="'+p.name+'">' +
                ' </div>'
          if( category === 'CT1' ){  
            boxesCat01 += box 
          }else if( category === '02' ){
            boxesCat02 += box
          }else if( category === 'CT4' ){
            boxesCat04 += box
          }
               
        }
      })
      elChance = document.querySelector('#chance')
      elRecargas = document.querySelector('#recargas')
      elRecaudos = document.querySelector('#recaudos')

      elChance.innerHTML = '', elRecargas.innerHTML = '', elRecaudos.innerHTML = ''
      
      elChance.innerHTML += boxesCat01
      elRecargas.innerHTML += boxesCat02 
      elRecaudos.innerHTML += boxesCat04
    })
}

function searchProduct(){
  dataInputSearch = ''
  search = document.querySelector('#search')
  search.addEventListener('keyup', function(e){
    console.log('key: ', e.key)
    console.log('keyCode: ', e.keyCode)
    key = e.key
    console.log(validateKey(key))
    if( !validateKey(key) ){
      if( key === 'Backspace' || e.keyCode === 8 ){
        //console.log('input value', search.value)
        if( search.value !== '' ){
          console.log('1. DataSearch : ', search.value)
          dataInputSearch = search.value
          searchCoincidence(search.value)
        }else{
          console.log('listar todas la cajas de logos')
          dataInputSearch = ''
          loadProducts()
        }
      }else{
        dataInputSearch += e.key
        console.log('2. DataSearch : ', dataInputSearch)
        searchCoincidence(dataInputSearch)
      }
    }
    
  })
}

function searchCoincidence(letters){
  dataBox = document.querySelectorAll('.box img')
  //console.log(dataBox)
  dataBox.forEach(function(infoImg){
    //console.log(infoImg)
    //console.log(infoImg.parentElement)
    dataAltImage = infoImg.alt
    if( dataAltImage.includes(letters) ){
      infoImg.parentElement.style = 'display: block'
      //console.log(infoImg)
    }else{
      infoImg.parentElement.style = 'display: none'
    }
  })
}

function validateKey(key){
  reply = false
  vectorKey = []
  vectorKey.push('Shift')
  vectorKey.push('ArrowLeft')
  vectorKey.push('dobleArrowLeft')
  vectorKey.push('ArrowRight')
  vectorKey.push('Tab')
  vectorKey.push('Alt')
  found = vectorKey.find(element => element === key);
  if( typeof(found) !== "undefined"){
    reply = true
  }
  return reply
}