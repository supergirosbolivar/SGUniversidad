stateLoadAllProducts = 'N', slideIndex = 0
document.addEventListener('DOMContentLoaded', function(){
  loadProducts()
  searchProduct()
  captureEventMenu()
  captureEventCloseMenu()
  turnOnSlides()
  //searchCoincidence()
  
}, false)

function loadProducts(){
  console.log('start load all products')
  boxesCat01 = boxesCat02 = boxesCat03 = boxesCat04 = boxesCat05 = box = ''
  url = './js/assets/products.json'
  fetch(url)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      data.forEach(function(p){
        category = p.category
        if( p.state === 'A' ){
          source = p.source
          box = ' <div class="box" id="'+p.name+'">' +
                  ' <img src="image/products/'+source+'" alt="'+p.alt+'" id="'+p.name+'">' +
                ' </div>'
          if( category === 'CT1' ){        // chanche
            boxesCat01 += box 
          }else if( category === 'CT2' ){   // loterias
            boxesCat02 += box
          }else if( category === 'CT3' ){  // Recargas
            boxesCat03 += box
          }else if( category === 'CT4' ){  // Giros
            boxesCat04 += box
          }else if( category === 'CT5' ){  // Recaudos
            boxesCat05 += box
          }
               
        }
      })
      clearProductsSectionAll()

      elChance = document.querySelector('#chance')
      elLoteria = document.querySelector('#loteria')
      elRecargas = document.querySelector('#recargas')
      elGiros = document.querySelector('#giros')
      elRecaudos = document.querySelector('#recaudos')

      elChance.innerHTML = '', elLoteria.innerHTML = '', elRecargas.innerHTML = '', elGiros.innerHTML = '', elRecaudos.innerHTML = ''
      
      elChance.innerHTML += boxesCat01
      elLoteria.innerHTML += boxesCat02
      elRecargas.innerHTML += boxesCat03 
      elGiros.innerHTML += boxesCat04
      elRecaudos.innerHTML += boxesCat05
      captureEventBox()
    })
    
}

