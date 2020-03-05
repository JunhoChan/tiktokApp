const LovaAnimation = {
  /**
   * 设置爱心特效样式
   * set love style
   */
  initLoveAnimation() {
    this.setCss(
      '@keyframes loveScale{0%{transform:scale(1);opacity:1}25%{transform:scale(.8);opacity:.5}50%{transform:scale(.5);opacity:.8}75%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}.junho-love_animation-icon{width:160px;height:100%;animation:loveScale 2s infinite linear;opacity:0;position:fixed;z-index:100}'
    )
  },
  /**
   * 设置样式并将样式插入body
   * Set style and insert style into body
   * @param {String} css
   */
  setCss(css) {
    if (document.getElementById('junho-love')) return true
    let style = document.createElement('style')
    style.type = 'text/css'
    style.id = 'junho-love'
    try {
      style.appendChild(document.createTextNode(css))
    } catch (ex) {
      style.styleSheet.cssText = css
    }
    document.getElementsByTagName('head')[0].appendChild(style)
  },

  /**
   * Create love icon
   * create love icon
   */
  createHeart(ev) {
    ev = ev || window.event
    let element = document.createElement('div')
    element.className = 'junho-love_animation-icon'
    const currentP = this.handleCriticalBorder(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
    element.style.top = currentP.y + 'px'
    element.style.left = currentP.x + 'px'
    console.log(currentP)
    const svgElement = this.createSvgElement(
      '<svg t="1582642063119" class="icon" viewBox="0 0 1184 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3997" width="128" height="128"><path d="M591.998613 136.799679C527.534764 70.447835 423.391008 0 329.983227 0 139.231674 0 0 156.511633 0 348.847182c0 114.079733 56.575867 194.991543 97.343772 254.671404 121.039716 176.415587 424.927004 393.951077 438.078973 401.919058C552.542705 1017.341616 572.270659 1023.9976 591.998613 1023.9976a93.423781 93.423781 0 0 0 56.575867-18.559956c13.151969-9.279978 315.72726-226.831468 438.078973-401.919058C1127.421358 543.838725 1183.997225 462.926915 1183.997225 348.847182 1183.997225 156.527633 1044.765551 0 854.013998 0 760.606217 0 656.462461 69.135838 591.998613 136.799679z" fill="#E1442E" p-id="3998"></path></svg>'
    )
    element.appendChild(svgElement)
    document.body.appendChild(element)
    setTimeout(() => {
      this.removeOldLoveElement()
    }, 2000)
  },

  /**
   * 边缘临界显示爱心
   * Edge shows love
   * @param {number} currentX 100 < out - 100
   * @param {number} clientY 100 < out - 200
   */
  handleCriticalBorder(currentX, clientY) {
    let position = { x: currentX, y: clientY }
    if (window.innerWidth - 100 >= currentX || currentX >= 100) {
      position.x = currentX
    } else if (window.innerWidth - 100 < currentX) {
      position.x = window.innerWidth
    } else {
      position.x = 100
    }
    return position
  },

  /**
   * 动态加入svg
   * @param {string} svgString
   */
  createSvgElement(svgString) {
    const element = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svgString + '</svg>'
    const frag = document.createDocumentFragment()
    while (element.firstChild.firstChild) frag.appendChild(element.firstChild.firstChild)
    return frag
  },

  /**
   * 删除旧的爱心dom点
   * Delete love DOM points
   */
  removeOldLoveElement() {
    const loveNode = document.querySelector('.junho-love_animation-icon')
    if (loveNode) {
      let childNode = loveNode.querySelector('svg')
      if (childNode) loveNode.removeChild(childNode)
      document.body.removeChild(loveNode)
    }
  }
}

export default LovaAnimation
