## 1. 概述

本文章介绍了在Linux系统下安装 zsh 及配置过程。

## 2. 安装

### 2.1 安装zsh和git

1) 使用yum安装zsh和git

```shell
yum install -y git zsh
```

安装 autojump 插件时需要用到 git

2) 设置shell为zsh

```shell
chsh -s $(which zsh)
```

查看当前的shell有哪些：`cat /etc/shells`

检查当前shell：`echo $SHELL`

### 2.2 安装 oh my zsh

#### 自动安装

[https://github.com/robbyrussell/oh-my-zsh](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Frobbyrussell%2Foh-my-zsh)

```plain
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

#### 添加命令别名

在配置文件 `~/.zshrc` 中加入

```plain
# alias base
alias ll='ls -alGh'
alias la='ls -a'
alias l='ls -CF'
alias cls='clear'
```

执行`source ~/.zshrc`使之生效

### 2.3 安装 autojump

源码安装

```shell
git clone https://github.com/wting/autojump
cd autojump
./install.py
```

在配置文件 `~/.zshrc` 中加入

```shell
[[ -s /root/.autojump/etc/profile.d/autojump.sh ]] && source /root/.autojump/etc/profile.d/autojump.sh
autoload -U compinit && compinit -u
```

### 安装 zsh-autosuggestions

源码安装

```shell
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

在`~/.zshrc`中添加

```erlang
plugins=(git autojump zsh-autosuggestions)
```