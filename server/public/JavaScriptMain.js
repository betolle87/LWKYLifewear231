


if(document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready())
} else {
	ready()
}

function ready() {


	var removeCheckoutItems = document.getElementsByClassName('checkoutremovebtn')

	for(var i = 0; i < removeCheckoutItems.length; i++){
	   var button = removeCheckoutItems[i]
	   button.addEventListener('click', removeCheckoutItem)
	}

	var quantityItems = document.getElementsByClassName('checkoutquantity')
	for(var i = 0; i < quantityItems.length; i++){
		var input = quantityItems[i]
		input.addEventListener('change', quantityChanged)

		
	}

	
	var addToCheckout = document.getElementsByClassName('add')
	for(var i = 0; i < addToCheckout.length; i++){
	var button = addToCheckout[i]
	button.addEventListener('click', addToCheckoutClicked)
	}

	

const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");


const appearOptions = {
  rootMargin: "50px ",
  threshold: .7
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
  });





const checkoutbutton = document.getElementsByClassName('checkoutpurchasebtn')[0]
checkoutbutton.addEventListener('click', () =>{
	var itemsInCart = document.getElementsByClassName("checkoutrow")
	const items = []
	for(i = 1; i < itemsInCart.length; i++){
		var item = itemsInCart[i]
		var itemId = parseFloat(item.id)
		var itemQ =  parseFloat(item.getElementsByClassName('checkoutquantity')[0].value)
		items.push ({id: itemId, quantity: itemQ})
	} 
     fetch("/create-checkout-session", {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ items
		  }),
		})
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        //console.log(url)
        window.location = url
      })
      .catch(e => {
        console.error(e.error)
      })
})

 

}






function removeCheckoutItem(event)
	{
		var buttonclicked = event.target
		 buttonclicked.parentElement.remove()
	   updateCheckoutTotal()
	  }



function size(){
	var buttonclicked = event.target
	var index = buttonclicked.id
	var sizenum = index % 4;
	buttonclicked.parentElement.setAttribute('id',sizenum)
}


function sizeNum2Let(sizeNum){
	if(sizeNum == 0){
		return "XL"
	}else if(sizeNum == 1){
		return "S"
	}else if(sizeNum == 2){
		return "M"
	}else if(sizeNum == 3){
		return "L"
	}
}




function addToCheckoutClicked(event){
var buttonclicked = event.target
var shopItem = buttonclicked.parentElement.parentElement
var id = shopItem.id //HERE
var title = shopItem.getElementsByClassName('productdescription')[0].innerText
var price = shopItem.getElementsByClassName('price')[0].innerText
var imageSrc  = shopItem.getElementsByClassName('productimg')[0].src
var size = shopItem.getElementsByClassName('sizes')[0].id
addItemToCart(title, price, imageSrc, size, id)
updateCheckoutTotal()
}

function addItemToCart(title, price, imageSrc,size, id){
var cartRow = document.createElement('div')
cartRow.classList.add('checkoutrow')
var checkoutItems = document.getElementsByClassName('checkoutItems')[0]
var cartItemsNames =  checkoutItems.getElementsByClassName('checkoutitem')
var cartItemsSizes =  checkoutItems.getElementsByClassName('checkoutsize')
for(var i = 0; i < cartItemsNames.length; i++){
	if(cartItemsNames[i].innerText == title){
		for(var j = 0; j < cartItemsSizes.length; j++){
			if(cartItemsSizes[i].innerText == size | cartItemsSizes[i].innerText == sizeNum2Let(size)){
			return
		}
	}
}
}
var sizeLetter = sizeNum2Let(size)
var cartRowContents = `
    <img class="checkoutimg checkoutcol" src="${imageSrc}" >
  <span  class="checkoutitem checkoutcol" > ${title}</span>
    <span class="checkoutprice checkoutcol">${price}</span>
	<span class="checkoutsize checkoutcol">${sizeLetter}</span>
    <input class="checkoutquantity checkoutcol" type="number" value="1" >
    <button class="checkoutremovebtn checkoutcol">REMOVE</button>`
  cartRow.innerHTML = cartRowContents
  console.log(id + size)
 cartRow.setAttribute('id',id + size) //HERE
checkoutItems.append(cartRow)
cartRow.getElementsByClassName('checkoutremovebtn')[0].addEventListener('click', removeCheckoutItem)
cartRow.getElementsByClassName('checkoutquantity')[0].addEventListener('change',quantityChanged)

}



function quantityChanged(event)
{
    var input = event.target
	if(isNaN(input.value) || input.value < 1){
		input.value = 1
	}
	updateCheckoutTotal()
	input.setAttribute('id',input.value)
}

// JavaScript source code
var i = 1;

function changeColor(clicked){
	
	if(i == 1){
	document.getElementById(clicked).style.color = "red";
	i--;
	}
	else{
    document.getElementById(clicked).style.color = "white";
	i++;
	}
}




// Checkout


function updateCheckoutTotal(){

	var checkoutItems = document.getElementsByClassName('checkout')[0]
	var checkoutRows = checkoutItems.getElementsByClassName('checkoutrow')
	var total = 0

	for(var i = 1; i < checkoutRows.length; i++){
var checkoutrow = checkoutRows[i]
var priceE = checkoutrow.getElementsByClassName('checkoutprice')[0]
var quantityE = checkoutrow.getElementsByClassName('checkoutquantity')[0]
var price = parseFloat( priceE.innerText.replace('$', ''))
var quantity = quantityE.value

total = total + (price * quantity)



	}
	
document.getElementsByClassName("checkoutpricetotal")[0].innerText = "$" + Math.round(total * 100) / 100



}




