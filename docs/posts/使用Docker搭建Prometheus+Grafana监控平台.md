

```
kubectl create namespace monitor
```

为 helm 添加一下第三方源

```bash
helm repo remove stable
helm repo add stable http://mirror.azure.cn/kubernetes/charts
# 添加prometheus源 https://github.com/prometheus-community/helm-charts
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo update
helm search

http://mirror.azure.cn/kubernetes/charts
```

上述执行成功后，我们开始创建prometheus：

```bash
helm install prometheus prometheus-community/prometheus --namespace monitor
helm install alertmanager prometheus-community/alertmanager --namespace monitor
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack --namespace monitor
```



```
kubectl --namespace monitor get pods -l "release=prometheus"
kubectl --namespace monitor delete pods -l "release=prometheus"
```

