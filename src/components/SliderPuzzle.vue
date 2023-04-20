<template>
    <div class="slider-puzzle">
      <div
        class="slider-puzzle__bg"
        :style="{ backgroundImage: `url(${bgImage})` }"
        ref="bgImage"
      />
      <div
        class="slider-puzzle__slider"
        :style="{ backgroundImage: `url(${sliderImage})`, left: sliderLeft + 'px' }"
        ref="slider"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      bgImage: String,
      sliderImage: String,
      blockSize: {
        type: Number,
        default: 40
      },
      successDistance: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        sliderLeft: 0,
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0,
        dataTransfer: null,
        puzzleWidth: 0,
        puzzleHeight: 0
      }
    },
    computed: {
      puzzleRect() {
        // 计算出拼图的尺寸和位置
        const { left, top } = this.$refs.bgImage.getBoundingClientRect()
        const width = this.$refs.bgImage.offsetWidth
        const height = this.$refs.bgImage.offsetHeight
        return {
          left,
          top,
          right: left + width,
          bottom: top + height,
          width,
          height
        }
      }
    },
    methods: {
      handleMouseDown(event) {
        // 开始拖动时记录下起始位置，并设置 dataTransfer 对象
        this.isDragging = true
        this.dragStartX = event.pageX || event.touches[0].pageX
        this.dragStartY = event.pageY || event.touches[0].pageY
        this.dataTransfer = event.dataTransfer
        const sliderRect = this.$refs.slider.getBoundingClientRect()
        const offsetX = this.dragStartX - sliderRect.left
        const offsetY = this.dragStartY - sliderRect.top
        const image = new Image()
        image.src = this.sliderImage
        this.dataTransfer.setDragImage(image, offsetX, offsetY)
      },
      handleMouseMove(event) {
        // 在拖动过程中更新滑块位置
        if (this.isDragging) {
          const deltaX = (event.pageX || event.touches[0].pageX) - this.dragStartX
          this.sliderLeft = Math.max(0, Math.min(deltaX, this.puzzleWidth - this.blockSize))
        }
      },
      handleMouseUp(event) {
        // 拖动结束时判断是否拼接成功
        if (this.isDragging) {
          const deltaX = (event.pageX || event.changedTouches[0].pageX) - this.dragStartX
          if (deltaX > this.puzzleRect.width - this.blockSize - this.successDistance) {
            this.$emit('success')
          } else {
            this.sliderLeft = 0
            this.isDragging = false
    }
  }
},
handleTouchStart(event) {
  // 开始触摸时记录下起始位置，并设置 dataTransfer 对象
  this.isDragging = true
  const touch = event.touches[0]
  this.dragStartX = touch.pageX
  this.dragStartY = touch.pageY
  this.dataTransfer = event.dataTransfer
  const sliderRect = this.$refs.slider.getBoundingClientRect()
  const offsetX = this.dragStartX - sliderRect.left
  const offsetY = this.dragStartY - sliderRect.top
  const image = new Image()
  image.src = this.sliderImage
  this.dataTransfer.setDragImage(image, offsetX, offsetY)
},
handleTouchMove(event) {
  // 在触摸过程中更新滑块位置
  if (this.isDragging) {
    const touch = event.touches[0]
    const deltaX = touch.pageX - this.dragStartX
    this.sliderLeft = Math.max(0, Math.min(deltaX, this.puzzleWidth - this.blockSize))
  }
},
handleTouchEnd(event) {
  // 触摸结束时判断是否拼接成功
  if (this.isDragging) {
    const touch = event.changedTouches[0]
    const deltaX = touch.pageX - this.dragStartX
    if (deltaX > this.puzzleRect.width - this.blockSize - this.successDistance) {
      this.$emit('success')
    } else {
      this.sliderLeft = 0
      this.isDragging = false
    }
  }
}

},
mounted() {
// 在组件挂载后获取拼图的尺寸信息
this.puzzleWidth = this.puzzleRect.width
this.puzzleHeight = this.puzzleRect.height
}
}
</script>

<style>
.slider-puzzle {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slider-puzzle__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.slider-puzzle__slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center;
  cursor: grab;
  user-select: none;
  touch-action: none;
}
</style>
