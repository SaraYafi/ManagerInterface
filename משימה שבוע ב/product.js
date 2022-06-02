
import shop from "./shop.js";

var c=10;
export default class Product{
    #name;
    #code;
    #price;
    #category;
    #qty;
    constructor(name,price,category,qty){
        this.#name=name;
        this.#price=price;
        this.#qty=qty;
        this.#category=category;
        this.#code=c;
        c+=10;
        console.log(this)
    }
   get name(){
       return this.#name
   }
   get price(){
    return this.#price
}
get category(){
    return this.#category
}
get qty(){
    return this.#qty
}get code(){
    return this.#code
}
set name(value){
    this.#name=value;
}
set category(value){
    this.#category=value;
}
set price(value){
    this.#price=value;
}
set qty(value){
    this.#qty=value;
}



visiableInHTML(){
        var container = document.getElementById("container");
        var card = document.createElement("div");
        card.className ="card";
        card.id = this.code;
        var div=document.createElement("div");
        div.innerHTML=this.name;
        div.className="title";
        card.append(div);
        div=document.createElement("div")
        div.className="cardContent";
        div.innerHTML="מחיר :"+this.price+" שח";
        card.append(div);
        div=document.createElement("div")
        div.innerHTML= "כמות במלאי :"+this.qty+" יחידות";
        div.className="cardContent";
        card.append(div);
        div=document.createElement("div")
        div.innerHTML= "קטגוריה :"+this.category;
        div.className="cardContent";
        card.append(div);
        var button=document.createElement("button");
        button.id=this.code;
        button.innerHTML="עריכת מוצר";
        button.addEventListener("click",()=>shop.ShowAddProduct(this.#name,this.price,this.category,this.#qty,this.code));
        button.className="updateButton";
        card.append(button);
        container.append(card);
    }    
}

