# Mac 安装Podman

> [Podman](http://podman.io/) 是一个无守护进程（daemonless) 的开源 Linux 原生工具，旨在使用开放容器计划 （[OCI](https://www.opencontainers.org/), Open Container Initiative）容器（ [Containers](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.j2uq93kgxe0e)） 和 容器镜像（[Container Images ](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.dqlu6589ootw)）轻松查找、运行、构建、共享和部署应用程序。Podman 提供了一个命令行界面 （CLI），任何使用过 Docker 容器引擎（ [Container Engine](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.6yt1ex5wfo3l)） 的人都熟悉它。大多数用户可以简单地将 Docker 别名为 Podman（别名 docker=podman），而不会出现任何问题。与其他常见的容器引擎（[Container Engines](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.6yt1ex5wfo3l)）（Docker、CRI-O、containerd）类似，Podman 依赖于符合 OCI 的容器运行时（[Container Runtime](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.6yt1ex5wfo55)）（runc、crun、runv 等）来与操作系统交互并创建正在运行的容器。这使得 Podman 创建的正在运行的容器与任何其他常见容器引擎创建的容器几乎没有区别。

### 一、安装 podman

安装命令来自于[官方安装文档](https://podman.io/docs/installation)

```
# Mac 下安装
brew install podman
brew install podman-desktop
# Windows 下安装
winget install Podman
winget install Podman Desktop

podman machine init\ 
  -v $HOME/.config/containers/registries.conf:/var/home/core/.config/containers/registries.conf:ro
podman machine start
```

 `podman machine init` 命令在 Mac 和Windows 下被执行时，将安装一个用于模拟Linux运行环境的 [Fedora coreos](https://fedoraproject.org/coreos/) 虚拟机,  镜像大小约3GB。

挂载本机的镜像配置文件到虚拟机中，避免虚拟机重建后，镜像配置丢失。

网络原因国内无法访问官方源 docker.io,  需要配置为国内镜像源，这里建议使用 [1panel镜像源](https://1panel.cn/docs/user_manual/containers/setting/#1)

### 配置镜像源

进入 podman 默认虚拟机

```
podman machine ssh
```

执行 `vi $HOME/.config/containers/registries.conf`, 添加或编辑镜像配置文件，替换为如下内容：

```
unqualified-search-registries = ["docker.io"]

[[registry]]
prefix = "docker.io"
location = "docker.io"

[[registry.mirror]]
location = "docker.1panel.live"
```

检查镜像源配置是否生效

```
podman info | grep registries -A 25
```







### 资源占用

>  0容器，0镜像

先查看podman版本信息

```
$ podman version                   
Client:       Podman Engine
Version:      4.8.2
API Version:  4.8.2
Go Version:   go1.21.5
Git Commit:   aa546902fa1a927b3d770528565627d1395b19f3
Built:        Mon Dec 11 18:38:03 2023
OS/Arch:      darwin/arm64

Server:       Podman Engine
Version:      5.1.1
API Version:  5.1.1
Go Version:   go1.22.3
Built:        Tue Jun  4 08:00:00 2024
OS/Arch:      linux/arm64
```

podman 虚拟机信息

```
$ podman machine info

Host:
  Arch: arm64
  CurrentMachine: podman-machine-default
  DefaultMachine: podman-machine-default
  EventsDir: /var/folders/jf/51xzjfcn6zqg446gxgw32mkh0000gn/T/podman-run--1/podman
  MachineConfigDir: /Users/war/.config/containers/podman/machine/qemu
  MachineImageDir: /Users/war/.local/share/containers/podman/machine/qemu
  MachineState: Running
  NumberOfMachines: 1
  OS: darwin
  VMType: qemu
Version:
  APIVersion: 4.8.2
  Built: 1702291083
  BuiltTime: Mon Dec 11 18:38:03 2023
  GitCommit: aa546902fa1a927b3d770528565627d1395b19f3
  GoVersion: go1.21.5
  Os: darwin
  OsArch: darwin/arm64
  Version: 4.8.2
```

Podman 程序占用存储 56.7MB

```
brew info podman                                
==> podman: stable 4.8.2 (bottled), HEAD
Tool for managing OCI containers and pods
https://podman.io/
/opt/homebrew/Cellar/podman/4.8.2 (191 files, 56.7MB) *
  Poured from bottle using the formulae.brew.sh API on 2024-07-22 at 09:29:48
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/p/podman.rb
License: Apache-2.0 and GPL-3.0-or-later
```

Podman 虚拟机占用存储 3.7G

```
$ ls -lh /Users/war/.local/share/containers/podman/machine/qemu
total 7814176
drwxr-xr-x  3 war  staff    96B Jul 22 09:34 cache
-rw-------  1 war  staff   3.7G Jul 24 14:43 podman-machine-default_fedora-coreos-40.20240709.2.0-qemu.aarch64.qcow2
-rw-r--r--  1 war  staff    64M Jul 24 10:56 podman-machine-default_ovmf_vars.fd
srw-------  1 war  staff     0B Jul 24 10:56 podman.sock
```

Podman 有两个主要进程

```
$ ps -ef | grep podman
501 86506     1   0 10:56AM ttys003    0:21.43 /opt/homebrew/Cellar/podman/4.8.2/libexec/podman/gvproxy -mtu 1500 -ssh-port 55372 -listen-qemu unix:///var/folders/jf/51xzjfcn6zqg446gxgw32mkh0000gn/T/podman/qmp_podman-machine-default.sock -forward-sock /Users/war/.local/share/containers/podman/machine/qemu/podman.sock -forward-dest /run/user/501/podman/podman.sock -forward-user core -forward-identity /Users/war/.ssh/podman-machine-default -pid-file /var/folders/jf/51xzjfcn6zqg446gxgw32mkh0000gn/T/podman/podman-machine-default_proxy.pid
  501 86507     1   0 10:56AM ttys003   10:57.55 /opt/homebrew/bin/qemu-system-aarch64 -accel hvf -accel tcg -cpu host -M virt,highmem=on -drive file=/opt/homebrew/share/qemu/edk2-aarch64-code.fd,if=pflash,format=raw,readonly=on -drive file=/Users/war/.local/share/containers/podman/machine/qemu/podman-machine-default_ovmf_vars.fd,if=pflash,format=raw -m 2048 -smp 4 -fw_cfg name=opt/com.coreos/config,file=/Users/war/.config/containers/podman/machine/qemu/podman-machine-default.ign -qmp unix:/var/folders/jf/51xzjfcn6zqg446gxgw32mkh0000gn/T/podman/qmp_podman-machine-default.sock,server=on,wait=off -netdev socket,id=vlan,fd=3 -device virtio-net-pci,netdev=vlan,mac=5a:94:ef:e4:0c:ee -device virtio-serial -chardev socket,path=/var/folders/jf/51xzjfcn6zqg446gxgw32mkh0000gn/T/podman/podman-machine-default_ready.sock,server=on,wait=off,id=apodman-machine-default_ready -device virtserialport,chardev=apodman-machine-default_ready,name=org.fedoraproject.port.0 -pidfile /var/folders/jf/51xzjfcn6zqg446gxgw32mkh0000gn/T/podman/podman-machine-default_vm.pid -virtfs local,path=/Users,mount_tag=vol0,security_model=none -virtfs local,path=/private,mount_tag=vol1,security_model=none -virtfs local,path=/var/folders,mount_tag=vol2,security_model=none -drive if=virtio,file=/Users/war/.local/share/containers/podman/machine/qemu/podman-machine-default_fedora-coreos-40.20240709.2.0-qemu.aarch64.qcow2 -display none
```

Podman 进程占用内存27M，CPU占用可忽略不计

```
$ top -pid 86506 -stats pid,command,time,cpu,threads,ports,mem,purg

PID       COMMAND         TIME        %CPU    #TH     #PORTS  MEM     PURG
86506     gvproxy         00:21.58    0.0     15      41      27M     0B
```

Podman 虚拟机进程占用内在3.9G，CPU占用

```
$ top -pid 86507 -stats pid,command,time,cpu,threads,ports,mem,purg
PID       COMMAND             TIME        %CPU    #TH     #PORTS  MEM      PURG
86507     qemu-system-aarc    11:15.95    0.4     8       33      3917M    0B
```



### 完整卸载podman

```
podman machine stop
podman machine rm
brew uninstall podman
rm -rf ~/.local
```

