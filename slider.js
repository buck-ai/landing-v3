let currentProductIndex  = null
let productSlideInterval = null
let products             = []


const productProcessor = (product, productIndex) => {
  productIndex === currentProductIndex ? activateProduct(product) : deactivateProduct(product)
}

const activateProduct = product => {
  let productIcon        = product.querySelector('img')
  let productTitle       = product.querySelector('h5')
  let productDescription = product.querySelector('p')

  product.classList.add('line-with-animation', 'active')
  productIcon.classList.add('!grayscale-0')
  productTitle.classList.add('!text-greyscale-900')
  productDescription.classList.add('!text-greyscale-600')
}

const deactivateProduct = product => {
  let productIcon        = product.querySelector('img')
  let productTitle       = product.querySelector('h5')
  let productDescription = product.querySelector('p')

  product.classList.remove('line-with-animation', 'active')
  productIcon.classList.remove('!grayscale-0')
  productTitle.classList.remove('!text-greyscale-900')
  productDescription.classList.remove('!text-greyscale-600')
}

const startProductInterval = () => {
  if ( currentProductIndex === null ) currentProductIndex = 0;
  else currentProductIndex = (currentProductIndex + 1) % products.length

  products.forEach(productProcessor)
}

const listenProductsEvents = products => {
  products.forEach(listenProductClickForActivate)
  products.forEach(listenProductMouseOverForResetInterval)
  products.forEach(listenProductMouseOutForStartInterval)
}

const listenProductClickForActivate = product => {
  product.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()

    if ( product.classList.contains('active') ) return;

    clearInterval(productSlideInterval)

    productSlideInterval = null
    currentProductIndex  = products.indexOf(product) - 1
    if ( productSlideInterval === null ) productSlideInterval = setInterval(startProductInterval, 22500)
   
    startProductInterval()
  })
}

const listenProductMouseOverForResetInterval = product => { 
  product.addEventListener('mouseover', event => {
    event.stopPropagation()

    if ( !product.classList.contains('active') ) return;

    clearInterval(productSlideInterval)
    
    productSlideInterval = null

    product.classList.remove('line-with-animation')
  })
}

const listenProductMouseOutForStartInterval = product => {
  product.addEventListener('mouseout', event => {
    event.stopPropagation()

    if ( !product.classList.contains('active') ) return;

    if ( productSlideInterval === null ) productSlideInterval = setInterval(startProductInterval, 22500)
    product.classList.add('line-with-animation')
  })
}

(function() {
  const slider = document.getElementById('slider')
  if ( !slider ) return;

  products        = Array.from(slider.querySelectorAll('a[role="tab"]'))
  productFeatures = Array.from(slider.querySelectorAll('section[role="tabpanel"] > section'))

  productSlideInterval = setInterval(startProductInterval, 22500)
  startProductInterval()

  listenProductsEvents(products)
})();