function searchProduct(){
  dataInputSearch = ''
  search = document.querySelector('#search')
  search.addEventListener('keyup', function(e){
    console.log('key: ', e.key)
    //console.log('keyCode: ', e.keyCode)
    key = e.key
    //console.log(validateKey(key))
    if( !validateKey(key) ){
      if( key === 'Backspace' || e.keyCode === 8 || key === 'Delete' ){
        //console.log('input value', search.value)
        if( search.value !== '' ){
          if( isNaN(search.value) ){ 
            console.log('1. DataSearch : ', search.value)
            dataInputSearch = search.value
            searchCoincidence(search.value.toLowerCase())
          }
        }else{
          console.log('listar todas la cajas de logos')
          dataInputSearch = ''
          loadProducts()
          stateLoadAllProducts = 'Y'
          validateSectionHaveElements()
        }
      }else{
        dataInputSearch += e.key
        console.log('2. DataSearch : ', dataInputSearch.toLowerCase())
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
    if( dataAltImage.includes(letters.toLowerCase()) ){
      infoImg.parentElement.style = 'display: block'
      //console.log(infoImg)
    }else{
      infoImg.parentElement.style = 'display: none'
    }
  })
  validateSectionHaveElements()
}

function captureEventBox(){
  modalTitle = document.querySelector('#modal-title')
  superIframe = document.querySelector('#SuperIframe')
  boxes = document.querySelectorAll('.box')
  loading = document.querySelector('.loading')
  id = routeFile = ''
  boxes.forEach( info => {
    info.addEventListener('click', function(box) {
      box.preventDefault()
      loadShowModal(box.target.id)


      /*
      loading.classList.remove('none')
      id = box.target.id
      setTimeout(() => {
        routeFile = './files/'+id+'.pdf'
        title = id.replaceAll("-"," ")
        modalTitle.textContent = title
        superIframe.setAttribute("src", routeFile);
        loading.classList.add('none')
        document.querySelector('.container-modal').classList.remove('none')
        captureEventCloseModal()
        routeFile = ''
      }, 3000)
      */
    })

    boxesImages = document.querySelectorAll('.box a')
    boxesImages.forEach( info => {
      info.addEventListener('click', function(box) {
        box.preventDefault()
        loadShowModal(box.target.id)
      })
    })  

  })
}

function validateKey(key){
  reply = false
  vectorKey = ['Shift','ArrowLeft','dobleArrowLeft','ArrowRight','Tab','Alt','CapsLock','Control','-',
  '+','*',' ',',','.','0','1','2','3','4','5','6','7','8','9','Meta','|','!','"','#','$','%','&','/','(',')',
  '=','?','//\/','¡','Escape','°','¬','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','Home',
  'End','Insert','PageUp','Delete','PageDown',';',':','_','{','}','[',']','^','`','Dead','~','PrintScreen',
  'ScrollLock','Pause']

  /*
  vectorKeysAccepted = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S',
                        'T','U','V','W','X','Y','Z','a','b','c','d','f','g','h','i','j','k','l','m','n',
                        'ñ','o','p','q','r','s','t','u','v','w','x','y','z']
  foundAccepted = vectorKeysAccepted.find(element => element === key);
  console.log('FA: ',foundAccepted)
  console.log(typeof foundAccepted)
  if( typeof foundAccepted !== 'undefined'){
    reply = true
  }
  */
  

  
  found = vectorKey.find(element => element === key);
  if( typeof(found) !== "undefined"){
    reply = true
  }
  console.log(reply)
  return reply
}

function validateKeyCode(key){
  vectorKeyCodeValid = [8, 65,	66,	67,	68,	69,	70,	71,	72,	73,	74,	75,	76,	77,	78,	
    79,	80,	81,	82,	83,	84,	85,	86,	87,	88,	89,	90,]
}

function captureEventCloseModal(){
  btnClose = document.querySelector('.btn-close')
  btnClose.addEventListener('click', () =>{
    document.querySelector('.container-modal').classList.add('none')
    document.querySelector('#search').focus()
  })
}

function loadShowModal(id){
  modalTitle = document.querySelector('#modal-title')
  superIframe = document.querySelector('#SuperIframe')
  boxes = document.querySelectorAll('.box')
  loading = document.querySelector('.loading')
  routeFile = ''
  loading.classList.remove('none')
  routeFile = './files/'+id+'.pdf'
  //console.log(routeFile)
  title = id.replaceAll("-"," ")
  modalTitle.textContent = title
  superIframe.setAttribute("src", routeFile);
  status = validateExistFile(routeFile)
  //console.log('1. -> ', status)
  /*
  fetch(routeFile)
    .then( response => { 
      console.log(response.ok)
      return response.blob()
    })
    .then( (data) => {
      console.log(data)
      if( data === '' ){
        console.log('vacio');
      }
      console.log(data.size)
    })
    */
  loading.classList.add('none')
  document.querySelector('.container-modal').classList.remove('none')
  captureEventCloseModal()
}

async function validateExistFile(url) {
  status = null
  let response = await fetch(url);
  //console.log(response.status); // 200
  //console.log(response.statusText); // OK

  if (response.status === 200) {
    status = response.status
    let data = await response.text();
    //console.log(data)
      // handle data
  }else{
    status = response.status
  }
  //console.log(status)
}

function captureEventMenu(){
  menu = document.querySelector('#menu-icon')
  menu.addEventListener('click', ()=>{
    menuActions = document.querySelector('#menu-actions')
    menuActions.style = 'left: 1%'
  })
}

function captureEventCloseMenu(){
  btnCloseMenu = document.querySelector('#btnCloseMenu')
  btnCloseMenu.addEventListener('click', ()=>{
    menuActions = document.querySelector('#menu-actions')
    menuActions.style = 'left: -100%'
    document.querySelector('.content').style = 'filter: blur(0px)'
  })
}

function validateSectionHaveElements(){  
  cont = 0
  sections = document.querySelectorAll('.products-lists > .product-item')
  sections.forEach((section)=>{
    id = section.id
    console.log('id Section: ', id)
    boxes = document.querySelector('#'+id+' > .boxes')
    //console.log(boxes)
    //console.log(boxes.id)
    //console.log(boxes.childNodes)
    nodes = boxes.childNodes
    nodes.forEach((box) => {
      //console.log(box.id)
      if( typeof box.id !== 'undefined' ){
        boxId = box.id
        boxElement = document.querySelector('#'+boxId)
        //console.log(boxElement)
        //console.log(boxElement.getAttribute('style'))
        //console.log(boxElement.classList.contains('box'))
        haveClassBox = boxElement.classList.contains('box')
        attributeStyle = boxElement.getAttribute('style')
        if( haveClassBox ){
          if( attributeStyle !== 'display: none;' ){
            cont++
          }
        }
      }
      
      //console.log(box.id)
      //console.log(box.classList)
    })
    console.log('----> Contador: ',cont)
    if( cont === 0 ){
      document.querySelector('#'+id).style = 'display: none'
    }else{
      document.querySelector('#'+id).style = 'display: block'
    }
    cont = 0
  })
  console.log(stateLoadAllProducts)
  if( stateLoadAllProducts === 'Y' ){
    showAllProductBoxes()
  }
}

function clearProductsSectionAll(){
  elChance = document.querySelector('#chance')
  elRecargas = document.querySelector('#recargas')
  elGiros = document.querySelector('#giros')
  elRecaudos = document.querySelector('#recaudos')
  elChance.innerHTML = '', elRecargas.innerHTML = '', elGiros.innerHTML = '', elRecaudos.innerHTML = ''
  console.log('DONE')
}

function showAllProductBoxes(){
  sections = document.querySelectorAll('.products-lists > .product-item')
  sections.forEach((section)=>{
    id = section.id
    boxes = document.querySelector('#'+id+' > .boxes')
    nodes = boxes.childNodes
    nodes.forEach((box) => {
      if( typeof box.id !== 'undefined' ){
        boxId = box.id
        boxElement = document.querySelector('#'+boxId)
        boxElement.removeAttribute("style");
      }
    })
    document.querySelector('#'+id).style = 'display: block'
  })  
  stateLoadAllProducts = 'N'
}

function turnOnSlides(){
  $('.slide-number-one').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3500,
    fade: true,
  });

  $('.slide-number-two').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
  });

  
}