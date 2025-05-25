# 打造一个舒服的工作环境

写这篇文章的目的是记录Mac 工作环境的配置过程。

## 优化系统设置

### 让 Launchpad 显示更多图标

根据屏幕尺寸设置行数和列数，13寸适合`10列 x 7行`，15寸以上可以尝试`12 列x 8行`

```bash
defaults write com.apple.dock springboard-columns -int 10;
defaults write com.apple.dock springboard-rows -int 7；
killall Dock;
```

> 恢复原来的图标排列
> ```bash
> defaults delete com.apple.dock springboard-columns
> defaults delete com.apple.dock springboard-rows
> defaults write com.apple.dock ResetLaunchPad -bool TRUE;
> killall Dock;
> ```

### 禁止在网络驱动器中生成 .DS_Store 文件的方法

Apple 并不支持关闭本地硬盘生成 `.DS_Store`文件，但可以防止 `.DS_Store` 文件出现在 **网络驱动器（如 SMB/NFS）** 中

```bash 
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE;
killall Finder
```

>  恢复`.DS_store`生成
> ```bash
> defaults delete com.apple.desktopservices DSDontWriteNetworkStores;
> ```

清理整个用户目录下的`.DS_Store`

```bash
sudo find ~ -name .DS_Store -delete
```

### 开启快速拖动窗口

```
defaults write -g NSWindowShouldDragOnGesture -bool true
```

按住`control + command`，按住鼠标或触摸板，即可拖。

>  关闭快速拖动窗口
>
> ```bash
> defaults delete -g NSWindowShouldDragOnGesture
> ```

开启或关闭，均需要重启电脑

### [OnMyZsh](https://github.com/ohmyzsh/ohmyzsh)

官方提供的安装脚本已不能使用，会报 `443: Connection refused`  错误，使用下面的命令进行安装

```bash
# 克隆 ohmyzsh 仓库
git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh
# 可选，备份 zsh 配置文件
cp ~/.zshrc ~/.zshrc.orig
# 创建新的 zsh 配置文件
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
# 将 zsh 设置默认shell程序
chsh -s $(which zsh)	
```

禁止自动更新

```bash
echo "DISABLE_UPDATE_PROMPT=true" >> ~/.zhrc
echo "DISABLE_AUTO_UPDATE=true" >> ~/.zhrc
```

相关命令

```bash
# 更新
omz update
# 卸载
uninstall_oh_my_zsh
```

