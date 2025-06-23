import { MarkdownOptions } from 'vitepress'
// 插件：PlantUML 图表
import markdownItTextualUml from "markdown-it-textual-uml"
// 插件：Mermaid流程图
import { MermaidMarkdown } from 'vitepress-plugin-mermaid';

export default <MarkdownOptions>{
    config(md){
      // Mermaid 语法插件
      md.use(MermaidMarkdown)

      // PlantUML 语法插件
      md.use(markdownItTextualUml);
    },
    theme: {
      light: 'vitesse-light',
      dark:'vitesse-dark'
    },
    // 行号显示
    lineNumbers: true,
    // 开启图片懒加载
    image: {
      lazyLoading: true
    },
  }