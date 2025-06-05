### HTTP 高频面试题

#### 1、常见 HTTP 状态？

- 200 请求成功
- 304 (Not Modified) 资源未修改（配合缓存头 If-Modified-Since 使用，减少带宽消耗）
- 400​ (Bad Request): 请求语法错误（如参数格式错误、JSON 解析失败）
- 401​​ (Unauthorized): 未认证（需提供有效身份凭证，如 JWT 失效）
- ​403​​ (Forbidden) 无权限访问（已认证但权限不足）
- ​​404​​ (Not Found) 资源不存在（URL 错误或资源已删除）
- ​405​​ (Method Not Allowed) 请求方法不允许（如用 GET 访问只支持 POST 的接口）
- 500 (Internal Server Error): 服务器内部错误
- 502​ (Bad Gateway): 网关出错
- 503 (Service Unavailable): 服务不可用（维护、过载或临时故障）
- ​​504​ (Gateway Timeout): 网关超时（代理服务器等待上游服务器响应超时）
  > 更多 HTTP 状态码： https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Status

#### 2、地址栏敲入 URL 发生了什么 ？

- URL 的解析与预处理
- DNS 查询(解析域名为 IP)
- 建立网络连接，经过 TCP 的三次握手、四次挥手
- HTTP 请求与响应
- 浏览器页面渲染
  - 步骤：解析 HTML,构建 DOM Tree，解析 CSS 构建 CSS Tree, 合并成 render Tree，再经过 Layout(布局)，paint(绘制)，组合，最终渲染到页面上

#### 3、HTTP1.0、HTTP1.1、HTTP2.0 区别？

- HTTP1.0
  - 短链接(每次请求都需要新建一个 TCP 请求)
  - 单域名托管(无 Host 头,单 IP 只能托管一个网站)
  - 仅支持 GET、POST、HEAD 方法
- HTTP1.1
  - 支持持久连接（复用 TCP 通道（通过 Connection: keep-alive），但同一时间只能处理一个请求（管道化因实现复杂未普及））
  - 强制 Host 头，支持多域名托管
  - 新增方法（PUT、DELETE、OPTIONS）和状态码（100 Continue、206 Partial Content）
- HTTP2.0
  - 二进制帧
  - 单链接多并发
  - 首部压缩
  - 多路复用
  - 支持服务器端主动推送

#### 4、GET 与 POST 区别？

- 含义
  - GET 用于`获取`资源，POST 用于`创建或修改`资源
- 传输方式
  - GET 通过 URL 传参，支持 URL 编码（application/x-www-form-urlencoded），有 URL 长度限制
  - POST 通过请求体(request Body)传参,支持多种传参方式（multipart/form-data、JSON），大小无硬性限制（由服务器配置决定）
- 安全性
  - GET 的请求参数放在 URL 上属于明文传输，不安全(如果传输敏感数据)
  - POST 的请求参数放在 Body 上，安全性优于 GET，实际也不安全，需配合数据加密，HTTPS，提高安全性。
- 幂等性与缓存 ​
  - GET 幂等（多次请求效果相同），浏览器可能会存在缓存
  - 非幂等（可能多次创建资源），默认不可缓存
- 常见误区解释
  - GET 不能传 body(实际可以)
    - GET 请求技术上可以传 body，但无意义且部分服务器会忽略
  - POST 请求更安全(都不安全)
    - 实际上, 明文传输下，都不安全

#### 5、浏览器的缓存机制
```md
         浏览器请求资源
               │
               ▼
        检查强缓存是否有效？
      ┌─────────┴─────────┐
      │                   │
  有效（未过期）       无效（已过期）
      │                   │
 直接读取本地缓存       向服务器发起请求
      │                   │
      ▼                   ▼
   使用缓存       ┌───协商缓存验证───┐
                │                │
                ▼                ▼
           资源未修改         资源已修改
                │                │
                ▼                ▼
        返回 304（用缓存）   返回 200 + 新资源

```
#### 6、XSS(跨站脚本攻击)与CSRF(跨站请求伪造)

- XSS攻击 (Cross-Site Script)
   - 存储型
   - 持久型
   - 反射型
- CSRF(Cross-site request forgery)
