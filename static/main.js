if (document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}



const openBtn = document.getElementById('open_cart_btn')
const cart = document.getElementById('sidecart')
const closeBtn = document.getElementById('close_btn')
const backdrop = document.querySelector('.backdrop')
const itemsEl = document.querySelector('.items')

openBtn.addEventListener('click', openCart)
closeBtn.addEventListener('click',closeCart)
backdrop.addEventListener('click',closeCart)

//Open Cart
function openCart(){
  cart.classList.add('open')
  backdrop.style.display = 'block'

  setTimeout(() => {
     backdrop.classList.add('show')
  },0)
}


//Close cart
function closeCart(){
  cart.classList.remove('open')
  backdrop.classList.remove('show')

  setTimeout(() => {
     backdrop.style.display = 'none'
  },500)
}





function ready(){
     var removeCartItemButtons=document.getElementsByClassName('btn-danger')
     console.log(removeCartItemButtons)
     for (var i = 0; i < removeCartItemButtons.length; i++) {
          var button = removeCartItemButtons[i]
          button.addEventListener('click',removeCartItem)
     }
     var quantityInputs = document.getElementsByClassName('cart_quantity')
     for (var i = 0; i < quantityInputs.length; i++){
          var input = quantityInputs[i]
          input.addEventListener('change',quantityChanged)
     }

     var addToCartButtons = document.getElementsByClassName('btnAddAction')
     for (var i = 0; i < addToCartButtons.length; i++){
           var button = addToCartButtons[i]
           button.addEventListener('click',addToCartClicked)
     }

     document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
      alert('Thank you for your purchase')
      var cartItems=document.getElementsByClassName('cart_items')[0]
      while (cartItems.hasChildNodes()) {
         cartItems.removeChild(cartItems.firstChild)
      }
      updateCartTotal()
}

function removeCartItem(event){
     var buttonClicked = event.target
     buttonClicked.parentElement.parentElement.remove()
     updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
         input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
     var button = event.target
     var shopItem = button.parentElement.parentElement
     var title = shopItem.getElementsByClassName('product-name')[0].innerText
     var price = shopItem.getElementsByClassName('f-cur-price')[0].innerText
     var imageSrc = shopItem.getElementsByClassName('item-img')[0].src
     console.log(title,price,imageSrc)
     addItemToCart(title,price,imageSrc)
     updateCartTotal()
}

function addItemToCart(title,price,imageSrc){
     var cartRow = document.createElement('div')
     cartRow.classList.add('cart_items')
     var cartItems = document.getElementsByClassName('cart_items')[0]
     var cartItemNames = cartItems.getElementsByClassName('cart_item_title')
     for (var i = 0; i < cartItemNames.length; i++){
          if (cartItemNames[i].innerText == title){
               alert('This item is already added to the cart')
               return
          }
     }
     var cartRowContents = `
           <div class="cart_item">
               <div class="remove_item">
                   <button  class="btn btn-danger">&times;</button>
               </div>
               <div class="item_img">
                   <img src="${imageSrc}" alt=""/>
               </div>
               <div class="item_details">
                   <p class="cart_item_title">${title}</p>
                   <strong class="cart_price">Rs${price}</strong>
                   <label>Quantity</label>
                   <input  class="cart_quantity" type="number"   value="1"  />
               </div>
            </div>`
     cartRow.innerHTML = cartRowContents
     cartItems.append(cartRow)
     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
     cartRow.getElementsByClassName('cart_quantity')[0].addEventListener('change',quantityChanged)
}


function updateCartTotal(){
   var cartItemContainer = document.getElementsByClassName('cart_items')[0]
   var cartRows = cartItemContainer.getElementsByClassName('cart_item')
   var total = 0
   for (var i = 0; i < cartRows.length; i++) {
         var cartRow = cartRows[i]
         var priceElement = cartRow.getElementsByClassName('cart_price')[0]
         var quantityElement = cartRow.getElementsByClassName('cart_quantity')
         [0]
         var price =parseFloat(priceElement.innerText.replace('Rs',''))
         var quantity= quantityElement.value
         total=total+(price*quantity)
   }
   document.getElementsByClassName('subtotal_price')[0].innerText = total
}

