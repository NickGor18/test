function decode(expr) {
    var str = new String(str);
    let inf = new String(expr)
    let arr = new Array();
    var j=0;
    for (let i = 0; i < inf.length; i++) {
        if ((inf[i] == '1') && (inf[i + 1] == '0')) {
            str += '.';
            continue;
        }
        if ((inf[i] == 1) && (inf[i + 1] == 1)) {
            str += '-';
            i++;
            continue;
        }
        if ((inf[i] == '*') && (inf[i + 1] == '1' || inf[i + 1] == '0')) {
            arr[j]=' ';
            j++;
        }
        if ((inf[i] == '0') && (inf[i + 1] == '1') && (inf[i - 1] != '1')) {
            arr[j]=MORSE_TABLE[str];
            str='';
            j++;
        }
    }
    