var $zoho = $zoho || {}
$zoho.salesiq = $zoho.salesiq || { 
  widgetcode: "08e2bc9e028e12192b43ec8fe0670f59fbe8368f78f523d134e0d795ae3d031e", 
  values: {}
}

var d = document 
s = d.createElement("script") 
s.type = "text/javascript" 
s.id = "zsiqscript" 
s.defer = true
s.src = "https://salesiq.zoho.com/widget" 
t = d.getElementsByTagName("script")[0] 
t.parentNode.insertBefore(s, t)