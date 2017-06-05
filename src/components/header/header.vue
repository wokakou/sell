<template>
  <div id="header">
    <div class="content-wrap">
    	<div class="avatar">
    		<img width="64" height="64" :src="seller.avatar"/>
    	</div>
    	<div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div> 
    		
        
        <div class="description">
    	    {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
      	<div class="support" v-if="seller.supports">
    	    <span class="icon" :class = "classMap[seller.supports[0].type]"></span>
    		  <span class="text">
            {{seller.supports[0].description}}
          </span>

     		</div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="detailShow">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>   
    <div class="bulletin" @click="detailShow">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text" >
        {{seller.bulletin}}
      </span>  
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar"/>
    </div>
  <transition name="fade">
    <div class="detail" v-if="show" >
      <div class="detail-wraper">
        <div class="detail-main">
          <div class="detail-title">
            <h1>{{seller.name}}</h1>
          </div>
          <div class="detail-rating">
            <star :size='48' :scores="seller.score"></star>
          </div>
          <div class="detial-title">
            <div class="line"></div>
            <h2 class="name">优惠信息</h2>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="detail-supports">
            <li class="supports-item" v-for="support in seller.supports">
              <span class="icon" :class="classMap[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </li>
          </ul>
          <div class="detial-bulletin-title">
            <div class="line"></div>
            <h2 class="name">商家公告</h2>
            <div class="line"></div>
          </div> 
          <div class="detail-bulletin">
            <p class="text">{{seller.bulletin}}</p>
          </div>         
        </div>
      </div>
      <div class="detail-close" @click="detailShow">
        <i class="icon-close"></i>
      </div>

    </div>
  </transition>
  </div>
</template>

<script>
import star from '../star/star.vue'
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    detailShow () {
      this.show = !this.show
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  #header
    position: relative
    background: rgba(7, 17, 27, 0.5)
    color: #fff
    .content-wrap
      position: relative
      padding: 24px 12px 18px 24px
      font-size:0
      .avatar
        display: inline-block
        img
          border-radius: 2px
          vertical-align: top
      .content
        vertical-align: top
        display: inline-block
        padding:2px 0 2px 16px
        .title
          .brand
            display: inline-block
            bg-image('brand')
            background-size: 32px 18px
            width: 32px
            height: 18px
            vertical-align: top
          .name
            margin-left: 6px
            font-size: 16px
            font-weight:bold
            line-height: 18px
        .description
          font-size: 12px
          margin:8px 0 10px 0
          line-height: 12px
        .support       
          .icon
            display: inline-block
            background-size: 12px 12px
            width: 12px
            height: 12px
            vertical-align:top
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            margin-left: 4px
            line-height: 12px
            vertical-align: top
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 16px
        height: 12px
        padding: 6px 8px
        background: rgba(0, 0, 0, 0.2)
        border-radius: 12px
        text-align: center
        line-height: 12px
        .count
          font-size: 10px
          padding-left: 2px
        .icon-keyboard_arrow_right
          margin-left: 2px
          vertical-align: top
          font-size: 10px
    .bulletin
      position: relative
      height:28px
      padding:0 22px 0 12px 
      line-height: 28px
      background: rgba(7, 17, 27, 0.2) 
      line-height: 28px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      .bulletin-icon
        display: inline-block
        margin-top: 8px
        bg-image('bulletin')
        background-size: 22px 12px
        width: 22px
        height: 12px
        vertical-align: top
      .bulletin-text
        font-size: 10px
        line-height: 28px
        margin-left: 0 4px
        vertical-align: top
      .icon-keyboard_arrow_right
        position: absolute
        top: 8px
        right: 12px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1

      img
        width: 100%
        height: 100%
        filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.8)
      overflow: auto
      backdrop-filter: blur(10px)
      .detail-wraper
        min-height: 100%
        .detail-main
          line-height: 12px
          padding: 64px 36px
          .detail-title
            text-align: center
            h1
              font-size: 16px
              font-weight: 700
              line-height: 16px
          .detail-rating
              margin-top: 16px
              height: 24px
              line-height: 24px
              text-align: center
          .detial-title
            margin-top: 28px
            display: flex
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .name
              padding: 0 12px
              font-size:14px
              font-weight: 700
          .detail-supports
            margin-top: 24px
            .supports-item
              margin-bottom: 12px
              line-height: 12px
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                margin-left: 12px
                width: 16px
                height: 16px
                background-size: 16px 16px
                background-repeat: no-repeat
                vertical-align: top
                &.decrease
                  bg-image('decrease_1')
                &.discount
                  bg-image('discount_1')
                &.guarantee
                  bg-image('guarantee_1')
                &.invoice
                  bg-image('invoice_1')
                &.special
                  bg-image('special_1')
              .text
                margin-left: 6px
                font-size: 12px
                line-height: 12px
          .detial-bulletin-title
            margin-top: 28px
            display: flex
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .name
              padding: 0 12px
              font-size:14px
              font-weight: 700
          .detail-bulletin
            margin-top: 24px
            padding: 0 12px
            .text
              font-size: 12px
              line-height: 24px
      .detail-close
        margin-top: -64px
        font-size: 32px
        color: rgba(255, 255, 255, 0.5)
        text-align: center
//过渡效果
  .fade-enter-active, .fade-leave-active
    transition: all .8s
  .fade-enter, .fade-leave-active
    opacity: 0

</style>            
