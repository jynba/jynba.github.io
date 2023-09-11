# Vue 中的 keep-alive

#### 一、概念：

keep-alive 实现了组件的缓存，当组件切换时不会对当前组件进行卸载。常用的 2 个**属性 include / exclude 以及 max 属性**，**2 个生命周期 activated / deactivated**，以及**LRU 算法**。

include 对哪些进行缓存

exclude 对哪些不进行缓存

max 最多缓存多少个

#### 二、原理：

keep-alive 是一个组件，这个组件中有三个属性，分别是 include、exclude、max，

在 created 中创建缓存列表和缓存组件的 key 列表，

销毁的时候会做一个循环销毁清空所有的缓存和 key

当 mounted 时会监控 include 和 include 属性，进行组件的缓存处理。

如果发生变化会动态的添加和删除缓存。渲染的时候会去拿默认插槽，只缓存第一个组件，取出组件的名字，判断是否在缓存中，如果在就缓存，不在就直接 return 掉，缓存的时候，如果组件没有 key，就自己通过组件的标签、key 和 cid 拼接一个 key。如果该组件缓存过，就直接拿到组件实例。如果没有缓存过就把当前的 vnode 缓存，和 key 做一个对应关系。

这里面有一个算法叫 LRU，如果有 key 就不停的取，如果超限了就采用 LRU 进行删除最近最久未使用的，从前面删除，LRU 就是将当前使用的往数组的后面移，在最前面的就是最久未使用的。

**LRU 算法：最近最久使用算法** （维护一个最近最常使用的队列）

三、源码：

文件位置：src/core/components/keep-alive.js

```js
export default {
	name: 'keep-alive',
	abstract: true,

	props: {
		include: patternTypes,
		exclude: patternTypes,
		max: [String, Number],
	},

	created() {
		this.cache = Object.create(null); // 创建缓存列表
		this.keys = []; // 创建缓存组件的key列表
	},

	destroyed() {
		for (const key in this.cache) {
			// keep-alive销毁时,循环清空所有的缓存和key
			pruneCacheEntry(this.cache, key, this.keys);
		}
	},

	mounted() {
		// 会监控include 和 include属性 进行组件的缓存处理
		this.$watch('include', (val) => {
			pruneCache(this, (name) => matches(val, name));
		});
		this.$watch('exclude', (val) => {
			pruneCache(this, (name) => !matches(val, name));
		});
	},

	render() {
		const slot = this.$slots.default; // 会默认拿插槽
		const vnode: VNode = getFirstComponentChild(slot); // 只缓存第一个组件
		const componentOptions: ?VNodeComponentOptions =
			vnode && vnode.componentOptions;
		if (componentOptions) {
			// check pattern
			const name: ?string = getComponentName(componentOptions); // 取出组件的名字
			const { include, exclude } = this;
			if (
				// 判断是否缓存
				// not included
				(include && (!name || !matches(include, name))) ||
				// excluded
				(exclude && name && matches(exclude, name))
			) {
				return vnode;
			}
			const { cache, keys } = this;
			const key: ?string =
				vnode.key == null
					? // same constructor may get registered as different local components
					  // so cid alone is not enough (#3269)
					  componentOptions.Ctor.cid +
					  (componentOptions.tag ? `::${componentOptions.tag}` : '')
					: vnode.key;
			// 如果组件没key 就自己通过 组件的标签和key和cid 拼接一个key
			if (cache[key]) {
				// 如果缓存中有key
				vnode.componentInstance = cache[key].componentInstance; // 直接拿到组件实例
				// make current key freshest
				remove(keys, key); // 删除当前的key // LRU 最近最久未使用法
				keys.push(key); // 并将key放到缓存的最后面
			} else {
				cache[key] = vnode; // 缓存vnode
				keys.push(key); // 将key 存入
				// prune oldest entry
				if (this.max && keys.length > parseInt(this.max)) {
					// 缓存的太多超过了max就需要删除掉

					pruneCacheEntry(cache, keys[0], keys, this._vnode); // 要删除第0个 但是现在渲染的就是第0个
				}
			}

			vnode.data.keepAlive = true; // 并且标准keep-alive下的组件是一个缓存组件
		}
		return vnode || (slot && slot[0]); // 返回当前的虚拟节点
	},
};
```
