import "katex/dist/katex.min.css"

const katex = require("katex")

const KatexPlugin = (md: any) => {
  const inline_code = md.renderer.rules.code_inline.bind(md.renderer.rules)
  const block_code = md.renderer.rules.fence.bind(md.renderer.rules)

  // 行内公式
  md.renderer.rules.code_inline = (tokens: any, index: number, options: any, env: any, slf: any) => {
    let code = tokens[index].content as string

    if (code.startsWith("$") && code.endsWith("$")) {
      code = code.replace(/^(\s|\$)+|(\s|\$)+$/g, "")
      try {
        return katex.renderToString(code)
      } catch (error) {
        return `<code>${error}</code>`
      }
    }

    return inline_code(tokens, index, options, env, slf)
  }

  // 块级公式
  md.renderer.rules.fence = (tokens: any, index: number, options: any, env: any, slf: any) => {
    const token = tokens[index]
    const code = (token.content as string).trim()

    if (token.info === "math" || token.info === "katex" || token.info === "latex") {
      try {
        return `<pre class="math-block">${katex.renderToString(code)}</pre>`
      } catch (error) {
        return `<pre>${error}</pre>`
      }
    }

    return block_code(tokens, index, options, env, slf)
  }
}

export default KatexPlugin
