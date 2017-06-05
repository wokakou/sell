<template>
    <div class="shopcart-wrapper">
    	<div  class="shopcart">
			<div class="content">
				<div class="content-left">
					<div class="logo-wrapper" @click="toggleList">
						<div class="logo" :class="{'highLight':totalCount>0}">
							<span class="icon-shopping_cart"></span>
						</div>
						<div v-if="totalCount>0" class="count">{{totalCount}}</div>
					</div>
					<div class="price">￥{{totalPrice}}</div>
					<div class="desc">
					 另需配送费 {{delivery}}元
					</div>
				</div>
			<div class="content-right" :class="payClass">{{payDesc}}</div>
			</div>
			<div class="balls-wrapper">
				<div class="ball-container" v-for="ball in balls" >
					<transition
					  name="drop"
					  v-on:before-enter="beforeEnter"
					  v-on:enter="enter"
					  v-on:after-enter="afterEnter"
					>
						<div class="ball" v-if="ball.show">
							<div class="inner"></div>
						</div>
					</transition>
				</div>
			</div>
			<transition name="list">
			<div class="list-wrapper" v-show="listShow">
				<div class="list-header border-1px">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="list-item border-1px" v-for="food in selectedFoods">
							<span class="name">{{food.name}}</span>
							<div class="price-wraper">
								<span class="price">￥{{food.count*food.price}}元</span>
							</div>
							<div class="cartControl-wrapper">
								<cartControl :food="food"></cartControl>
							</div>
							
						</li>
					</ul>
				</div>
			</div>
			</transition>
		</div>
		<transition name="fade">
		<div class="list-mask" v-show="listShow" @click="toggleList"></div>
		</transition>	
    </div>
	
</template>

<script type="text/javascript">
  import eventBus from '../eventBus.js'
  import Velocity from 'Velocity-animate/Velocity.min.js'
  import cartControl from '../cartControl/cartControl'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        fold: true
      }
    },
    props: {
      selectedFoods: {
        type: Array,
        default () {
          return []
        }
      },
      delivery: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    computed: {
      totalPrice () {
        let price = 0
        this.selectedFoods.forEach((food) => {
          price += food.price * food.count
        })
        return price
      },
      totalCount () {
        let count = 0
        this.selectedFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (this.totalCount === 0) {
          this.fold = true
          return false
        }
        let show = !this.fold
        this.$nextTick(() => {
          if (!this.listScroll) {
            this.listScroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.listScroll.refresh()
          }
        })
        return show
      }
    },
    methods: {
      drop (target) {
        for (let i = 0; i < this.balls.length; i++) {
          if (!this.balls[i].show) {
            this.balls[i].show = true
            this.balls[i].target = target
            return
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.target.getBoundingClientRect()
            let x = rect.left - 28
            let y = -(window.innerHeight - rect.top - 30)
            let inner = el.getElementsByClassName('inner')[0]
            Velocity(el, {translateX: x}, 0)
            Velocity(inner, {translateY: y}, 0)
          }
        }
      },
      enter (el, done) {
        let inner = el.getElementsByClassName('inner')[0]
        Velocity(el, {translateX: 0}, 300)
        Velocity(inner, {translateY: 0}, [0.49, -0.29, 0.75, 0.41], 300)
        Velocity(el, {opacity: 0}, {duration: 0, complete: done})
      },
      afterEnter (el) {
        for (let i = 0; i < this.balls.length; i++) {
          if (this.balls[i].show) {
            this.balls[i].show = false
            el.style.display = 'none'
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectedFoods.forEach((food) => {
          food.count = 0
        })
      }
    },
    created () {
    // 异步加载动画，效果更加流畅
      this.$nextTick(() => {
        eventBus.$on('drop', target => {
          this.drop(target)
        })
      })
    },
    components: {
      cartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    line-height: 48px
    z-index: 50
    .content
      display: flex
      height: 48px
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      z-index: 50
      .content-left
        flex: 1
        background: #141d27
        padding: 0 12px
        .logo-wrapper
          position: relative
          display: inline-block
          top: -10px
          margin-right: 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            display: inline-block
            width: 100%
            height: 100%
            text-align: center
            background: #2b343c
            border-radius: 50%
            &.highLight
              background: rgb(0, 160, 220)
              .icon-shopping_cart
                color: rgb(255, 255, 255)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
          .count
            position: absolute
            top: 0
            left: 32px
            width: 24px
            height: 16px
            border-radius: 6px
            vertical-align: bottom
            text-align: center
            background: rgb(240, 20, 20)
            font-size: 12px
            line-height: 16px
            font-weight: 700
            color: rgb(255, 255, 255)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
        .desc
          display: inline-block
          margin: 12px 0
          height: 24px
          vertical-align: top        
          line-height: 24px         
        .price         
          padding-right: 12px
          font-size: 16px
          font-weight: 700
          border-right: 1px rgba(255, 255, 255, 0.1) solid
        .desc
          padding-left: 12px
          font-size: 12px
      .content-right
        flex: 0 0 105px
        width: 105px
        padding: 12px 8px
        box-sizing: border-box        
        text-align: center 
        font-size: 12px     
        line-height: 24px
        font-weight: 700
        &.not-enough
          background: #2b343c          
        &.enough
          background: #00643C
          color: rgb(255, 255, 255)
    .balls-wrapper
      .ball-container
        .ball
          position: fixed
          bottom: 20px
          left: 30px
          z-index: 50
          .inner
            width: 20px
            height: 20px
            border-radius: 50%
            background: rgb(0, 160, 220)
    .list-wrapper
      position: fixed
      left: 0
      bottom: 48px
      width: 100%
      z-index: -1
      color: rgb(7, 17, 27)
      background: #fff
      .list-header
        height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          display: inline-block
          position: relative
          left: 0
          font-size: 14px  
          line-height: 40px
        .empty
          position: relative
          right: 0
          float: right
          font-size: 12px
          line-height: 40px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        .list-item
          border-1px(rgba(7, 17, 27, 0.1))
          padding: 12px 0
          .name
            display: inline-block
            font-size: 14px
            line-height: 24px
            font-weight: 700
          .price-wraper
            display: inline-block
            position: absolute
            right: 102px
            .price
              font-size: 14px
              font-weight: 700
              color: rgb(240, 20, 20)
              line-height: 24px
          .cartControl-wrapper
            position: absolute
            top: 26px
            right: 18px
            font-size: 14px
            line-height: 24px

  .list-enter-active, .list-leave-active
    transition: all .8s
  .list-enter, .list-leave-active
    opacity: 0
    transform: translateY(300px)


  .list-mask
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: rgba(7, 17, 27, 0.6)
    backdrop-filter: blur(10px)

  .fade-enter-active, .fade-leave-active
    transition: all 0.5s
  .fade-enter, .fade-leave-active
    opacity: 0
</style>
