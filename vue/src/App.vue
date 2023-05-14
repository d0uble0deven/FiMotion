<template>
  <button v-on:click="logIn">Log In</button>
  <img alt="Vue logo" src="./assets/logo.png">
   <h1>To-Do List</h1>
   <h2>{{ MockData.length }} cards available</h2>
  <!-- <mockPage msg="Welcome to Your Vue.js App - mockPage"/> -->
  <to-do-form @todo-added="addToDo"></to-do-form>
  <searchMockPage @cards-searched="searchCards"></searchMockPage>
  <ul>
    <li v-for="item in ToDoItems" :key="item.id">
      <to-do-item :label="item.label" :done="item.done" :id="item.id"></to-do-item>
    </li>
  </ul>
  <ul>
    <li v-for="item in MockData" :key="item.id">
      <!-- <to-do-item :label="item.account_id" :done="item.account_id" :id="item.account_id"></to-do-item> -->
      <mockPage :mockJSON="item"
       :merchantName="item.merchant_name"
        :name="item.name"
         :transactionType="item.transaction_type"
         :date="item.date"
         :amount="item.amount"
         :paymentChannel="item.payment_channel"
         :category="item.category"
         :location="item.location"
         ></mockPage>
            <!-- {{ item['merchant_name'] }}
      {{ item.name }}
      {{ item.transaction_type }}
      {{ item.date }}
      {{ item.amount }}
      {{ item.payment_channel }}
      {{ item.category }}
      {{ item.location }} -->
    </li>
  </ul>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mockPage from './components/mockPage.vue'
// import {mockData} from "./components/mockData"

import ToDoItem from "./components/ToDoItem.vue";
import ToDoForm from "./components/ToDoForm";
import searchMockPage from './components/searchMockPage.vue';

import uniqueId from "lodash.uniqueid";

export default {
  name: 'App',
  components: {
    ToDoForm,
    ToDoItem,
    searchMockPage,
    mockPage
  },
  data() {
    return {
      ToDoItems:[
        { id: uniqueId("todo-"), label: "Learn Vue", done: false },
        {
          id: uniqueId("todo-"),
          label: "Create a Vue project with the CLI",
          done: true,
        },
        { id: uniqueId("todo-"), label: "Have fun", done: true },
        { id: uniqueId("todo-"), label: "Create a to-do list", done: false },
      ],
      MockData: [
      {
        account_id: 'lkgnVxEw53hmELa4lodJSQVdvlLw1puajlyA7',
        account_owner: null,
        amount: 6.33,
        authorized_date: '2023-03-13',
        authorized_datetime: null,
        category: [ 'Travel', 'Taxi' ],
        category_id: '22016000',
        check_number: null,
        date: '2023-03-14',
        datetime: null,
        iso_currency_code: 'USD',
        location: {
          address: null,
          city: null,
          country: null,
          lat: null,
          lon: null,
          postal_code: null,
          region: null,
          store_number: null
        },
        merchant_name: 'Uber',
        name: 'Uber 072515 SF**POOL**',
        payment_channel: 'online',
        payment_meta: {
          by_order_of: null,
          payee: null,
          payer: null,
          payment_method: null,
          payment_processor: null,
          ppd_id: null,
          reason: null,
          reference_number: null
        },
        pending: false,
        pending_transaction_id: null,
        personal_finance_category: null,
        transaction_code: null,
        transaction_id: 'klXW53EVjBsAE5P91zxJUnl3G5ddyLczXElZd',
        transaction_type: 'special',
        unofficial_currency_code: null
      },
      {
        account_id: 'lkgnVxEw53hmELa4lodJSQVdvlLw1puajlyA7',
        account_owner: null,
        amount: 5.4,
        authorized_date: '2023-02-28',
        authorized_datetime: null,
        category: [ 'Travel', 'Taxi' ],
        category_id: '22016000',
        check_number: null,
        date: '2023-03-01',
        datetime: null,
        iso_currency_code: 'USD',
        location: {
          address: null,
          city: null,
          country: null,
          lat: null,
          lon: null,
          postal_code: null,
          region: null,
          store_number: null
        },
        merchant_name: 'Uber',
        name: 'Uber 063015 SF**POOL**',
        payment_channel: 'online',
        payment_meta: {
          by_order_of: null,
          payee: null,
          payer: null,
          payment_method: null,
          payment_processor: null,
          ppd_id: null,
          reason: null,
          reference_number: null
        },
        pending: false,
        pending_transaction_id: null,
        personal_finance_category: null,
        transaction_code: null,
        transaction_id: 'lkgnVxEw53hmELa4lodJSQVN53aaEzIEkWVb7',
        transaction_type: 'special',
        unofficial_currency_code: null
      },
      {
        account_id: 'lkgnVxEw53hmELa4lodJSQVdvlLw1puajlyA7',
        account_owner: null,
        amount: -500,
        authorized_date: '2023-02-27',
        authorized_datetime: null,
        category: [ 'Travel', 'Airlines and Aviation Services' ],
        category_id: '22001000',
        check_number: null,
        date: '2023-02-27',
        datetime: null,
        iso_currency_code: 'USD',
        location: {
          address: null,
          city: null,
          country: null,
          lat: null,
          lon: null,
          postal_code: null,
          region: null,
          store_number: null
        },
        merchant_name: 'United Airlines',
        name: 'United Airlines',
        payment_channel: 'in store',
        payment_meta: {
          by_order_of: null,
          payee: null,
          payer: null,
          payment_method: null,
          payment_processor: null,
          ppd_id: null,
          reason: null,
          reference_number: null
        },
        pending: false,
        pending_transaction_id: null,
        personal_finance_category: null,
        transaction_code: null,
        transaction_id: 'q35yVPwzpkc4wL5enkJKu815zKXXNviNZWzwR',
        transaction_type: 'special',
        unofficial_currency_code: null
      },
      ], 
    };
  },
  methods: {    
    addToDo(toDoLabel) {
      console.log("To-do added - toDoLabel, ToDoItems: ", toDoLabel, this.ToDoItems);
      this.ToDoItems.push({id:uniqueId('todo-'), label: toDoLabel, done: false});
    },
    searchCards(cardsName) {
      console.log("Cards searched - cardsName, MockData: ", cardsName, this.MockData);
      this.MockData = this.MockData.filter((e)=> e.name == cardsName);
    },
    async logIn() {
      console.log("logIn ");
      // this.MockData = this.MockData.filter((e)=> e.name == cardsName);

  
    
    }
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: cornflowerblue;
}
</style>
