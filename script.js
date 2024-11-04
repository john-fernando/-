const botonLeer = document.getElementById("leer");
const textoInput = document.getElementById("texto-input");
const textoSalida = document.getElementById("texto-salida");
let intervaloResaltado;

// テキストを一文字ずつ<span>タグで囲む
function prepararTextoParaResaltado(texto) {
    textoSalida.innerHTML = texto.split("").map(letra => `<span>${letra}</span>`).join("");
}

// 文字を一定の時間間隔で累積強調表示する
function iniciarResaltadoPorTiempo(texto, intervalo = 200) {
    prepararTextoParaResaltado(texto);

    const spans = textoSalida.querySelectorAll("span");
    let indice = 0;

    // 既存のインターバロをクリア（もし存在する場合）
    if (intervaloResaltado) clearInterval(intervaloResaltado);

    // `setInterval`を使って時間ごとに強調表示
    intervaloResaltado = setInterval(() => {
        if (indice < spans.length) {
            spans[indice].classList.add("resaltado");
            indice++;
        } else {
            clearInterval(intervaloResaltado); // 終わったらインターバルをクリア
        }
    }, intervalo);
}

// 音声と強調表示を同時に開始
function leerTextoYResaltarPorTiempo(texto, intervalo = 200, velocidad = 1) {
    iniciarResaltadoPorTiempo(texto, intervalo);

    if ('speechSynthesis' in window) {
        const mensaje = new SpeechSynthesisUtterance(texto);
        mensaje.lang = 'ja-JP'; // 日本語での読み上げ
        mensaje.rate = velocidad; // 読み上げ速度を設定

        window.speechSynthesis.speak(mensaje);
    } else {
        alert("申し訳ありませんが、お使いのブラウザは読み上げAPIに対応していません。");
    }
}

// ボタンをクリックしたらテキストを読み上げると同時に強調表示を開始
botonLeer.addEventListener("click", () => {
    const texto = textoInput.value;
    if (texto) {
        leerTextoYResaltarPorTiempo(texto, 148, 1); // 200ミリ秒ごとに強調表示を進める
    } else {
        alert("テキストを入力してください！");
    }
});

