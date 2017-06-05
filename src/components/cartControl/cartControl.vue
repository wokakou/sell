<template>
	<div class="cartControl">
        <transition name="move" >
        	<div class="cart-decrease" v-if="food.count>0" @click.stop="decrease($event)">
				<i class="icon-remove_circle_outline"></i>
			</div>
        </transition>
		
		<div class="count" v-if="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click.stop="add($event)" >
			<i class="icon-add_circle"></i>
		</div>
	    <div class="balls" v-if="">
	    	<div class="inner-balls"></div>
	    </div>
	</div>
</template>

<script type="text/javascript">
import eventBus from '../eventBus.js'

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count ++
      }
      // 触发落球事件
      eventBus.$emit('drop', event.target)
    },
    decrease (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count > 0) {
        this.food.count --
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0
    .count
      display: inline-block
      width: 24px
      font-size: 10px
      line-height: 24px
      color: rgb(147, 153, 159)
      text-align: center
      vertical-align: top
    .cart-add, .cart-decrease
      display: inline-block
      padding: 4px
      width: 24px
      height: 24px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      .icon-add_circle, .icon-remove_circle_outline
        display: inline-block
        width: 24px
        height: 24px
        line-height: 0

  .cartControl  
    .move-enter-active, .move-leave-active
      transition: all 0.3s
    .move-enter, .move-leave-active
      opacity: 0
      transform: translateX(12px)

</style>

