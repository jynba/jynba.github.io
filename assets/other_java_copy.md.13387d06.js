import{_ as s,o as n,c as a,O as l}from"./chunks/framework.ed8d50c3.js";const m=JSON.parse('{"title":"浅拷贝与深拷贝","description":"","frontmatter":{},"headers":[],"relativePath":"other/java/copy.md","lastUpdated":1712564413000}'),p={name:"other/java/copy.md"},e=l(`<h1 id="浅拷贝与深拷贝" tabindex="-1">浅拷贝与深拷贝 <a class="header-anchor" href="#浅拷贝与深拷贝" aria-label="Permalink to &quot;浅拷贝与深拷贝&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言： <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言：&quot;">​</a></h2><p>前面我中谈到了 clone（浅拷贝），另外关于克隆网上也有很多的写过这方面的问题。 我在这里记录一下我遇到的问题和使用 clone 的方法。</p><h2 id="知识点一-什么是浅拷贝" tabindex="-1">知识点一：什么是浅拷贝？ <a class="header-anchor" href="#知识点一-什么是浅拷贝" aria-label="Permalink to &quot;知识点一：什么是浅拷贝？&quot;">​</a></h2><p>我们这里说的浅拷贝是指我们拷贝出来的对象<em>内部的引用类型变量和</em>原来对象内部引用类型变量是同一引用（指向同一对象）。 但是我们拷贝出来的对象和新对象不是同一对象。 简单来说，新（拷贝产生）、旧（元对象）对象不同，但是内部如果有引用类型的变量，新、旧对象引用的都是同一引用。</p><h2 id="知识点二-什么是深拷贝" tabindex="-1">知识点二：什么是深拷贝？ <a class="header-anchor" href="#知识点二-什么是深拷贝" aria-label="Permalink to &quot;知识点二：什么是深拷贝？&quot;">​</a></h2><pre><code>深拷贝：全部拷贝原对象的内容，*包括内存的引用类型也进行拷贝
</code></pre><h2 id="知识点三、java-拷贝-clone-的前提" tabindex="-1">知识点三、java 拷贝（clone）的前提： <a class="header-anchor" href="#知识点三、java-拷贝-clone-的前提" aria-label="Permalink to &quot;知识点三、java 拷贝（clone）的前提：&quot;">​</a></h2><p>1.首先我们需要知道Object类中一个clone()的方法，并且是protected关键字修饰的本地方法(使用native关键字修饰)，我们完成克隆需要重写该方法。 注意：按照惯例重写的时候一个要将protected修饰符修改为public，这是JDK所推荐的做法，但是我测试了一下， 复写的时候不修改为public也是能够完成拷贝的。但是还是推荐写成public。</p><p>2.我们重写的clone方法一个要实现Cloneable接口。虽然这个接口并没有什么方法，但是必须实现该标志接口。 如果不实现将会在运行期间抛出：CloneNotSupportedException异常</p><p>3.Object中本地clone()方法，默认是浅拷贝</p><h2 id="浅拷贝案例" tabindex="-1">浅拷贝案例 <a class="header-anchor" href="#浅拷贝案例" aria-label="Permalink to &quot;浅拷贝案例&quot;">​</a></h2><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class Person implements Cloneable{</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String name;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private int age;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private int[] ints;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public int[] getInts() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return ints;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public Person(String name, int age, int[] ints) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.age = age;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.ints = ints;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setInts(int[] ints) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.ints = ints;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public String getName() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return name;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setName(String name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public int getAge() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return age;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setAge(int age) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.age = age;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public Person(String name, int age) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.age = age;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     *  默认实现</span></span>
<span class="line"><span style="color:#A6ACCD;">     * */</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Object clone() throws CloneNotSupportedException {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        return  super.clone();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h2 id="深拷贝案例-clone-内代码有不同" tabindex="-1">深拷贝案例（clone()内代码有不同） <a class="header-anchor" href="#深拷贝案例-clone-内代码有不同" aria-label="Permalink to &quot;深拷贝案例（clone()内代码有不同）&quot;">​</a></h2><hr><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class Person implements Cloneable{</span></span>
<span class="line"><span style="color:#A6ACCD;">        private String name;</span></span>
<span class="line"><span style="color:#A6ACCD;">        private int age;</span></span>
<span class="line"><span style="color:#A6ACCD;">        private int[] ints;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        public int[] getInts() {</span></span>
<span class="line"><span style="color:#A6ACCD;">            return ints;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        public Person(String name, int age, int[] ints) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.age = age;</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.ints = ints;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        public void setInts(int[] ints) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.ints = ints;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        public String getName() {</span></span>
<span class="line"><span style="color:#A6ACCD;">            return name;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        public void setName(String name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        public int getAge() {</span></span>
<span class="line"><span style="color:#A6ACCD;">            return age;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        public void setAge(int age) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.age = age;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        public Person(String name, int age) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.age = age;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        /**</span></span>
<span class="line"><span style="color:#A6ACCD;">        *  深拷贝</span></span>
<span class="line"><span style="color:#A6ACCD;">        * */</span></span>
<span class="line"><span style="color:#A6ACCD;">        @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">        public Object clone() throws CloneNotSupportedException {</span></span>
<span class="line"><span style="color:#A6ACCD;">            Person person = new Person(name,age);</span></span>
<span class="line"><span style="color:#A6ACCD;">            int[] ints = new int[this.ints.length];</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.arraycopy(this.ints,0,ints,0,ints.length);</span></span>
<span class="line"><span style="color:#A6ACCD;">            person.setInts(ints);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">            return  person;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><hr><h2 id="总结-说人话系列" tabindex="-1">总结（说人话系列） <a class="header-anchor" href="#总结-说人话系列" aria-label="Permalink to &quot;总结（说人话系列）&quot;">​</a></h2><ul><li>浅拷贝时只拷贝了对象，但内部数据类型还是引用原来的类。<strong>覆写 <code>Object clone(){return super.clone()}</code></strong></li><li>深拷贝时不只拷贝了对象，还拷贝了内部数据类型。<strong>覆写 <code>Object clone(){new 相应的数据类型[this.ints.length]arraycopy...和对象 return person}</code></strong></li><li>注意：</li><li>1.一定要实现 Cloneable 接口</li><li>2.复写 clone()方法，注意：默认是浅拷贝，这里需要将引用类型进行深拷贝处理</li><li>3.特殊：String 类虽然是引用类型，但是是 final 类，同时也有字符串常量池的存在，不必进行处理 <br><br>           转载自 csdn 文章 <a href="https://blog.csdn.net/xinghuo0007/article/details/78896726" target="_blank" rel="noreferrer">原文大佬博客</a></li></ul>`,19),r=[e];function c(i,o,t,b,C,A){return n(),a("div",null,r)}const y=s(p,[["render",c]]);export{m as __pageData,y as default};
