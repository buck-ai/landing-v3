let currentProductIndex  = null
let productSlideInterval = null
let products             = []
let productFeaturesAreas = []

let features             = []
let featureSlideInterval = null
let currentFeatureIndex  = null


const productProcessor = (product, productIndex) => {
  productIndex === currentProductIndex ? activateProduct(product) : deactivateProduct(product)
}

const activateProduct = product => {
  let productIcon        = product.querySelector('img')
  let productTitle       = product.querySelector('h5')
  let productDescription = product.querySelector('p')

  product.classList.add('product-line-animation', 'active')
  productIcon.classList.add('!grayscale-0')
  productTitle.classList.add('!text-greyscale-900')
  productDescription.classList.add('!text-greyscale-600')

  productFeaturesAreas.forEach(productFeaturesAreasProcessor)
}

const deactivateProduct = product => {
  let productIcon        = product.querySelector('img')
  let productTitle       = product.querySelector('h5')
  let productDescription = product.querySelector('p')

  product.classList.remove('product-line-animation', 'active')
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
    if ( productSlideInterval === null ) productSlideInterval = setInterval(startProductInterval, 18000)
   
    startProductInterval()
  })
}

const listenProductMouseOverForResetInterval = product => { 
  product.addEventListener('mouseover', event => {
    event.stopPropagation()

    if ( !product.classList.contains('active') ) return;

    clearInterval(productSlideInterval)
    
    productSlideInterval = null

    product.classList.remove('product-line-animation')
  })
}

const listenProductMouseOutForStartInterval = product => {
  product.addEventListener('mouseout', event => {
    event.stopPropagation()

    if ( !product.classList.contains('active') ) return;

    if ( productSlideInterval === null ) productSlideInterval = setInterval(startProductInterval, 18000)
    product.classList.add('product-line-animation')
  })
}

const productFeaturesAreasProcessor = (productFeaturesArea, productFeaturesAreaIndex) => {
  productFeaturesAreaIndex === currentProductIndex ? showProductFeaturesArea(productFeaturesArea) : hideProductFeaturesArea(productFeaturesArea)
}

const showProductFeaturesArea = area => {
  if ( area.classList.contains('hidden') ) area.classList.remove('hidden')
  if ( !area.classList.contains('flex') ) area.classList.add('flex')

  features = Array.from(area.querySelectorAll('ul > li'))

  if ( featureSlideInterval !== null ) {
    clearInterval(featureSlideInterval)
    featureSlideInterval = null
  }

  currentFeatureIndex = null

  if ( features.length > 1 ) featureSlideInterval = setInterval(startFeatureInterval, 18000 / features.length)
  
  startFeatureInterval()
  
  listenFeatureEvents(features)
}

const startFeatureInterval = () => {
  if ( currentFeatureIndex === null ) currentFeatureIndex = 0;
  else currentFeatureIndex = (currentFeatureIndex + 1) % features.length

  features.forEach(featureProcessor)
}

const featureProcessor = (feature, featureIndex) => {
  featureIndex === currentFeatureIndex ? activateFeature(feature) : deactivateFeature(feature)
}

const activateFeature = feature => {
  let featureIcon        = feature.querySelector('img')
  let featureTitle       = feature.querySelector('h6')
  let featureDescription = feature.querySelector('p')

  feature.classList.add('active')
  featureIcon.classList.add('!grayscale-0')
  featureTitle.classList.add('!text-greyscale-900')
  featureDescription.classList.add('!text-greyscale-600')
}

const deactivateFeature = feature => {
  let featureIcon        = feature.querySelector('img')
  let featureTitle       = feature.querySelector('h6')
  let featureDescription = feature.querySelector('p')

  feature.classList.remove('active')
  featureIcon.classList.remove('!grayscale-0')
  featureTitle.classList.remove('!text-greyscale-900')
  featureDescription.classList.remove('!text-greyscale-600')
}

const hideProductFeaturesArea = area => {
  if ( !area.classList.contains('hidden') ) area.classList.add('hidden')
  if ( area.classList.contains('flex') ) area.classList.remove('flex')
}

const listenFeatureEvents = features => {
  features.forEach(listenFeatureClickForActivate)
  features.forEach(listenFeatureMouseOverForResetInterval)
  features.forEach(listenFeatureMouseOutForStartInterval)
}

const listenFeatureClickForActivate = feature => {
  feature.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()

    if ( feature.classList.contains('active') ) return;

    clearInterval(productSlideInterval)

    productSlideInterval = null
    currentFeatureIndex  = features.indexOf(feature) - 1
    currentProductIndex  = currentProductIndex - 1
    
    if ( productSlideInterval === null ) productSlideInterval = setInterval(startProductInterval, 18000)
   
    startProductInterval()
  })
}

const listenFeatureMouseOverForResetInterval = feature => { 
  feature.addEventListener('mouseover', event => {
    event.stopPropagation()

    if ( !feature.classList.contains('active') ) return;

    clearInterval(productSlideInterval)
    
    productSlideInterval = null

    products[currentProductIndex].classList.remove('product-line-animation')
  })
}

const listenFeatureMouseOutForStartInterval = feature => {
  feature.addEventListener('mouseout', event => {
    event.stopPropagation()

    if ( !feature.classList.contains('active') ) return;

    currentFeatureIndex  = features.indexOf(feature) - 1

    if ( productSlideInterval === null ) productSlideInterval = setInterval(startProductInterval, 18000)

    products[currentProductIndex].classList.add('product-line-animation')
  })
}

(function() {
  const slider = document.getElementById('product-slider')
  if ( !slider ) return;

  products             = Array.from(slider.querySelectorAll('a[role="tab"]'))
  productFeaturesAreas = Array.from(slider.querySelectorAll('section[role="tabpanel"] > section'))

  productSlideInterval = setInterval(startProductInterval, 18000)
  startProductInterval()

  listenProductsEvents(products)
})();
