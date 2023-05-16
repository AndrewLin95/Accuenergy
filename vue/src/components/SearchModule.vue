<template>
  <div className="flex flex-col w-1/5 h-full border border-gray-600">
    <!-- Search bar -->
    <div className="flex flex-row p-4">
      <input 
        className="w-2/3 mr-2 text-white p-2"
        @input="handleSearchTextChange($event.target.value)"
        :value="searchText"
        @keyup.enter="handleSearchClick()"
      />
      <button
        @click="handleSearchClick()"
      >
        Search
      </button>
    </div>
    <!-- Search Results -->
    <div className="h-full">
      <div className='flex flex-row justify-center items-center p-4 text-2xl'>
        <div className='pr-4 text-lg'>Searched Places</div>
        <button
          @click="handleDeleteSearchHistory()"
          className="text-lg"
        >
          Delete
        </button>
      </div>
      <div className='flex flex-col items-center h-full pb-32'>
        <div v-for="(value, key) in searchHistoryDisplayData" 
          :key="key"
          className="pb-8 w-full flex justify-center items-center"
        >
          <input 
            type="checkbox"
            @click="handleDeleteFlagClick($event.target.checked, value.id)"
            :checked="value.deleteFlag"
            className="w-14 ml-12"
          />
          <div className="w-full">
            {{ value.location }}
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div className="flex flex-row justify-center pb-4">
      <button className="w-12 h-12 border" @click="handlePageChange('-')">
        {{ "<" }}
      </button>
      <button v-for="(value, key) in paginationState"
        className="w-12 h-12 border"
        @click="handlePageChange(value)"
        :key="key"
      >
        {{ value }}
      </button>
      <button className="w-12 h-12 border" @click="handlePageChange('+')">
        {{ ">" }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      handleSearchText: Function,
      searchText: String,
      handleSearchClick: Function,
      searchHistoryDisplayData: Object,
      handlePageChange: Function,
      paginationState: Object,
      handleDeleteFlagClick: Function,
      handleDeleteSearchHistory: Function,
    },
    methods: {
      handleSearchTextChange(value) {
        this.handleSearchText(value);
      },
      handleSearchClick() {
        this.handleSearchClick();
      },
      handlePageChange(value) {
        this.handlePageChange(value);
      },
      handleDeleteFlagClick(state, id) {
        this.handleDeleteFlagClick(state, id);
      },
      handleDeleteSearchHistory() {
        this.handleDeleteSearchHistory();
      }
    }
  }
</script>