// commanderモジュールをprogramオブジェクトとしてインポートする
const program = require("commander");
// fsモジュールをfsオブジェクトとしてインポートする
const fs = require("fs");
// md2htmlモジュールをインポートする
const md2html = require("./md2html");

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);
const filePath = program.args[0];

// コマンドライン引数のオプションを取得する
const options = program.opts();

// コマンドライン引数で指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
    gfm: false,
    ...program.opts(),
};

// ファイルを非同期で読み込む
fs.readFile(filePath,　{ encoding: "utf8" }, (err, file) => {
    if (err) {
        console.error(err.message);
        // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
        process.exit(1);
        return;
    }
    // md2htmlモジュールを使ってHTMLに変換する
    const html = md2html(file, cliOptions);
    console.log(html);
});
