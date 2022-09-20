let cases                = []
let currentCaseIndex     = null
let controls             = []
let testimonialsInterval = null


const activateCase = (caseElement) => {
  let caseIndex = cases.indexOf(caseElement)

  controls[caseIndex].classList.remove('cursor-pointer')
  controls[caseIndex].classList.add('active', '!w-6', '!bg-greyscale-400')

  caseElement.classList.remove('hidden')
}

const deactivateCase = (caseElement) => {
  let caseIndex = cases.indexOf(caseElement)

  if ( !controls[caseIndex].classList.contains('cursor-pointer') ) controls[caseIndex].classList.add('cursor-pointer')
  controls[caseIndex].classList.remove('active', '!w-6', '!bg-greyscale-400')

  if ( !caseElement.classList.contains('hidden') ) caseElement.classList.add('hidden')
}

const caseProcessor = (caseElement, caseIndex) => {
  caseIndex === currentCaseIndex ? activateCase(caseElement) : deactivateCase(caseElement)
}

const startTestimonialsInterval = () => {
  if ( currentCaseIndex === null )  currentCaseIndex = 0
  else currentCaseIndex = (currentCaseIndex + 1) % cases.length

  cases.forEach(caseProcessor)
}

const insertControls = (controlsArea) => {
  cases.forEach(() => {
    let control = document.createElement('li')
    control.classList.add('cursor-pointer', 'h-2', 'w-2', 'rounded-full', 'bg-greyscale-400/25', 'hover:bg-greyscale-400/75')
  
    controlsArea.appendChild(control)
    controls.push(control)
  })
}

(function() {
  const slider = document.getElementById('testimonials')
  if ( !slider ) return;

  let controlsArea = slider.querySelector('#controls')
  
  cases = Array.from(slider.querySelectorAll('#cases > li'))

  insertControls(controlsArea)

  testimonialsInterval = setInterval(startTestimonialsInterval, 6000)
  startTestimonialsInterval()
})();
