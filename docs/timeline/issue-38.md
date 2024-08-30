> 在实际的ts开发中，我泛型用的很少，因为有时候我觉得不用泛型好像也行？今天补充一个泛型的比较常见的实际使用场景，积累一下。[参考链接](https://juliangaramendy.dev/blog/when-ts-generics)

  :::tip 原文地址
  [TS中什么时候要用泛型？ | GitHub](https://github.com/jynba/jynba.github.io/issues/38)
  :::
  
### 
```typescript
//对比一：
function getOldest(items: HasAge[]): HasAge {
  return items.sort((a, b) => b.age - a.age)[0];
}
type Person = { name: string, age: number};
const people: Person[] = [
  { name: 'Amir', age: 10 }, 
  { name: 'Betty', age: 20 }, 
  { name: 'Cecile', age: 15 }
 ];
const oldestPerson = getOldest(people); // 🙂 no type errors
console.log(oldestPerson.name); // ❌ type error: Property 'name' does not exist on type 'HasAge'.
const oldestPerson: Person = getOldest(people); // ❌ type error
// Property 'name' is missing in type 'HasAge' but required in type 'Person'.
const oldestPerson = getOldest(people) as Person; // 🚩
console.log(oldestPerson.name); // no type error

//对比二：（better）
function getOldest<T extends HasAge>(items: T[]): T {
  return items.sort((a, b) => b.age - a.age)[0];
}
const oldestPerson = getOldest(people); // ✅ type Person
```

- 所以定义函数的时候什么时候该用泛型，什么时候不用泛型？
- **答案**就是：当你的函数不打算返回相同的对象类型，就不需要泛型
如：
```typescript
//same
function isFirstOlder(a: HasAge, b: HasAge) {
  return a.age > b.age;
}
function isFirstOlder<T extends HasAge>(a: T, b: T) {
  return a.age > b.age;
}
```