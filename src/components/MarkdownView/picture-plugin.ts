const protocols = [
  "http:",
  "https:",
  "/"
]

function check (src: string): boolean {
  if (src.trim().length === 0) {
    return false
  }

  for (let i = 0; i < protocols.length; i++) {
    if (src.startsWith(protocols[i])) {
      return false
    }
  }

  return true
}

/**
 * 将相对路径图片转换为绝对路径
 */
const PicturePlugin = (md: any) => {
  const img = md.renderer.rules.image.bind(md.renderer.rules)

  md.renderer.rules.image = (tokens: any, index: number, options: any, env: any, slf: any) => {
    const token = tokens[index]

    for (let i = 0; i < token.attrs.length; i++) {
      if (token.attrs[i][0] === "src") {
        const src = token.attrs[i][1] as string

        if (!check(src)) {
          break
        }

        if (src.startsWith("./")) {
          token.attrs[i][1] = src.replace(".", window.currentDir)
        } else {
          token.attrs[i][1] = `${window.currentDir}/${src}`
        }
      }
    }

    tokens[index] = token
    return img(tokens, index, options, env, slf)
  }
}

export default PicturePlugin
