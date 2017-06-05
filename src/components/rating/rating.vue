<template>
  <div class="rating" v-if="seller" ref="ratings">
    <div class="reating-content" >
    	<div class="overview">
    		<div class="overview-left">
    			<div class="score">{{seller.score}}</div>
    			<div class="title">综合评价</div>
    			<div class="rank">高于周边商家{{seller.rankRate}}%</div>	
    		</div>	
    		<div class="overview-right">
    			<div class="score-wrapper">
    				<span class="title">服务评价</span>
    				<star class="srar" :size="36" :scores="seller.serviceScore"></star>
    				<span class="score">{{seller.serviceScore}}</span>
    			</div>
    			<div class="score-wrapper">
    				<span class="title">食物评价</span>
    				<star class="srar" :size="36" :scores="seller.foodScore"></star>
    				<span class="score">{{seller.foodScore}}</span>
    			</div>
    			<div class="deliveryTime">
    			    <span class="title">送达时间</span>
    			    <span class="time">{{seller.deliveryTime}}分钟</span>
    				
    			</div>
    		</div>
    	</div>
    	<split></split>
    	<div class="ratingSelect-wrapper">
	    	<ratingSelect
	         class="ratingSelect"
	         :types="types"
	         :ratingType="ratingType"
	         :onlyText="onlyText"
	         :ratings="ratings"
	         @selectType="selectType"
             @toggle="toggle"
	    	></ratingSelect>
    	</div>
    	<div class="ratings-wrapper">
    		<ul>
    			<li class="rating-item border-1px" v-for="rating in selectedRatings" >
    				<div class="avatar">
    					<img :src="rating.avatar" width="28px"  height="28px"/>
    				</div>	
    				<div class="content">
    					<div class="header">
    						<div class="name">{{rating.username}}</div>
    					<div class="star-wrapper">
    						<star :size="24" :scores="rating.score"></star>
    						<span class="deliveryTime" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
    					</div>
    					<div class="text">{{rating.text}}</div>
    					<div class="recommend" v-if="rating.recommend">
    						<span class="icon-thumb_up" v-if="rating.rateType === 0 "></span>
    						<span class="icon-thumb_down" v-if="rating.rateType === 1 "></span>
    						<span class="recommend-item"v-for="item in rating.recommend">{{item}}</span>
    					</div>
    					<div class="time">
    							{{rating.rateTime | formatDate}}</div>
    					</div>	
    				</div>
    			</li>
    		</ul>
    		
    	</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import split from '../split/split'
import star from '../star/star'
import ratingSelect from '../ratingSelect/ratingSelect'
import {formatDate} from 'src/common/js/formatDate'
const ERR_OK = 0
const ALL = 2
export default {
  data () {
    return {
      ratings: [],
      types: {
        all: '全部',
        positive: ' 满意',
        nagative: '不满意'
      },
      ratingType: ALL,
      onlyText: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.ratingScroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  methods: {
    selectType (type, event) {
      if (!event._constructed) {
        return
      }
      this.ratingType = type
      this.$nextTick(() => {
        this.ratingScroll.refresh()
      })
    },
    toggle (onlyText, event) {
      if (!event._constructed) {
        return
      }
      this.onlyText = onlyText
      this.$nextTick(() => {
        this.ratingScroll.refresh()
      })
    }
  },
  computed: {
    selectedRatings () {
      let selectedRatings = this.ratings
      if (this.onlyText) {
        selectedRatings = selectedRatings.filter((rate) => rate.text !== '')
      }
      if (this.ratingType !== ALL) {
        selectedRatings = selectedRatings.filter((rate) => (rate.rateType === this.ratingType))
      }
      return selectedRatings
    }
  },
  filters: {
    formatDate (time) {
      let forDate = new Date(time)
      return formatDate(forDate, 'yy-MM-dd hh:mm')
    }
  },
  components: {
    split,
    star,
    ratingSelect
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

  .rating  
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .reating-content
      .overview
        display: flex
        padding: 18px 0
        font-weight: 700
        .overview-left
          flex: 0 0 137px
          width: 137px
          color: rgb(7, 17, 27)
          text-align: center
          border-right: 1px rgba(7, 17, 27, 0.2) solid
          @media only screen and (max-width: 320px)
            flex: 0 0 120px
            width: 120px
          .score
            font-size: 24px
            color: rgb(255, 153, 0)
            line-height: 28px
          .title
            margin-top: 6px
            font-size: 12px
            line-height: 12px
          .rank
            margin: 8px 0 6px 0
            font-size: 10px
            font-weight: 200
            color: rgb(147, 153, 159)
        .overview-right
          flex: 1
          padding-left: 24px
          @media only screen and (max-width: 320px)
            padding-left: 6px
          .score-wrapper
            margin-bottom: 8px
            font-size: 12px
            line-height: 18px
            .title
              margin-right: 12px
              vertial-align: top
            .star
              display: inline-block
            .score
              color: rgb(255, 153, 0)
          .deliveryTime
            font-size: 12px
            line-height: 18px
            .title
              margin-right: 12px
            .time
              color: rgb(147, 153, 159) 
      .ratings-wrapper
        padding: 0 18px
        .rating-item
          display: flex
          padding: 18px 0
          border-1px(rgba(7, 17, 27, 0.2))
          .avatar
            flex: 0 0 28px
            width: 28px
            height: 28px
            border-radius: 50%
            overflow: hidden
          .content
            margin-left: 12px
            .header
              width: 100%
              .name
                display: inline-block
                font-size 10px
                color: rgb(7, 17, 27)
                line-height: 12px
                font-weight: 700
            .star-wrapper
              margin-top: 4px
              font-size: 0
              font-weight: 200
              line-height: 12px
              .star
                display: inline-block
                font-size: 10px
              .deliveryTime
                margin-left: 10px
                font-size: 10px
                color: rgb(147, 153, 159)
            .text
              margin-top: 6px
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px
            .recommend
              margin-top: 8px
              font-size: 0
              .icon-thumb_down, .icon-thumb_up
                margin-bottom: 2px
                font-size: 12px
                line-height: 16px
                color: rgb(0, 160, 220)
              .icon-thumb_down
                color: rgb(183, 187, 191)
              .recommend-item
                display: inline-block
                margin: 0 0 2px 8px
                padding: 0 6px
                font-size: 10px
                color: rgb(147, 153, 159)
                line-height: 16px
                border: 1px rgba(7, 17, 27, 0.1) solid
                border-radius: 2px
            .time
              position: absolute              
              top: 18px
              right: 0
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)


</style>
