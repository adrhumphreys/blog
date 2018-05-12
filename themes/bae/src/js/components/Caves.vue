<template>
  <div class="caves">
    <h1>CAVES!1!!</h1>
    <p>Generating caves is a fun exercise in cellular automata</p>
    <div class="cave">
      <p class="cave-row" v-for="row in map">
        <span class="cave-pixel" v-for="pixel in row">{{ pixel == 1 ? '#' : '&nbsp;'}}</span>
      </p>
    </div>
    <br>
    <br>
    <p>For the first step we just create an array that is 16x16 with random data (1's and 0's)</p>
    <pre v-highlightjs><code class="javascript">for (var i = this.height - 1; i >= 0; i--) {
  this.map.push(Array.from({length: this.width}, () => Math.floor(Math.random() * 2)))
}</code></pre>
    <p>Now we need to make the map cleaner, this currently looks like goopdy doop. The classic rule set is a tile stays a wall (#) if four of its neighbours were walls or if it was not a wall and 5 or more neighbours were.
    The idea for this is to iterate until we have a map that looks better</p>

    <button v-on:click="iterateMap" class="cave-button">Iterate map</button>
    
    <div class="cave" v-if="map2">
      <p class="cave-row" v-for="row in map2">
        <span class="cave-pixel" v-for="pixel in row">{{ pixel == 1 ? '#' : '&nbsp;'}}</span>
      </p>
    </div>

    <br>
    <br>
    <p>You could then turn this data into some kind of tiles that look really nice (not like this)</p>

    <div class="cave-tiles" v-if="map2">
      <template v-for="row in map2">
        <div class="cave-pixel" v-for="pixel in row" v-bind:class="[pixel == 1 ? 'wall' : 'not-wall']"></div>
      </template>
    </div>    

  </div>
</template>

<script>

export default {
  data: function () {
    return {
      width: 64,
      height: 32,
      map: [],
      map2: null,
    }
  },
  methods: {
    iterateMap: function () {
      if(!this.map2) {
        this.map2 = JSON.parse(JSON.stringify(this.map));
        return;
      }

      for (let y = this.map2.length - 1; y >= 0; y--) {
        for (let x = this.map2[y].length - 1; x >= 0; x--) {

          let walls = this.adjacentWalls(x, y)

          if(this.map2[y][x] === 1) {
            if (walls >= 4) {
              const row = this.map2[y];
              row[x] = 1;
              this.map2.splice(y, 1, row)
            }
            if (walls <= 2) {
              const row = this.map2[y];
              row[x] = 0;
              this.map2.splice(y, 1, row)
            }

          } else {
            if (walls >= 5) {
              const row = this.map2[y];
              row[x] = 1;
              this.map2.splice(y, 1, row)
            }
          }
        }
      }
    },
    adjacentWalls: function (x, y) {
      let startX = x - 1,
          endX = x + 1,
          startY = y - 1,
          endY = y + 1;

          let walls = this.isWall(startX, startY) + this.isWall(x, startY) + this.isWall(endX, startY)
        + this.isWall(startX, y) + this.isWall(endX, y)
        + this.isWall(startX, endY) + this.isWall(x, endY) + this.isWall(endX, endY)

        return walls
    },
    isWall: function (x, y) {
      return this.isOutOfBounds(x, y) || (this.map2[y][x] === 1) ? 1 : 0;
    },
    isOutOfBounds: function (x, y) {
      return (x < 0 || y < 0) || (x > this.width - 1 || y > this.height - 1)
    }

  },
  mounted: function () {
    for (var i = this.height - 1; i >= 0; i--) {
      if(Math.ceil(this.height/2) === i) {
        let arr = Array.from({length: this.width}, () => 0)
        arr[0] = 1;
        arr[this.width-1] = 1;
        this.map.push(arr)
      } else if (i === 0 || i === this.height - 1) {
        this.map.push(Array.from({length: this.width}, () => 1))
      } else {
        let arr = Array.from({length: this.width}, () => Math.floor(Math.random() < 0.4))
        arr[0] = 1;
        arr[this.width-1] = 1;
        this.map.push(arr)
      }
    }

    this.map2 = JSON.parse(JSON.stringify(this.map));
  }
}
</script>
