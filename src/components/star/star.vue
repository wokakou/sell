<template>
	<div class="star" :class="starType">
		<span class="star-item" :class="type" v-for="type in starArr">	
		</span>
	</div>
</template>

<script type="text/javascript">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'
export default {
  props: {
    size: {
      type: Number
    },
    scores: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    starArr () {
      let arr = []
      let score = Math.floor(this.scores * 2) / 2
      let hasDecimal = score % 1 !== 0
      for (let i = 0; i < score; i++) {
        arr.push(CLS_ON)
      }
      if (hasDecimal) {
        this.$set(arr, score, CLS_HALF)
      }
      while (arr.length < LENGTH) {
        arr.push(CLS_OFF)
      }
      return arr
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .star
    .star-item
      display: inline-block
  .star-24
    .star-item
      width: 10px
      height: 10px
      margin-right: 3px
      background-size: 10px 10px
    &: last-child
      margin-right: 0
    .on
      bg-image('star24_on')
    .off
      bg-image('star24_off')
    .half
      bg-image('star24_half')
  .star-36
    .star-item
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      vertical-align: top
    &: last-child
      margin-right: 0
    .on
      bg-image('star36_on')
    .off
      bg-image('star36_off')
    .half
      bg-image('star36_half')
  .star-48
    .star-item
      width: 20px
      height: 20px
      margin-right: 22px
      background-size: 20px 20px
      &:last-child
        margin-right: 0
    .on
      bg-image('star48_on')
    .off
      bg-image('star48_off')
    .half
      bg-image('star48_half')
	
</style>
