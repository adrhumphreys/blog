<template>
  <div class="burns">

    <div v-for="(questionSet, questionSetIndex) in questionSets" :key="questionSetIndex" class="question-set">
      <p class="title"><strong>{{ questionSet.title }}</strong></p>
      <div class="scale">
        <p>Not at all</p>
        <p>Somewhat</p>
        <p>Moderately</p>
        <p>A Lot</p>
        <p>Extremely</p>
      </div>
      <burns-depression-question v-for="(question, index) in questionSet.questions"
        :key="index"
        v-on:select="updateScore"
        v-bind:index="index"
        v-bind:parent="questionSetIndex"
        v-bind:question="question" />
    </div>

    <div class="score">
      <p><strong>Your score is: </strong> {{ totalScore }}</p>
      <table>
        <thead>
          <th>Level of depresion</th>
          <th>Total score</th>
        </thead>
        <tbody>
          <tr>
            <td>No Depression</td>
            <td>0-5</td>
          </tr>
          <tr>
            <td>Normal but unhappy</td>
            <td>6-10</td>
          </tr>
          <tr>
            <td>Mild depression</td>
            <td>11-25</td>
          </tr>
          <tr>
            <td>Moderate depression</td>
            <td>26-50</td>
          </tr>
          <tr>
            <td>Severe depression</td>
            <td>51-75</td>
          </tr>
          <tr>
            <td>Extreme depression</td>
            <td>76-100</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import BurnsDepressionQuestion from './BurnsDepressionQuestion.vue'

export default {
  components: {
    BurnsDepressionQuestion
  },
  computed: {
    totalScore: function () {
      let total = 0
      this.questionSets.forEach(function(set){
        let setTotal = set.questions.map(function(question){return question.rating})
        .reduce(function(prev, next){return prev + next})
        total += setTotal
      })
      return total
    }
  },
  methods: {
    updateScore: function (questionSetIndex, index, value) {
      this.questionSets[questionSetIndex].questions[index].rating = value
    }
  },
  data: function () {
    return {
      questionSets: [
        {
          title: "Thoughts and Feelings",
          questions: [
            {
              title: "Feeling sad or down in the dumps?",
              rating: null
            },
            {
              title: "Feeling unhappy or blue?",
              rating: null
            },
            {
              title: "Crying spells or tearfulness?",
              rating: null
            },
            {
              title: "Feeling discouraged?",
              rating: null
            },
            {
              title: "Feeling hopeless?",
              rating: null
            },
            {
              title: "Low self-esteem?",
              rating: null
            },
            {
              title: "Feeling worthless or inadequate?",
              rating: null
            },
            {
              title: "Guilt or shame?",
              rating: null
            },
            {
              title: "Criticizing yourself or blaming others?",
              rating: null
            },
            {
              title: "Difficulty making decisions?",
              rating: null
            }
          ]
        },
        {
          title: "Activities and Personal Relationships",
          questions: [
            {
              title: "Loss of interest in family, friends or colleagues?",
              rating: null
            },
            {
              title: "Loneliness?",
              rating: null
            },
            {
              title: "Spending less time with family or friends?",
              rating: null
            },
            {
              title: "Loss of motivation?",
              rating: null
            },
            {
              title: "Loss of interest in work or other activities?",
              rating: null
            },
            {
              title: "Avoiding work or other activities?",
              rating: null
            },
            {
              title: "Loss of pleasure or satisfaction in life?",
              rating: null
            }
          ]
        },
        {
          title: "Physical Symptoms",
          questions: [
            {
              title: "Feeling tired?",
              rating: null
            },
            {
              title: "Difficulty sleeping or sleeping too much?",
              rating: null
            },
            {
              title: "Decreased or increased appetite?",
              rating: null
            },
            {
              title: "Loss of interest in sex?",
              rating: null
            },
            {
              title: "Worrying about your health?",
              rating: null
            }
          ]
        },
        {
          title: "Suicidal Urges",
          questions: [
            {
              title: "Do you have any suicidal thoughts?",
              rating: null
            },
            {
              title: "Would you like to end your life?",
              rating: null
            },
            {
              title: "Do you have a plan for harming yourself?",
              rating: null
            }
          ]
        }
      ]
    }
  }
}
</script>
