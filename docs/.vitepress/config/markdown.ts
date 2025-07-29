import { MarkdownOptions } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3';
import footnote from 'markdown-it-footnote';
import markdownItTextualUml from "markdown-it-textual-uml"
import { MermaidMarkdown } from 'vitepress-plugin-mermaid';

export default <MarkdownOptions>{
    theme: {
      light: 'vitesse-light',
      dark:'vitesse-dark'
    },
    lineNumbers: true, // 行号显示
    image: {
      lazyLoading: true // 开启图片懒加载
    },
    config(md){
      md.use(mathjax3); // PlantUML 语法插件
      md.use(footnote); // 脚注插件
      md.use(MermaidMarkdown) // Mermaid 语法插件
      md.use(markdownItTextualUml); // PlantUML 语法插件

      // 在所有文档的<h1>标签后添加<ArticleMetadata/>组件
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        
        if (tokens[idx].tag === 'h1'){
          htmlResult += `\n<ClientOnly><ArticleMetadata v-if="($frontmatter?.metadata ?? true)" :article="$frontmatter" /></ClientOnly>`;
        }
        return htmlResult;
      }
    },
  }