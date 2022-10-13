let form           = null
let priceText      = null
let bookDemoButton = null

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const formSubmitHandler = event => {
  event.preventDefault()

  const data = formData()

  form.classList.add('hidden')
  priceText.classList.remove('hidden')
  priceText.classList.add('flex')

  let monthlyFeeElement = document.getElementById('monthly-fee')
  let automatedElement = document.getElementById('automated')

  if ( data.company['Standardize Jobs'] ) {
    automatedElement.classList.remove('hidden')
    automatedElement.classList.add('flex')
  }

  sleep(2000).then(() => { fwcrm.set(data) })

  let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
  monthlyFeeElement.textContent = formatter.format((data.Product === 'DispatchIQ' ? 60 : 100) * parseInt(data.company['No Employee']))
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

(function() {
  form = document.getElementById('price-form')
  if ( !form ) return;

  form      = document.getElementById('price-form')
  priceText = document.getElementById('price-text')

  form.addEventListener('submit', formSubmitHandler)
})();
