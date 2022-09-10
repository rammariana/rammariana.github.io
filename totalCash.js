const d = document;

export default function totalCash() {
  const $display = d.querySelector(".display"),
    $pay = d.querySelector(".pagar"),
    $total = d.querySelector(".total-total"),
    $reset = d.querySelector(".reiniciar"),
    $rest = d.querySelector(".rest");
  let monedaEnCaja = [100, 60, 60, 55, 7, 4, 6, 2, 5];

  $reset.addEventListener("click", (e) => {
    resetAll();
  });
  $pay.addEventListener("click", (e) => {
    sacarResultado();
    //console.log(display + 3)
  });

  function resetAll() {
    $display.textContent = "";
    $total.textContent = "";
  }

  function sacarResultado() {
    let operadores = /[+-]/,
      $debt = Number($display.textContent.replace(operadores, ""));
    let valorMoneda = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    //let monedaEnCaja = [100, 60, 60, 55, 7, 4, 6, 2, 5];
    let cantidadMoneda = [];
    let money = [
      ["🪙 ONE HUNDRED"],
      ["🪙 TWENTY"],
      ["🪙 TEN"],
      ["🪙 FIVE"],
      ["🪙 ONE"],
      ["🪙 QUARTER"],
      ["🪙 DIME"],
      ["🪙 NIQUEL"],
      ["🪙 PENNY"],
    ];
    let change = [];
    let count = 0;
    let rest = [
      ["<br>🪙 ONE HUNDRED"],
      ["<br>🪙 TWENTY"],
      ["<br>🪙 TEN"],
      ["<br>🪙 FIVE"],
      ["<br>🪙 ONE"],
      ["<br>🪙 QUARTER"],
      ["<br>🪙 DIME"],
      ["<br>🪙 NIQUEL"],
      ["<br>🪙 PENNY"],
    ];

    for (let i = 0; i < valorMoneda.length; i++) {
      cantidadMoneda.push(Math.round(monedaEnCaja[i] / valorMoneda[i]));
    } //calculando cantidadMoneda

    let vueltoMoneda = cantidadMoneda.slice();

    for (let k = 0; k < valorMoneda.length; k++) {
      if ($debt >= valorMoneda[k] && monedaEnCaja[k] > 0) {
        monedaEnCaja[k] -= valorMoneda[k];
        $debt = $debt.toFixed(2) - valorMoneda[k];
        cantidadMoneda[k] -= 1;
        k--;
      }
    }
    //console.log($debt);

    for (let y = 0; y < valorMoneda.length; y++) {
      change.push((vueltoMoneda[y] - cantidadMoneda[y]) * valorMoneda[y]);
    }

    change.toString().split(",");
    //console.log(change);

    for (let n = 0; n < money.length; n++) {
      money[n].push(change[n]);
    }

    for (let m = 0; m < monedaEnCaja.length; m++) {
      if (monedaEnCaja[m] === 0) {
        count += 1;
      }
    }
    for (let x = 0; x < cantidadMoneda.length; x++) {
      rest[x].push(cantidadMoneda[x]);
    }

    let option2 = "{Status: OPEN}<br>Change:<br>";
    let option1 = "{Status: CLOSED}<br>Change:<br><br>";
    let option3 = '{Status: "INSUFFICIENT_FUNDS"}';

    console.log(rest);
    for (let j = 0; j < monedaEnCaja.length; j++) {
      money[j].push("<br>");
    }

    if (count < 5) {
      money.filter((e) => e[1] > 0);
      $total.innerHTML = `${option2.concat(money.join(""))}`;
      $rest.innerHTML = `<br>Rest:${rest}`;
    } else if (count >= 8 || monedaEnCaja - $debt < 0) {
      $total.innerHTML = option3;
      $rest.innerHTML = `<br>Rest:${rest}`;
    } else {
      //money.reverse();
      $total.innerHTML = `${option1.concat(money.join(""))}`;
      $rest.innerHTML = `<br>Rest:${rest}`;
    }
  }
}
