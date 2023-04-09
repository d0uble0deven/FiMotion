<template>
    <form @submit.prevent="onSubmit">
      <label for="search-cards"> Search the card below by name </label>
      <input
        type="text"
        id="search-cards"
        name="card-search"
        autocomplete="off" 
        v-model.lazy.trim="input" 
        />
      <button type="submit">Search</button>
    </form>
  </template>

<script>
  export default {
    methods: {
        onSubmit() {
            if (this.input.length === 0) {
              return
            }
            console.log('test value: ', this.input);   
            this.$emit('cards-searched', this.input);        
        }
  },
  data() {
    return {
        input: "",
    };
  },
};
</script>