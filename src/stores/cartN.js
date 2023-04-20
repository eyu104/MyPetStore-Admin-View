import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const CartStore = defineStore("cart",{
    state: () => {
        return {
            cart: {
            "cartItems": [],
            "numberOfItems": 0,
            "allCartItems": [],
            "cartItemList": [],
            "subTotal": 0
            },

            orderId: 0,
            username: "",
            orderDate: "",
            shipAddress1: "",
            shipAddress2: "",
            shipCity: "",
            shipState: "",
            shipZip: "",
            shipCountry: "",
            billAddress1: "",
            billAddress2: "",
            billCity: "",
            billState: "",
            billZip: "",
            billCountry: "",
            courier: "",
            totalPrice: 0,
            billToFirstName: "",
            billToLastName: "",
            shipToFirstName: "",
            shipToLastName: "",
            creditCard: "",
            expiryDate: "",
            cardType: "",
            locale: "",
            status: "",
            lineItems: [],
            
            
            

            // "cartItems": [],
            // "numberOfItems": 0,
            // "allCartItems": [],
            // "cartItemList": [],
            // "subTotal": 0
        }

    },
    actions: {

    },
    getters: {

    }
},{
    persist: {
        storage: localStorage,
        serializer: {
            deserialize: JSON.parse,
            serialize: JSON.stringify,
          }
    }
})