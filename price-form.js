let form           = null
let priceText      = null
let bookDemoButton = null

const formSubmitHandler = event => {
  event.preventDefault()

  const data = formData()

  freshsales.identify(
    data.Email, 
    data, 
    () => { 
      FM.trackCustomEvent("Filled Get Price Form", data)

      form.classList.add('hidden')
      priceText.classList.remove('hidden')
      priceText.classList.add('flex')
    },
    (error) => {
      console.warn("Receive error")
      console.warn(error)
    }
  )


}

const formData = () => {
  let data = Object.fromEntries(new FormData(form))
  
  data.company = { 
    Name: data['company[Name]'], 
    'No Employee': data['company[No Employee]'].toString(), 
    'Source (From)': data['company[Source (From)]'] ,
    'CRM': data['company[CRM]'],
    'Standardize Jobs': data['company[Standardize Jobs]'] === 'on',
    'Nexstar Membership': data['company[Nexstar Member]'] === 'on'
  }

  delete data['company[Name]']
  delete data['company[No Employee]']
  delete data['company[Source (From)]']
  delete data['company[CRM]']
  delete data['company[Standardize Jobs]']
  delete data['company[Nexstar Member]']

  return data
}

const bookDemoButtonHandler = event => {
  event.preventDefault()

  FM.trackCustomEvent("Click Book a Call Button after Seeing Price", formData())
}

(function() {
  form = document.getElementById('price-form')
  if ( !form ) return;

  form           = document.getElementById('price-form')
  priceText      = document.getElementById('price-text')
  bookDemoButton = document.getElementById('book-a-demo')

  form.addEventListener('submit', formSubmitHandler)
  bookDemoButton.addEventListener('click', bookDemoButtonHandler)
})();
