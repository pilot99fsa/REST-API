const express = require("express")
const app = express()
app.use(express.json()) // JSON形式のファイルを扱うことを指定する

app.listen(3000, console.log("サーバーが実行されました"))

app.get("/", (req, res) => {
    res.send("Hello world")
})


// お客様情報をサーバーに保管する
// お客様情報

const customers = [
    { title: "田中", id: 1 },
    { title: "西", id: 2 },
    { title: "東", id: 3 },
    { title: "北", id: 4 },
    { title: "南", id: 5 }
];

// メモ: CRUDとは、データベース管理システム（DBRS）に必要とされる4つの主要な機能、「作成（Create）」「読み出し（Read）」「更新（Update）」「削除（Delete）」をそれぞれ頭文字で表したもののことである。

// GETメソッドで情報を取得する
app.get("/api/customers", (req, res) => {
    res.send(customers)
})


// ブラウザのURLに/api/customersと入力するとJSON形式で情報を取得できる
app.get("/api/customers", (req, res) => {
    res.send(customers);
})

// :idの部分はクライアントが数字を打ち込む
app.get("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id)) // find関数はクライアントがidを指定したリクエストを送る
    res.send(customer)
}) //例えばブラウザのURLに/api/customers/3と入力すると、17行目の東さんの情報を取得できる
// このようにIdを指定して情報できる

// データを送信(作成)してみる
// POSTメソッドを使っていく

app.post("/api/customers", (req, res) => {
    // 5人の情報に新しい人の情報を追加していこう
    const customer = {
        title: req.body.title,
        id: customers.length + 1, // 現在の人数に+1する
    }
    customers.push(customer) //14行目のcustomersに情報を追加する
    res.send(customers) // 追加されているか確認してみよう
})

// URLを打ち込んで確認しよう、しかしURLを打ち込むだけではGETメソッドになる.
// POSTメソッドを実行するためには、フォームを用意してSubmitを作る方法もある

// 今回はpostmanを使っていく
// postman上でPOSTメソッドを使い、JSON形式でsendすると、6番目に人の情報を追加できる


// PUTメソッドでデータを更新する

app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id))
    customer.title = req.body.title
    res.send(customer)
})

// DELETEメソッド

app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id))
    // 指定したidの情報を消す処理を記述する
    const index = customers.indexOf(customer)
    customers.splice(index, 1)
    res.send(customer)
})