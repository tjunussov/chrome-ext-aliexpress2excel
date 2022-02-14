// this is the code which will be injected into a given page...


var _$ = function (s, doc = document){
  var e = doc.querySelectorAll(s);
  return e.length == 1? e[0] :Array.from(e);
}

function onInit(){
	if(!_$('#parseAliBtn').length){
		_$('#checkout-button').insertAdjacentHTML('afterend','<button id="parseAliBtn" class="next-btn next-large next-btn-secondary">COPY TO EXCEL</button>');
		_$('#parseAliBtn').addEventListener("click",parseAliCart);
	}
	parseAliCart();
}

function parseAliCart(){

  var r = _$('.shopping-cart-product').map((el)=>{
    return {
    	'image':'=HYPERLINK("'+_$('.product-name-link',el).href+'";IMAGE("'+_$('.product-image img',el).src+'"))',
      'name':_$('.product-name-link',el).innerText,
      'price': _$('.main-cost-price',el)?.innerText?.replace('US ',''),
      'amount':_$('.product-sku',el).innerText?.replaceAll('\n',','),
      'shipping':_$('.logistics-cost',el)?.innerText?.replace('US ','')?.replace('Shipping: ','')?.replace('Free Shipping','$ 0'),
    }
  })
  
  const excelData = Object.keys(r[0]).join("\t").concat('\n'+r.map(lines => Object.values(lines).join("\t")).join("\n"));

  console.log(excelData);

  copyToClipboard(excelData);

  alert(`Copied to clipboard, ${r.length} items, paste it to Google Spreadsheet`);
}

// function copyToClipboard(str, mimeType = 'plain/text') {
// 	console.log(str);
//   document.oncopy = function(event) {
//     event.clipboardData.setData(mimeType, str);
//     event.preventDefault();
//   };
//   document.execCommand("copy", false, null);
// }

function copyToClipboard(text) {
  const input = document.createElement('textarea');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
};

// navigator.clipboard.writeText(excelData).then(function() {
  //   alert('Copied to clipboard, paste it to Excel');
  //   console.log('copyClip',excelData,r);
  // }, function(err) {
  //   console.error('Async: Could not copy text: ', err);
  // });

setTimeout(onInit,1000);

document.addEventListener('parseAliCart', parseAliCart);
