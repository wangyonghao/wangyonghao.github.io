

### HashMap

### HashTable

```java
public class Hashtable<K,V> extends Dictionary<K,V> 
    implements Map<K,V>, Cloneable, java.io.Serializable {
    
    public synchronized int size() {...}
 
    public synchronized boolean isEmpty() {...}
 
    public synchronized V get(Object key) {...}
 
    public synchronized V put(K key, V value) {...}
}
```

HashTable与HashMap的数据结构一致，都是哈希表实现。

与HashMap不同的是，在HashTable中，所有的方法都加上了synchronized锁，用锁来实现线程的安全性。由于synchronized锁加在了HashTable的每一个方法上，所以这个锁就是HashTable本身--this。可想而知HashTable的效率是如何，安全是保证了，但是效率却损失了。

### ConcurrentHashMap

与HashMap不同的是，ConcurrentHashMap中多了一层数组结构，由Segment和HashEntry两个数组组成。其中Segment起到了加锁同步的作用，而HashEntry则起到了存储K.V键值对的作用。

在多线程中，每一个Segment对象守护了一个HashEntry数组，当对ConcurrentHashMap中的元素修改时，在获取到对应的Segment数组角标后，都会对此Segment对象加锁，之后再去操作后面的HashEntry元素，这样每一个Segment对象下，都形成了一个小小的HashMap，在保证数据安全性的同时，又提高了同步的效率。只要不是操作同一个Segment对象的话，就不会出现线程等待的问题！





参考： https://www.jianshu.com/p/8f7b2cd34c47