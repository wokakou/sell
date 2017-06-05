<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
    	<ul class="menu border-1px">
    		<li class="item" 
    		    :class="{'current': currentIndex === index}" 
    		    v-for="(item, index) in goods"
    		    @click="selectMenu(index, $event)"
    		    >
    		    <span class="name">
    				<span class="icon" :class="classMap[item.type]" v-if="item.type>0"></span>
    				{{item.name}}
    			</span>
    		</li>
    	</ul>
    </div>
    <div class="foods-wrapper" ref="foods">
    	<ul >
    		<li class="foods-list foods-list-hook" v-for="item in goods">
    		    <h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li 
              class="foods-item border-1px "
              v-for="(food, index) in item.foods"
              @click="selectFood(food, $event)"
              >
    				    <div class="icon">
    				    	<img :src="food.icon" width="56px" height="56px" />
    				    </div>
    				    <div class="content">
    				    	<h2 class="name">{{food.name}}</h2>
    				    	<p v-if="food.description" class="desc">{{food.description}}</p>
    				    	<div class="extra">
    				    		<span class="sell">月售{{food.sellCount}}份</span>
    							<span class="rating">好评率{{food.rating}}%</span>
    				    	</div>
    				    	<div class="price">
    				    		<span class="nowPrice">￥{{food.price}}</span>
    							<span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
    				    	</div>
                  <div class="cartControl-wrapper">
                    <cartControl :food="food" ></cartControl>
                  </div>
    				    </div>   					
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
    <shopcart :selectedFoods="selectedFoods"
              :delivery="seller.deliveryPrice"
              :minPrice="seller.minPrice"
              ></shopcart>
    <transition name="food">
      <food class="food" ref="food" :food="selectedFood"></food>
    </transition>
    
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartControl from '../cartControl/cartControl'
import food from '../food/food'
const ERR_OK = 0
export default {
  data () {
    return {
      goods: [],
      foodsHeightList: [],
      scrollY: 0,
      selectedFood: null
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initBScroll()
          this._caculateHeight()
        })
      }
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.foodsHeightList.length; i++) {
        let height1 = this.foodsHeightList[i]
        let height2 = this.foodsHeightList[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectedFoods () {
      let foodsList = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count && food.count > 0) {
            foodsList.push(food)
          }
        })
      })
      return foodsList
    }
  },
  methods: {
    _caculateHeight () {
      this.foodsList = this.$refs.foods.getElementsByClassName('foods-list-hook')
      let height = 0
      this.foodsHeightList.push(height)
      for (let i = 0; i < this.foodsList.length; i++) {
        height += this.foodsList[i].clientHeight
        this.foodsHeightList.push(height)
      }
    },
    _initBScroll () {
      this.munuScroll = new BScroll(this.$refs.menu, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foods, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let el = this.foodsList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    }
  },
  components: {
    shopcart,
    cartControl,
    food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 56px
      width: 56px
      padding: 0 12px
      background: #f3f5f7
      .menu
        .item
          display: table
          width: 56px
          height: 54px
          line-height: 14px
          font-size: 12px
          border-1px(rgba(7,17,27,0.1))
          &.current
            position: relative
            left: -12px
            top: -1px
            padding: 0 12px
            background: #fff
            font-weight: 700
            &:after
              border: none
          .name
            display:table-cell
            vertical-align: middle
            font-size:12px  
            text-align: center
            .icon           
              display: inline-block
              background-size :12px 12px
              background-repeat: no-repeat
              width:12px
              height:12px
              vertical-align:top
              &.decrease
                bg-image('decrease_3')
              &.discount
                bg-image('discount_3')
              &.guarantee
                bg-image('guarantee_3')
              &.invoice
                bg-image('invoice_3')
              &.special
                bg-image('special_3')       
    .foods-wrapper
      flex: 1
      .foods-list
        color: rgba(147, 153, 159, 0.8)
        .title
          height: 26px
          padding-left: 14px
          background:#f3f5f7
          border-left: 2px solid #d9dde1
          font-size: 12px
          font-weight: 700
          line-height: 26px   
        .foods-item
          display: flex
          padding-bottom: 18px
          margin: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            &:after
              border: none
          .icon
            flex: 0 0 56px
            width: 56px
            height: 56px
          .content
            flex: 1
            margin-left: 10px
            .name
              margin-top: 2px
              font-size: 14px
              color: rgb(7, 17, 27)
              line-height: 14px
            .desc
              margin-top: 8px
              font-size: 10px
              line-height: 12px
            .extra
              margin-top: 8px
              line-height: 10px
              font-size: 0
              .sell
                font-size: 10px
              .rating
                font-size: 10px              
                margin-left: 12px
            .price
              font-size:0
              line-height: 24px
              height: 24px
              .nowPrice
                font-size: 14px
                color: rgb(240, 20, 20)
                font-weight: 700
              .oldPrice
                margin-left: 8px
                font-size: 10px
                font-weight: 700
                text-decoration: line-through
            .cartControl-wrapper
              position: absolute
              right: 0
              bottom: 18px

  .food-enter-active
    transition: all .5s
  .food-enter 
    transform: translateX(100%)
    opacity: 0

</style>
