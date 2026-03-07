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
- 502​ (Bad Gateway): 网关出错，如Nginx反向代理错误
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

#### 3、HTTP 常见请求有哪些及使用场景

- GET: 用于获取资源(幂等，可缓存、参数一般放在URL上，有大小限制)，如列表页，详情页。
- POST: 用于提交资源(非幂等，不可缓存，参数放在请求体，本身无大小限制，但服务器端有限制)，如提交表单，创建数据
- PUT: 用于全量更新资源(幂等，需要传所有字段)
- PATCH: 用于部分更新资源(非幂等)，如更新用户昵称
- DELETE: 删除资源(幂等)，如删除订单
- HEAD: 仅获取响应头（无响应体），如检查资源是否存在
- OPTIONS: 预检请求(CORS请求，浏览器自动发送)，查询服务器支持的方法
  > PS: 区分幂等性（多次请求结果一致）——GET/PUT/DELETE 幂等，POST/PATCH 非幂等。

#### 4、HTTP1.0、HTTP1.1、HTTP2.0、HTTP3.0区别？

- HTTP1.0
  - 短链接(一个请求一个链接)
  - 单域名托管(无 Host 头,单 IP 只能托管一个网站)
  - 仅支持 GET、POST、HEAD 方法
  - 缓存简单：只有 Expires、If-Modified-Since
- HTTP1.1
  - 支持持久连接（复用 TCP 通道（通过 Connection: keep-alive），但同一时间只能处理一个请求（管道化因实现复杂未普及））
  - 强制 Host 头，支持多域名托管
  - 新增方法（PUT、DELETE、OPTIONS）和状态码（100 Continue、206 Partial Content）
- HTTP2.0
  - 多路复用(单连接多个请求)
  - 二进制帧
  - 分块传输
  - 单链接多并发
  - 首部压缩(请求头、响应头去重 + 压缩)
  - 支持服务器端主动推送
    > PS: HTTP 2.0 解决 HTTP 1.1 的队头阻塞（一个请求阻塞，后续请求都等）；HTTP 3.0 基于 UDP 替代 TCP，彻底解决队头阻塞
- HTTP 3.0
  - 底层换成 QUIC 协议: 基于 UDP，不是 TCP
  - 彻底解决队头阻塞: 一个流丢包，不影响其他流
  - 0-RTT 握手: 连接建立极快，直接发数据
  - 内置 TLS 加密: 天然安全，相当于 HTTPS
  - 切换网络不中断: WiFi/4G 切换，不断线（适合移动端）

#### 5、GET 与 POST 区别？

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

#### 6、浏览器的缓存机制

```HTTP
         浏览器请求资源
               │
               ▼
        检查强缓存是否有效？
      ┌─────────┴─────────┐
      │                   │
  有效（未过期）         无效（已过期）
      │                   │
 直接读取本地缓存       向服务器发起请求
      │                   │
from disk/memory cache    ▼
    使用缓存        ┌───协商缓存验证───┐
                   │                │
                   ▼                ▼
                资源未修改      资源已修改
                   │                │
                   ▼                ▼
              返回 304（用缓存） 返回 200 + 新资源
```

#### 7、XSS(跨站脚本攻击)与CSRF(跨站请求伪造)

- XSS攻击 (Cross-Site Script)
  - 【本质】: 恶意JS被注入用户网页，当用户访问该网页，恶意JS会在浏览中执行，从何窃取用户信息，劫持会话或者篡改网页。
    - 存储型XSS: 恶意脚本被永久存储到服务器（数据库 / 文件）
      - 典型场景：评论区、留言板、用户资料填写框注入<script>窃取Cookie</script>
    - 反射型XSS: 恶意脚本通过URL参数传递，用户直接反射页面
      - 典型场景：搜索框、跳转链接：http://xxx.com/search?key=<script>alert(1)</script>
    - DOM型XSS: 恶意脚本通过前端 DOM 操作执行，不经过服务器
      - 典型场景：用户直接通过document.write(location.href)解析URL参数
  - 【防护】：过滤输入，转义输出、开启CSP、设置HttpOnly
    - 过滤输入：过滤用户输入的危险字符和标签

    ```js
    // 基础XSS过滤函数：转义HTML特殊字符
    function escapeHtml(str) {
      if (!str) return '';
      return str
        .replace(/&/g, '&amp;') // & → &amp;
        .replace(/</g, '&lt;') // < → &lt;
        .replace(/>/g, '&gt;') // > → &gt;
        .replace(/"/g, '&quot;') // " → &quot;
        .replace(/'/g, '&#39;'); // ' → &#39;
    }

    // 使用示例：渲染用户评论（避免脚本执行）
    const userComment = '<script>alert("窃取Cookie")</script>';
    document.getElementById('comment').innerText = escapeHtml(userComment);
    // 渲染结果：&lt;script&gt;alert(&quot;窃取Cookie&quot;)&lt;/script&gt;（纯文本，无脚本执行）
    ```

    - 转义输出: 不同场景不同转义输出
      - 渲染到 HTML 内容：用上述escapeHtml转义特殊字符；
      - 渲染到 HTML 属性：额外转义=、空格等；
      - 渲染到 JS 代码中：使用JSON.stringify()转义。
    - 开启CSP(内容安全策略)：限制脚本加载资源，禁止内联脚本执行

    ```html
    <!-- 示例：只允许加载本站和CDN的脚本，禁止内联脚本/eval -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self'; object-src 'none';"
    />
    ```

    - 设置Cookie的HttpOnly: 禁止JS获取Cookie

    ```http
      // 服务器响应头设置
     Set-Cookie: sessionId=123456; HttpOnly; Secure; SameSite=Lax
    ```

    - 避免使用危险的DOM API: 如eval()、document.write()、innerHTML（优先用innerText/textContent）

- CSRF(Cross-site request forgery)
  - 【本质】：攻击者诱导已登录目标网站的用户，在不经意点击恶意链接或者访问恶意页面，该页面会向目标网站发送一个符合用户权限的操作(如转账、修改密码)，目标网站服务器误以为用户主动发起，而执行敏感操作。
  - 【典型场景】：
    - GET请求：恶意链接http://bank.com/transfer?to=攻击者账户&amount=1000
    - POST请求： 恶意页面中隐藏的表单，自动提交 POST 请求
    - 移动端APP接口：未做防护的接口被第三方 APP 伪造请求调用
  - 【防护】: 验证请求来源 + 增加请求令牌(Token)
    - CRSF Token：服务器为用户生成唯一会话Token，前端每次请求携带此Token，服务端验证其合法性

    ```js
    /*例如请求头统一加Token：X-CSRF-Token: .......*/
    ```

    - 验证请求来源(Referer/Origin)头: 服务器检查请求的Referer(请求来源页面)或Origin（请求来源域名）是否为可信域名
      > PS: Referer可能被浏览器屏蔽，需降级处理，优先验证Origin
    - Cookie中的SameSite属性(基础防护)：限制网站cookie跨站访问,避免第三方网站携带Cookie发送请求。

    ```js
     // 服务器设置Cookie时添加SameSite
     Set-Cookie: sessionId=123456; SameSite=Strict; Secure
     /**
      * SameSite=Strict：仅同站请求携带 Cookie（最严格）；
      * SameSite=Lax：允许部分跨站 GET 请求携带（如链接跳转），POST 请求禁止；
      * SameSite=None：允许跨站携带，但需配合Secure（仅 HTTPS）。
     */
    ```
