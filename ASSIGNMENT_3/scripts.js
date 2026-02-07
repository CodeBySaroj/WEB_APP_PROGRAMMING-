import { add, sub, mul, div } from './calculator.js';

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn_add').onclick = () => symbol.value = '+';
    document.getElementById('btn_sub').onclick = () => symbol.value = '-';
    document.getElementById('btn_mul').onclick = () => symbol.value = '*';
    document.getElementById('btn_div').onclick = () => symbol.value = '/';

    document.getElementById('btn_res').onclick = () => {
        const x = Number(num1.value);
        const y = Number(num2.value);

        switch (symbol.value) {
            case '+': result.value = add(x, y); break;
            case '-': result.value = sub(x, y); break;
            case '*': result.value = mul(x, y); break;
            case '/': result.value = div(x, y); break;
        }
    };
});