安装插件，参考[文章](https://www.zrahh.com/archives/167.html)

**[Autojump](https://github.com/wting/autojump)**

终端中一键直达目录, 命令行中切换目录是最常用的操作, 只要正常 cd 过目录, 下次只要记住目录名字, 就可以直接进去, 支持模糊匹配, 用过一次, 无法离开。

```bash
brew install autojump
```

> `brew`需要安装 Homebrew 后使用。

使用 `vim .zshrc` 打开 `.zshrc` ，修改` plugins=(git)`，修改后如下：

```bash
# 修改之前是 plugins=(zsh-autosuggestions git)
plugins=(zsh-autosuggestions git autojump)
# 新加一行
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
```

**[Zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)**

终端历史操作记录自动补全

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# 立即生效
source ~/.zshrc
```

### Homebrew

文章参考

- [mac下国内安装Homebrew教程](https://www.cnblogs.com/xibushijie/p/13335988.html)
- [Mac 小记 — iTerm2、Zsh、Homebrew](https://www.cnblogs.com/youclk/p/8125305.html)

```bash
# 安装Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 阿里云镜像源，解决软件下载速度慢的问题
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

# 清华大学镜像源
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

# 卸载Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)“

# 还原官方镜像源
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

禁止HomeBrew自动更新，手动更新执行 ` brew  update`

```
echo "export HOMEBREW_NO_AUTO_UPDATE=1" >> ~/.zshrc
source ~/.zshrc
```

有了 Homebrew 后面安装就简单多了，这里汇总一下我使用`brew`命令安装的程序

```bash
# 命令行终端
brew install --cask iterm2
# 文本编辑工具
brew install --cask sublime-text
# MarkDown写作
brew install --cask typora
# 窗口管理
brew install --cask shiftit
# 微信
brew install --cask wechat
# 视频
brew install --cask iina
# 思维导图
brew install --cask xmind-zen
```

## Brew 快捷安装常用工具

笔者在用的软件

```
brew install --cask vmware-fusion # 免费的虚拟机软件，支持ARM系统
brew install --cask dbeaver-community # 通用的数据库客户端工具

brew install tomcat@9
brew install openjdk@8
brew install maven

# 版本管理
brew install git
# 项目管理工具
brew install maven
# Java运行环境
brew install java11
# API测试工具
brew install --cask postman
# 虚拟容器
brew install --cask docker
# 集成开发工具
brew install --cask intellij-idea
# UML工具
brew install --cask staruml
```

其他软件

* lemon 

- OhMyZsh
- Typora
- Sublime Text 3
- Alfred 4 - workflow 强烈推荐 [zenorocha/alfred-workflows · GitHub](https://link.zhihu.com/?target=https%3A//github.com/zenorocha/alfred-workflows)
- Xmind
- Spark
- Qspace 多窗口文件管理器
- DingTalk
- IINA
- snippets lab 代码片段工具
- screenbrush 屏幕画布

### [Sublime Text](http://www.sublimetext.cn/) 

一款用于代码、标记和散文的精致文本编辑器

#### 插件

- [Package Control](http://packagecontrol.cn/installation) - 插件管理器，按下`Ctrl+Shift+P` > `Install Package  `来查找、安装其他插件。
- [Emmet](http://emmet.io/)  -  高效地编写HTML和CSS插件。
- [Trailing Spaces](https://github.com/SublimeText/TrailingSpaces) - 高亮尾部的空格，并在瞬间将其删除。

#### 取消检查更新

`Preferences > Settings`在`Preferences.sublime-settings - User`文件添加`"update_check": false`

## 安装开发工具

使用 `Homebrew` 安装Docker



CentOS 使用[国内镜像](<https://blog.csdn.net/weixin_42430824/article/details/81019039>)下载速度较快，点击这里下载[阿里云CentOS镜像](<https://blog.csdn.net/weixin_42430824/article/details/81019039>)

#### 配置yum源

```
yum install -y wget
cd /etc/yum.repos.d/
mv CentOS-Base.repo CentOS-Base.repo.back
wget -O CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

yum clean all
yum makecache
yum update
```



#### Idea 安装插件

- Lombox

- FindBugs-IDEA

- **Mybatis Log Plugin** 

  MyBatis Log Plugin 这款插件是直接将Mybatis执行的sql脚本显示出来，无需处理，可以直接复制出来执行的 。`Tools -- >  Mybatis Log Plugin` 打开其日志框，注意其转换的SQL不是输出到IDE的控制台!!!

  

清理不常用的插件：

- Android 
- Smali Support
- Subversion 已有Git
- GitHub Git足已，没必要绑定GitHub账号
- GlassFish 一种 Servlet 容器
- Jetty 一种 Servlet 容器
- WebLogic 
- WebSphere
- WildFly

JavaScript 框架与工具

- Angular and AngularJS
- CoffeeScript

JVM Frameworks

- Drools
- Grails
- JavaEE: Java Server Faces

Redis deskstop manager  编译

https://blog.csdn.net/zhangatle/article/details/101671697



## 工具配置



前端开发

```
brew install yarn
```

## 参考资料

- [Iterm2](https://github.com/macdao/ocds-guide-to-setting-up-mac#iterm2)
- [Mac 小记 — iTerm2、Zsh、Homebrew](https://www.cnblogs.com/youclk/p/8125305.html)
- [MAC下使用iTerm2和zsh](https://blog.csdn.net/u014102846/article/details/77964493)
- [终端配色](<https://sspai.com/post/53008>)

[5分钟上手Mac效率神器Alfred以及Alfred常用操作](https://www.jianshu.com/p/e9f3352c785f)

[一些口碑甚好的Mac Apps使用感受](<https://www.jianshu.com/p/2f8fb07101c1>)

[强迫症的 Mac 设置指南](https://github.com/macdao/ocds-guide-to-setting-up-mac)

