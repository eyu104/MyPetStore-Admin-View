import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const accountStore = defineStore("account",{
    state: () => {
        return {
            suppId:1,
            name:'',
            status:'',
            addr1:'',
            addr2:'',
            city:'',
            state:'',
            zip:'',
            phone:'',
            supplierAccountName:'',
            password:'',
            email:'',
        }

    },
    actions: {
    },
    getters: {

    },
    persist: true,
})