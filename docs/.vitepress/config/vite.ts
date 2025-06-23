import { UserConfig } from 'vite'
// 插件：Mermaid流程图
import { MermaidPlugin } from 'vitepress-plugin-mermaid';

export default <UserConfig>{
  plugins: [MermaidPlugin()],
  optimizeDeps: {
    include: ['mermaid'],
  },
  ssr: {
    noExternal: ['mermaid'],
  },
}