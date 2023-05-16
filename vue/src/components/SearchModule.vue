<template>
  <div className="flex flex-col w-1/5 h-full border border-red-500">

    <div className="flex flex-row p-4">
      <input 
        className="text-black w-2/3 mr-2"
        @input="handleSearchTextChange($event.target.value)"
        :value="searchText"
      />
      <button
        @click="handleSearchClick()"
      >
        Search
      </button>
    </div>
    
    <div className="h-full border border-green-300">
      <div className='flex flex-row p-4 text-2xl'>
        <div className='pr-4'>Searched Places</div>
        <button>Delete</button>
      </div>
      <div className='flex flex-col items-center h-full pb-32 border border-b-violet-600'>
        <!-- search content -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      handleSearchText: Function,
      searchText: String,
      handleSearchClick: Function
    },
    methods: {
      handleSearchTextChange(value) {
        this.handleSearchText(value);
      },
      handleSearchClick() {
        this.handleSearchClick();
      },
    }
  }

</script>