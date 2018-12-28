let charsets = {
	latin: {halfRE: /[!-~]/g, fullRE: /[！-～]/g, delta: 0xFEE0},
	hangul1: {halfRE: /[ﾡ-ﾾ]/g, fullRE: /[ᆨ-ᇂ]/g, delta: -0xEDF9},
	hangul2: {halfRE: /[ￂ-ￜ]/g, fullRE: /[ᅡ-ᅵ]/g, delta: -0xEE61},
	kana: {delta: 0,
		half: "｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ", 
		full: "。「」、・ヲァィゥェォャュョッーアイウエオカキクケコサシ" + 
			"スセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜"},
	extras: {delta: 0,
		half: "¢£¬¯¦¥₩\u0020|←↑→↓■°", 
		full: "￠￡￢￣￤￥￦\u3000￨￩￪￫￬￭￮"}
};
let toFull = set => c => set.delta ? 
	String.fromCharCode(c.charCodeAt(0) + set.delta) : 
	[...set.full][[...set.half].indexOf(c)];
let toHalf = set => c => set.delta ? 
	String.fromCharCode(c.charCodeAt(0) - set.delta) : 
	[...set.half][[...set.full].indexOf(c)];
let re = (set, way) => set[way + "RE"] || new RegExp("[" + set[way] + "]", "g");
let sets = Object.keys(charsets).map(i => charsets[i]);

// export function toFullWidth(str0) { 
// 	return sets.reduce((str,set) => str.replace(re(set, "half"), toFull(set)), str0);
// }
// export function toHalfWidth(str0) { 
// 	return sets.reduce((str,set) => str.replace(re(set, "full"), toHalf(set)), str0);
// }

var shiftCharCode = Δ => c => String.fromCharCode(c.charCodeAt(0) + Δ);
export function toFullWidth(str) { return str.replace(/[!-~]/g, shiftCharCode(0xFEE0)); }
export function toHalfWidth(str) { return str.replace(/[！-～]/g, shiftCharCode(-0xFEE0)); }