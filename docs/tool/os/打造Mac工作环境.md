# 打造 Mac 工作环境

写这篇文章的目的是记录Mac 工作环境的配置过程。

## 优化系统

### 配置 Launchpad

原生的配置让 Launchpad 稍许拥挤, 将 Launchpad应用排列方式改为8列7行。

```bash
defaults write com.apple.dock springboard-columns -int 8; 
defaults write com.apple.dock springboard-rows -int 7; 
defaults write com.apple.dock ResetLaunchPad -bool TRUE;
killall Dock;
```

### 禁止生成 .DS_Store 文件的方法

禁止生成并删除 `.DS_Store` 文件

```bash 
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE;
sudo find . -name ".DS_Store" -depth -exec rm -f {};
```

恢复`.DS_store`生成

```bash
defaults delete com.apple.desktopservices DSDontWriteNetworkStores;
```



### 开启快速拖动窗口

在 Terminal 中执行命令

```
# 开启
defaults write -g NSWindowShouldDragOnGesture -bool true
# 关闭
defaults delete -g NSWindowShouldDragOnGesture
```

然后，按住`control + command`，按住鼠标或触摸板，即可拖。

PS：开启或关闭，均需要重启电脑

## 安装工具软件

这里列举一下日常篇包含的软件：

- OhMyZsh
- Homebrew
- iTerm2
- Typora
- Sublime Text 3
- Alfred 4
- CleanMyMac 4
- Shiftit
- HazeOver
- Xmind
- Spark
- Qspace
- FreeDownloadManager
- WeChat
- DingTalk
- IINA
- [Loop](https://github.com/MrKai77/Loop) 开源免费的Mac窗口管理软件

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

### Alfred

workflow 强烈推荐 [zenorocha/alfred-workflows · GitHub](https://link.zhihu.com/?target=https%3A//github.com/zenorocha/alfred-workflows)



### [Sublime Text](http://www.sublimetext.cn/) 
一款用于代码、标记和散文的精致文本编辑器

#### 插件

- [Package Control](http://packagecontrol.cn/installation) - 插件管理器，按下`Ctrl+Shift+P` > `Install Package  `来查找、安装其他插件。
- [Emmet](http://emmet.io/)  -  高效地编写HTML和CSS插件。
- [Trailing Spaces](https://github.com/SublimeText/TrailingSpaces) - 高亮尾部的空格，并在瞬间将其删除。

#### 取消检查更新

`Preferences > Settings`在`Preferences.sublime-settings - User`文件添加`"update_check": false`

## 安装开发软件

使用 `Homebrew` 安装

```
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

##### 使用[gdub](https://github.com/dougborg/gdub)简化gradlew调用

```bash
brew install gdub
echo "alias gradle=gw" >> ~/.zshrc
source ~/.zshrc
```


### Virtualbox

#### 安装

```
brew install virtualbox
```

### CentOS

#### 下载镜像

使用[国内镜像](<https://blog.csdn.net/weixin_42430824/article/details/81019039>)下载速度较快，点击这里下载[阿里云CentOS镜像](<https://blog.csdn.net/weixin_42430824/article/details/81019039>)

#### 安装

如果安装镜像，可参考： [在VirtualBox中安装CentOS7详解(Mac版)](<https://blog.csdn.net/ytangdigl/article/details/79736562>)

#### 后台运行虚拟机

```bash
vboxmanage startvm centos --type headless
```

[参考](<https://www.jianshu.com/p/a4c9ec791948>)

#### 配置端口转发，以便使用Mac终端直接访问虚拟机

1. 使用`ip addr`查看网卡，这里是`enp0s3`。

2. 编辑`vi /etc/sysconfig/network-scripts/ifcfg-enp0s3`，修改`ONBOOT=YES`

3. 在虚拟机`Settings - Network - Advanced - Port Forwarding` 设置端口转发:

   `name=ssh, Protocol=TCP, HostPort=22, GuestPort=22`

4. 在Mac终端，使用 `ssh` 登录虚拟机：

   ```bash
   ssh username@localhost
   ```

5. 消除警告信息`-bash:warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory`

   修改`/etc/locale.conf` 为以下内容：

   ```
   LC_ALL=en_US.utf8
   LC_CTYPE=en_US.utf8
   LANG=en_US.utf8
   ```

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

### 常用APP

```bash
# 常用
brew install wechat
# 窗口管理工具
brew install shiftit 
brew install free-download-manager 

# 接口测试工具
brew install postman
# Markdown文档编辑
brew install typora
# UML工具
brew install staruml
# 开发工具
brew install intellij-idea
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





前端开发

```
brew install yarn

```

#### 参考资料

- [Iterm2](https://github.com/macdao/ocds-guide-to-setting-up-mac#iterm2)
- [Mac 小记 — iTerm2、Zsh、Homebrew](https://www.cnblogs.com/youclk/p/8125305.html)
- [MAC下使用iTerm2和zsh](https://blog.csdn.net/u014102846/article/details/77964493)
- [终端配色](<https://sspai.com/post/53008>)

[5分钟上手Mac效率神器Alfred以及Alfred常用操作](https://www.jianshu.com/p/e9f3352c785f)

[一些口碑甚好的Mac Apps使用感受](<https://www.jianshu.com/p/2f8fb07101c1>)

[强迫症的 Mac 设置指南](https://github.com/macdao/ocds-guide-to-setting-up-mac)

