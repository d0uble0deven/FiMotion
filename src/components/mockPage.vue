<template>
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
  