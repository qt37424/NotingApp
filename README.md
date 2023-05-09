+ THIS IS MY PROJECT NOTING APP IN FPT 
Instructor: VuongT1

Các node module được sử dụng trong project và được giải thích theo góc hiểu của bản thân
+ Express: để quản lí router
+ mongoose: để connect với MongooseDB tạo database
+ connect-flash: hỗ trợ tạo message và đóng gói sessions khi gửi tới client
+ sessions: hỗ trợ tạo sessions để đóng gói các thông tin khi gửi tới client
+ cookieParser: để hỗ trợ parse các thông tin từ form ra và gắn vào request khi gửi server
+ connect-mongodb-sessions: hỗ trợ cho việc lưu sessions in db
+ method-override: hỗ trợ cho việc xử lí request trên form (delete and put request)
+ bcrypt: hỡ trợ mã hóa khi lưu mật khẩu

View được sử dụng trong project là ejs

Các chức năng cụ thể của app
* User: 
+ Tạo User mới (username, firstname, lastname, password)
+ Update thông tin user (firstname, lastname, password)
+ Xóa user

* Note (Chỉ có thể làm khi đã đăng nhập, sẽ không truy cập vào các tính năng dưới nếu chưa đăng nhâp)
+ Tạo một note mới
+ Delete note
+ Updaet Note
=> Ở đây vẫn sẽ truy cập vào được nếu đã đăng xuất thông qua việc đăng xuất và back lại các page trước => vẫn chưa biết cách xử lí thế nào khi load như vậy

Bài tập vẫn còn nhiều thiếu sót mong thầy và mọi người có thể cho mình xin thêm ý kiến để em/mình có thể rút kinh nghiệm và hoàn thiện bản thân hơn trong tương lai