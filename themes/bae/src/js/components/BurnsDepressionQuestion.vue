<template>
  <div class="question">
    <p class="title">{{ question.title }}</p>
    <div class="rating">
      <div class="radio">
        <button type="button" v-on:click="selectValue(0)" v-bind:class="{ 'is-selected': question.rating == 0 }"></button>
        <button type="button" v-on:click="selectValue(1)" v-bind:class="{ 'is-selected': question.rating == 1 }"></button>
        <button type="button" v-on:click="selectValue(2)" v-bind:class="{ 'is-selected': question.rating == 2 }"></button>
        <button type="button" v-on:click="selectValue(3)" v-bind:class="{ 'is-selected': question.rating == 3 }"></button>
        <button type="button" v-on:click="selectValue(4)" v-bind:class="{ 'is-selected': question.rating == 4 }"></button>
      </div>
      <div class="words">
        <p>Not at all</p>
        <p>Extremely</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    index: Number,
    parent: Number
  },
  methods: {
    selectValue (value) {
      this.question.rating = value
      this.$emit('select', this.parent, this.index, value)
    }
  }
}
</script>
