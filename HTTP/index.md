### HTTP 高频面试题

#### 1、常见HTTP状态？
 - 200 请求成功
 - 304 (Not Modified) 资源未修改（配合缓存头 If-Modified-Since 使用，减少带宽消耗）
 - 400​ (Bad Request): 请求语法错误（如参数格式错误、JSON 解析失败）
 - 401​​ (Unauthorized): 未认证（需提供有效身份凭证，如 JWT 失效）
​ - ​403​​ (Forbidden)	无权限访问（已认证但权限不足）
 - ​​404​​ (Not Found)	资源不存在（URL 错误或资源已删除）
 ​- ​405​​ (Method Not Allowed)	请求方法不允许（如用 GET 访问只支持 POST 的接口）
 - 500 (Internal Server Error): 服务器内部错误
 - 502​ (Bad Gateway): 网关出错
 - 503 (Service Unavailable): 服务不可用（维护、过载或临时故障）
 - ​​504​ (Gateway Timeout): 网关超时（代理服务器等待上游服务器响应超时）
 > 更多HTTP状态码： https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Status

