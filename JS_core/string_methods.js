// Start
let text = "vu, xuan, hoai";
let text1 = "  vu  xuan  hoai"
let numb =5;
let sub1 = text.slice(0,6);
let sub2 = text.slice(7);
let sub3 = text.substring(0,8);
let sub4 = text.replace("vu", "Vu");
let sub5 = text1.trim();
let sub6 = text.concat(" ",text1);
let sub7 = text1.trimStart();
let sub8 = numb.toString().padStart(5,"0");
let sub9 = text1.charAt(2);
let sub10 = text[0];
const sub11 = text.split("");
// 
document.getElementById("length").innerHTML = text.length;

document.getElementById("test").innerHTML = sub5;