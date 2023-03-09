# Simple Twitter - 小型多人協作專案(前後分離SPA網頁應用程式)

本專案為小型的前後分離網頁應用程式開發協作練習，專案成果目標為建立一個仿 twitter 的小型論壇，使用者可以透過此平台與其他使用者互動。
(專案開發以creat-react-app建置，使用React.js)\

## 因後端資料庫問題暫時無法使用

## 預設登入帳號
前台

account: user1

password: 12345678

後台

account: root

password: 12345678


## 專案畫面成果

### 首頁示意
![image](https://user-images.githubusercontent.com/108887372/209478286-4be8b365-34b5-4d82-8f9d-c0d1e5f8a0c9.png)

## 專案功能

【前台：一般使用者】
* 可以註冊、登入、登出  
* 註冊時可設定帳號、名稱、email 和密碼  
* 登入後能：
  * 在首頁瀏覽所有的推文
  * 新增推文
  * 回覆推文
  * 查看推文內容及回覆
  * 對推文按 Like / Unlike
  * 查看任意使用者：
    * 新增的推文
    * 回覆過的推文
    * 按 like 的推文
    * 關注清單
    * 跟隨者清單
  * 追蹤 / 取消追蹤其他使用者
  * 查看追蹤數最高的 10 位使用者
  * 修改自己的名稱、自我介紹、大頭照與個人頁橫幅背景
  * 修改自己的帳號、名稱、email 與密碼 
  
【後台：管理者】
* 可以登入網站後台
* 可以在後台瀏覽全站推文的部分內容
* 管理者可以在清單上直接刪除任何人的推文
* 管理者可以瀏覽站內所有使用者的清單，清單的資訊包括使用者社群活躍數據：  
  * 推文數量
  * 推文被 like 的數量
  * 關注人數
  * 跟隨者人數

## 專案安裝流程
0. 打開終端機
1. 以指令下載此專案 
  ```
  git clone https://github.com/kignite/simple-twitter-frontend.git
  ```
2. 進入專案資料截
  ```
  cd simple-twitter-frontend
  ```
3. 安裝必備套件 **此步驟會等待較長時間
  ```
  npm install 
  ```
4. 啟動專案 
  ```
  npm start
  ```
5. 於 localhost:3000 開始使用
6. 如欲退出可按ctrl + c

## 開發者
後端 <br>
[Howhow Chen](https://github.com/HowhowChen) <br>
[Howard Wu](https://github.com/HowardWu5566) <br>
<br>
前端 <br>
[Peggy](https://github.com/Peggy8422) <br>
Leo

