
// import { defineStore } from 'pinia'
// import { ref, computed } from 'pinia'

// function CartItem(item, quantity, inStock, total) {
//     this.item = item;
//     this.quantity = quantity;
//     this.inStock = inStock;
//     this.total = total;
//     this.addQuantity = function() {
//         this.quantity++;
//         this.total += item.listPrice;

//     }

//     this.update = function(qty) {
//         this.quantity = qty;
//         this.total = this.item.listPrice * qty;
//     }
// }

// function Cart(itemMap, itemList) {
//     this.itemMap = itemMap;
//     this.itemList = itemList;

//     this.isItemInStock = function(item) {
//         cartItem = itemMap.get(item.itemId)
//         if(cartItem === null) {
//             cartItem = new CartItem(item,0,true,0);
//             this.itemList.push(cartItem);
//             this.itemMap.set(item.itemId,cartItem);
//         }
//         cartItem.addQuantity();
//     }

//     this.removeItem = function(itemId) {
//         if(this.itemMap.has(itemId)){
//             itemMap.delete(itemId)
//         }
//     }

//     this.reset = function() {
//         this.itemMap = new Map();
//         this.itemList = new Array();
//     }


// }


// export const useCartStore = defineStore('cart', () => {
//     const cart = new Cart(new Map(),new Array);
//     const CartTotal = ref(0)
//     function addItemToCart(item){
//         cart.isItemInStock(item)
//     }

//     function removeItemFromCart(itemId){
//         this.cart.removeItem(itemId);
//     }

//     function resetCart() {
//         this.cart.reset();
//     }

//     function updateCart(itemId, qty) {
//         var CcartItem = this.cart.itemMap.get(itemId);
//         CcartItem.update(qty);
//     }

//     function getTotal() {
//         cart.itemList.forEach(item => {
//             this.CartTotal += item.total;
//         });
//         return this.CartTotal;
//     }

//     return { cart, addItemToCart, removeItemFromCart, resetCart, updateCart }
// })