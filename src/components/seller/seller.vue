<template>
  <div class="seller" ref="seller">
  	<div class="seller-content">
  		<div class="overview">
  			<div class="overview-top border-1px">
  				<h1 class="name">{{seller.name}}</h1>
  				<div class="star-wrapper">
  					<star class="star" :size="36" :scores="seller.score"></star>
  					<div class="sellCount">月售{{seller.sellCount}}单</div>
  				</div>
  				<div class="favorite-wrapper">
  				    <div class="unfavorite" v-if="!favorite">
  				    	<div class="icon-favorite" @click="toggelFav"></div>收藏
  				    </div>
  					<div class="favorite" v-else>
  						<div class="icon-favorite" @click="toggelFav"></div>已收藏
  					</div>
  				</div>
  			</div>
  			<div class="overview-bottom">
  				<div class="minPrice">
	  				<div class="title">起送价</div>
	  				<div class="data">
	  					<span class="num">
	  						{{seller.minPrice}}
	  					</span>
	  					元
	  				</div>
  				</div>
  				<div class="deliveryPrice">
	  				<div class="title">商家配送</div>
	  				<div class="data">
	  					<span class="num">
	  						{{seller.deliveryPrice}}
	  					</span>
	  					元
	  				</div>
  				</div>
  				<div class="deliveryTime">
	  				<div class="title">平均配送时间</div>
	  				<div class="data">
	  					<span class="num">
	  						{{seller.deliveryTime}}
	  					</span>
	  					分钟
	  				</div>
  				</div>
  			</div>
  		</div>
  		<split></split>
  		<div class="bulletin">
  			<h1 class="title">公告与活动</h1>	
  			<div class="content">{{seller.bulletin}}</div>
  			<div class="supports">
  				<ul>
  					<li class="support-item border-1px-top" v-for="item in seller.supports">
  						
  						<div class="desc">
  							<span class="icon" :class="classMap[item.type]"></span>
  							{{item.description}}
  						</div>
  					</li>
  				</ul>
  			</div>
  		</div>
  		<split></split>
  		<div class="pics-wrapper" >
  			<h1 class="title">商家实景</h1>
  			<div class="container" ref="container">
  				<div class="pics-list" ref="picsList">
		  			<div class="pics" v-for="item in seller.pics">
		  				<img :src="item" width="120px" height="90px" />
		  			</div>
	  			</div>
  			</div>
  		</div>
  		<split></split>
  		<div class="info">
  			<h1 class="title">商家信息</h1>
  			<ul>
  				<li class="info-item border-1px-top" v-for="item in seller.infos">
  					<div class="text">{{item}}</div>
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
export default {
  data () {
    return {
      favorite: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    toggelFav () {
      this.favorite = !this.favorite
    },
    _initPicsScroll () {
      let width = 120
      let margin = 6
      this.$refs.picsList.style.width = (width + margin) * this.seller.pics.length - margin + 'px'
      this.picsScroll = new BScroll(this.$refs.container, {
        scrollX: true,
        eventPassThrouth: 'vertical'
      })
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$nextTick(() => {
      this.sellerScroll = new BScroll(this.$refs.seller, {
        click: true
      })
      this._initPicsScroll()
    })
  },
  components: {
    split,
    star
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .seller
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .seller-content
      .overview
        padding: 0 18px
        .overview-top
          padding: 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 14px
          .star-wrapper
            margin-top: 8px
            .star
              display: inline-block
            .sellCount
              display: inline-block
              font-size: 10px
              color: rgb(77, 85, 93)
              line-height: 18px
          .favorite-wrapper
            position: absolute
            top: 18px
            right: 0
            width: 40px
            font-size: 10px
            line-height: 10px
            color: rgb(77, 85, 93)
            text-align: center
            .unfavorite
              .icon-favorite
                margin-bottom: 4px
                font-size: 24px
                line-height: 24px
                color: rgb(147, 153, 159)
            .favorite
              .icon-favorite
                margin-bottom: 4px
                font-size: 24px
                line-height: 24px
                color: rgb(240, 20, 20) 
        .overview-bottom
          padding: 18px 0
          display: flex
          .minPrice, .deliveryPrice
            border-right: 1px solid rgba(7, 17, 27, 0.1)
          .minPrice, .deliveryPrice, .deliveryTime
            flex: 1
            text-align: center
            .title
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
              margin-bottom: 4px
            .data
              font-size: 10px
              .num
                font-size: 24px
                line-height: 24px
                color: rgb(7, 17, 27)
      .bulletin
        padding: 18px 18px 2px 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .content
          margin: 8px 12px  16px 12px
          font-size: 12px
          line-height 24px
          color: rgb(240, 20, 20)
        .supports
          .support-item
            padding: 16px 12px
            font-size: 12px
            line-height: 16px
            color: rgb(7, 17, 27)
            border-1px-top: rgba(7, 17, 27, 0.1)
            .desc
              height: 12px
              line-height: 12px
              .icon           
                display: inline-block
                background-size :12px 12px
                background-repeat: no-repeat
                width:12px
                height:12px
                font-size: 12px
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
      .pics-wrapper
        padding: 18px        
        .title
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 14px  
            margin-bottom: 12px            
        .container
          overflow: hidden
          .pics-list
          	.pics
          	  display: inline-block
         	   height: 90px
         	   width: 120px
          	  margin-right: 6px
          	  &:last-child
         	     margin-right: 0
      .info
        padding: 18px 18px 0 18px
        .title
          margin-bottom: 12px
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .info-item
          padding: 16px 12px
          font-size: 12px
          line-height: 16px
          color: rgb(7, 17, 27)
          border-1px-top: rgba(7, 17, 27, 0.1)








</style>
