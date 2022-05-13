# PIN-server
PIN 프로젝트 서버입니다. 

# 실행 요구조건 
```
$ node -v
v16.13.2

$ npm -v
8.6.0
```

# 테스트하기 
npx sequelize db:create 는 첫 연결시에만! 
```
$ git clone https://github.com/DB-PIN/pin-server.git
$ cd pin-server
$ npm install
$ npx sequelize db:create
$ npm start
```