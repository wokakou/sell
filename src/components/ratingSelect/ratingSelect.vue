<template>
  <div class="ratingSelect" v-if="ratings">
	  	<div class="rating-type border-1px" >
	  		<div class="all" :class="{'active': ratingType === 2}"  @click="selectType('all' ,$event)">
	  		  {{types.all}}
          <span class="num">({{ratings.length}})</span>
	  		</div>
	  		<div class="positive" :class="{'active': ratingType === 0}" @click="selectType('positive' ,$event)">
	  		  {{types.positive}}
          <span class="num">({{positiveRatings.length}})</span>
	  		</div>
	  		<div class="nagative" :class="{'active': ratingType === 1}" @click="selectType('nagative' ,$event)">
	  		  {{types.nagative}}
          <span class="num">({{nagativeRatings.length}})</span>
	  		</div>
	  	</div>
	  	<div class="check" :class="{active: onlyText}">
	  		<i class="icon-check_circle" @click="toggle($event)"></i>
	  		<span class="text">只看有评论的内容</span>
	  	</div>
  </div>
</template>

<script type="text/javascript">
const POSITTIVE = 0
const NAGATIVE = 1
const ALL = 2
export default {
  props: {
    types: {
      type: Object
    },
    ratingType: {
      type: Number,
      default: ALL
    },
    onlyText: {
      type: Boolean,
      default: false
    },
    ratings: {
      type: Array
    }
  },
  methods: {
    selectType (type, event) {
      let selectType
      if (type === 'all') {
        selectType = ALL
      } else if (type === 'positive') {
        selectType = POSITTIVE
      } else {
        selectType = NAGATIVE
      }
      this.$emit('selectType', selectType, event)
    },
    toggle (event) {
      this.$emit('toggle', !this.onlyText, event)
    }
  },
  computed: {
    positiveRatings () {
      let positiveRatings = this.ratings.filter((rate) => (rate.rateType === POSITTIVE))
      return positiveRatings
    },
    nagativeRatings () {
      let nagativeRatings = this.ratings.filter((rate) => (rate.rateType === NAGATIVE))
      return nagativeRatings
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .ratingSelect
    padding: 0 18px
    border-bottom: 1px solid rgba(7, 17, 27, 0.2)
    font-weight: 700
    .rating-type  
      padding: 12px 18px
      border-1px(rgba(7, 17, 27, 0.1))
      .all, .positive, .nagative
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        font-size: 12px
        font-weight: 700px
        border-radius: 1px
        color: rgb(77, 85, 93)
      .all
        background: rgba(0, 160, 220, 0.2)
      .positive
        background: rgba(0, 160, 220, 0.2)
      .nagative
        background: rgba(77, 85, 93, 0.2)
      .active
        background: rgb(0, 160, 220)
        color: #fff
    .check
      padding: 12px 0
      height: 24px
      font-size: 0
      color: rgb(147, 153, 159)
      line-height: 24px
      .icon-check_circle
        padding: 4px
        line-height: 24px
        font-size: 20px
      .text
        display: inline-block
        font-size: 12px
        line-height: 24px
        vertical-align: top
    .active
      .icon-check_circle
        color: rgb(0, 160, 220)
      .text
        color: rgb(7, 17, 27)


</style>
