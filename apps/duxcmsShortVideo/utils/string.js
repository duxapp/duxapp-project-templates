export const getTopic = (string = '', space = '#') => {
  let startIndex = 0
  let topic = false
  const texts = []
  for (let i = 0; i < string.length; i++) {
    const t = string[i]
    if (t === space) {
      if (startIndex !== i) {
        texts.push({ text: string.substring(startIndex, i) })
      }
      startIndex = i
      topic = true
    } else if (t === ' ') {
      if (topic) {
        // 结束话题
        texts.push({ topic, text: string.substring(startIndex, i) })
        startIndex = i
      }
      topic = false
    } else if (i === string.length - 1) {
      texts.push({ topic, text: string.substring(startIndex, i + 1) })
    }
  }
  return texts
}
