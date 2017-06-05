<template>
	<div class="food" v-show="showFlag" ref="content">
		<div class="content"  v-if="food" >
			<div class="food-header" v-if="food">
				<div class="image-wrapper">
					<img class="image" :src="food.image"/>
					<div class="back" @click="back">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
			</div>
		    <div class="food-detail" >
				  <h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="nowPrice">￥{{food.price}}</span>
					<span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="addToShopcart" v-if="!food.count||food.count===0" @click.stop="addToShopcart($event)">
					<span class="text">加入购物车</span>
				</div>
				<div class="cartControl-wrapper" v-else>
					<cartControl :food="food"></cartControl>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商品介绍</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="ratingSelect-wrapper">
				<h1 class="title">商品评价</h1>
				<ratingSelect 
         class="ratingSelect"
         ref="ratingSelect"
         :types="types" 
         :ratingType="ratingType"
         :onlyText="onlyText"
         :ratings="food.ratings"
         @selectType="selectType"
         @toggle="toggle"
         >
				</ratingSelect>
			</div>
      <div class="rating-content" >
        <ul v-if="food.ratings && selectedRatings">
          <li class="rate-wraper border-1px" v-for="rate in selectedRatings">
            <div class="rate-info">
              <div class="time">
                <span>{{rate.rateTime | formatDate}}</span>
              </div>
              <div class="user">
                <span class="name">{{rate.username}}</span>
                <div class="avatar-wrapper">
                  <img :src="rate.avatar" width="12px" height="12px"  class="avatar" />
                </div>
              </div>
            </div>
            <div class="rate">
              <div class="icon">
                <i class="icon-thumb_down" v-if="rate.rateType === 1"></i>
                <i class="icon-thumb_up" v-else></i>
              </div>
              <span v-if="rate.text" class="text">{{rate.text}}</span>
            </div>
          </li>
        </ul>
        <div class="no-rating">
          <span>暂无评价</span>
        </div>
      </div>
		</div>
	</div>
	
</template>
<script type="text/javascript">
  import eventBus from '../eventBus.js'
  import BScroll from 'better-scroll'
  import cartControl from '../cartControl/cartControl'
  import split from '../split/split'
  import ratingSelect from '../ratingSelect/ratingSelect'
  import {formatDate} from 'src/common/js/formatDate'
  const ALL = 2
  export default {
    data () {
      return {
        showFlag: false,
        types: {
          all: '全部',
          positive: '推荐',
          nagative: '吐槽'
        },
        ratingType: ALL,
        onlyText: false
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.content, {
              click: true
            })
          } else {
            this.foodScroll.refresh()
          }
        })
      },
      back () {
        if (!event._constructed) {
          return
        }
        this.showFlag = false
      },
      addToShopcart (event) {
        if (!event._constructed) {
          return
        }
        this.$set(this.food, 'count', 1)
      // 触发落球事件
        eventBus.$emit('drop', event.target)
      },
      selectType (type, event) {
        if (!event._constructed) {
          return
        }
        this.ratingType = type
        this.$nextTick(() => {
          this.foodScroll.refresh()
        })
      },
      toggle (onlyText, event) {
        if (!event._constructed) {
          return
        }
        this.onlyText = onlyText
        this.$nextTick(() => {
          this.foodScroll.refresh()
        })
      }
    },
    filters: {
      formatDate (rateTime) {
        let date = new Date(rateTime)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    computed: {
      selectedRatings () {
        let ratings = this.food.ratings
        if (this.onlyText) {
          ratings = ratings.filter((rate) => rate.text !== '')
        }
        if (this.ratingType !== ALL) {
          ratings = ratings.filter((rate) => (rate.rateType === this.ratingType))
        }
        return ratings
      }
    },
    components: {
      cartControl,
      split,
      ratingSelect
    }
  }
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  width: 100%
  background: #fff
  color: rgb(7, 17,27)
  z-index: 40
  overflow: hidden
  .content
    .food-header
      .image-wrapper
         position: relative
         width: 100%
         padding-top: 100%
        .image
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 10px
          padding: 10px
          font-size: 20px
          color: rgb(147, 153, 169)
    .food-detail
      position: relative
      padding: 18px
      .title
        font-size: 14px
        font-weight: 700
        line-height: 14px
      .detail
        margin-top: 8px 
        font-size: 0
        color: rgb(147, 153, 159)
        .sell-count
          font-size: 10px
          margin-right: 20px
          line-height: 20px
        .rating
          font-size: 10px
          line-height: 20px
      .price
        margin-top: 18px
        font-weight: 700
        line-height: 24px
        .nowPrice
          font-size: 14px
          color: rgb(240, 20, 20)
        .oldPrice
          font-size: 10px
          color: rgb(147, 153, 159)
          margin-left: 6px
          text-decoration: line-through
      .addToShopcart
        position: absolute
        bottom: 18px
        right: 18px
        width: 74px
        height: 24px
        border-radius: 12px
        background: rgb(0, 160, 220)
        font-size: 10px
        color: #fff
        .text
          display: inline-block
          height: 24px
          width: 74px
          line-height: 24px
          text-align: center
      .cartControl-wrapper
        position: absolute
        bottom: 10px
        right: 18px
        font-size: 14px
        line-height: 24px
    .info
      padding: 18px
      .title
        font-size: 14px
      .text
        padding: 6px 8px
        font-size: 12px
        color: rgb(77, 85, 93)
        line-height: 24px
    .ratingSelect-wrapper
      .title
        margin: 18px 0 6px 18px
        font-size: 14px
    .rating-content
      padding: 0 18px
      .rate-wraper
        padding: 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .rate-info
          height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 12px
          .time
            float: left
          .user
            float: right
            .name
              margin-right: 6px
              vertical-align: top
            .avatar-wrapper
              display: inline-block
              width: 12px
              height: 12px
              .avatar
                border-radius: 50%
        .rate
          font-size: 12px
          margin-top: 6px
          .icon
            display: inline-block
            .icon-thumb_down
              line-height: 24px
            .icon-thumb_up
              line-height: 24px
              color: rgb(0, 160, 220)
          .text
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 16px
      .no-rating
        padding: 16px 0
        font-size: 12px
        color: rgb(147, 153, 159)
</style>
