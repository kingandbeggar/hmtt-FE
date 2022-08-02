import Vue from 'vue'
const fofo = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else if (el.querySelector('input')) {
          el.querySelector('input').focus()
        } else if (el.querySelector('textarea')) {
          el.querySelector('textarea').focus()
        }
      },
      update (el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else if (el.querySelector('input')) {
          el.querySelector('input').focus()
        } else if (el.querySelector('textarea')) {
          el.querySelector('textarea').focus()
        }
      }
    })
  }
}
Vue.use(fofo)

// 懒加载
const layload = {
  install (Vue) {
    Vue.directive('layload', {
      inserted (el, binding) {
        const io = new IntersectionObserver((entries) => {
          console.log(entries)
          if (entries.isIntersecting) {
            el.src = binding.value
            // 图片加载后即停止监听该元素
            io.unobserve(el)
            el.onerror = () => {
              // 加载失败 设置默认图
              el.src = 'https://img2.baidu.com/it/u=1928736049,3128591086&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659546000&t=a51192e2584d077fa7e9f219d51f09fd'
            }
          }
        })
        io.observe(el)
      }
    })
  }
}
Vue.use(layload)
