import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

// 定义文章数据接口
interface ArticleData {
  isOriginal: boolean;
  author: string;
  authorLink: string;
  title?: string;
  url: string;
  tags?: string[];
  description?: string;
  date: string;
  [key: string]: any; // 允许其他 frontmatter 属性
}

// 排除的文件列表
const excludedFiles: string[] = ['index.md', 'tags.md', 'archives.md', 'me.md'];

export default {
  // 监听的文件路径
  watch: ['../../../docs/**/*.md'],
  
  /**
   * 加载文章数据
   * @param watchedFiles 监听的文件列表
   * @returns 文章数据数组
   */
  load(watchedFiles: string[]): ArticleData[] {
    // 排除不必要文件
    const articleFiles = watchedFiles.filter(file => {
      const filename = path.basename(file);
      return !excludedFiles.includes(filename);
    });
    
    
    // 解析文章 Frontmatter
    const articles: ArticleData[] = []
    articleFiles.forEach(articleFile => {
      const articleContent = fs.readFileSync(articleFile, 'utf-8');
      const {data} = matter(articleContent,{excerpt:true});
    
      // 构建文章数据对象
      articles.push({
        isOriginal: data.isOriginal ?? true,
        title: data.title || path.basename(articleFile).replace(/\.md$/, ''),
        // 提取文章路径，移除 /docs/ 前缀和 .md 后缀
        url: articleFile.substring(articleFile.lastIndexOf('/docs/') + 6).replace(/\.md$/, ''),
        date: data.date ? dayjs(data.date).format('YYYY-MM-DD HH:mm') : '',
        tags: data.tags,
        description: data.description,
      } as ArticleData);
    });

    articles.sort((a, b) => b.date.localeCompare(a.date));
    // 按文章发布时间倒序
    return articles;
  }
};