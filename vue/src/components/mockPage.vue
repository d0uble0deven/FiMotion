<template>
  <button @click="getPosts">Get posts</button>
<ul>
  {{ posts }}
  <!-- <li v-for="post in posts" :key="post.id" data-test="post">
    {{ post }}
  </li> -->
</ul>


  <div id="card">



    <!-- {{ mockJSON }} -->
    merchantName:  
    {{ merchantName }}
    <br>
    name:  
    {{ name }}
    <br>
    transactionType:  
    {{ transactionType }}
    <br>
    date:  
    {{ date }}
    <br>
    amount:  
    {{ amount }}
    <br>
    paymentChannel:  
    {{ paymentChannel }}
    <br>
    category:  
    {{ category }}
    <br>
    location:  
    {{ location }}

    <!-- <ol v-for="item in mockJSON" :key="item">
    <li>
      {{ item }}
    </li>
  </ol> -->



  </div>
</template>
  
<script>
import axios from 'axios'
    
  export default {
    props: {
      mockJSON: {},
      merchantName: String,
      name: String,
      transactionType: String,
      date:  String, 
      amount:  Number,
      paymentChannel: String, 
      category: Array,
      location:{}
    },
    data() {
      // console.table(mockJSON)
        return{
          // mockJSONTemplate: mockJSON
          plaidJSON: null
        }
    },
    methods: {
    async getPosts() {
      console.log('getPosts is running!')
      this.plaidJSON = await axios.get('/api/transactions')
      .then((res) => this.plaidJSON = res)
      .then(() => console.log('plaidJSON recieved: ', this.plaidJSON.length, this.plaidJSON))
      .then(() => console.log('plaidJSON[0]: ', this.plaidJSON[0]))
  
      // this.plaidJSON = this.plaidJSON.data
      // this.plaidJSON = JSON.parse(JSON.stringify(this.plaidJSON.data))
      // this.plaidJSON = JSON.stringify(this.plaidJSON.data)
      // this.plaidJSON = JSON.parse(this.plaidJSON.data)
      // console.log('plaidJSON recieved: ', this.plaidJSON.length, this.plaidJSON)
      // console.log('plaidJSON[0]: ', this.plaidJSON[0])





      // this.plaidJSON = await axios.get('https://jsonplaceholder.typicode.com/users')
      // // this.plaidJSON = this.plaidJSON.data
      // this.plaidJSON = JSON.parse(JSON.stringify(this.plaidJSON.data))
      // // this.plaidJSON = JSON.stringify(this.plaidJSON.data)
      // // this.plaidJSON = JSON.parse(this.plaidJSON.data)
      // console.log('plaidJSON recieved: ', this.plaidJSON.length, this.plaidJSON)
      // console.log('plaidJSON[0]: ', this.plaidJSON[0])

    }
  }
  };  
  
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
#card {
  /* display: none; */
  margin: 0 auto;
  margin-bottom: 50px;
  border: black solid 1px;
  width: 50%;
  box-shadow: 0.5rem 0.5rem black, -0.5rem -0.5rem #ccc;
  background-color: #42b983;
}
#card:hover {
  border: white dotted 5px;
  box-shadow: 0 3px 10px rgb(152, 23, 23);
  background-color: yellow
}

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  