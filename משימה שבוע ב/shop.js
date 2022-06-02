


import Product from "./product.js";

class Shop{
    products;
    categories;
    tempProd;
    search;
    constructor(){
        this.products=[];
        this.categories=['מוצרי יסוד','פירות וירקות','טקסטיל'];
        this.tempProd={name:"",price:0,category:"מוצרי יסוד",qty:0};
        this.search={name:"",minPrice:0,maxPrice:1000,cat:"הכל"};
    }
    ShowProducts=(arr=this.products)=>{
        document.getElementById("container").innerHTML="";
         //בכפתור הלחיצה נשלח אוטומטי ארוע ולכן חייבים את התנאי
       if(arr.type=="click"&&this.products.length)
       this.products.forEach(p=> p.visiableInHTML());
       else if(arr.length)
           arr.forEach(p=> p.visiableInHTML());
       else
        document.getElementById("container").innerHTML="לא נמצאו מוצרים"; 
    }
    ShowAddProduct=(name,price,category="מוצרי יסוד",qty,code)=>{
        document.getElementById("search").style.display="none";
        document.getElementById("qty").style.display="none";
        this.tempProd={name,price,category,qty};
        var container = document.getElementById("container");
        container.innerHTML="";
        var label=document.createElement("label");
        var inputName=document.createElement("input");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("name", "name");
        {this.tempProd.name?inputName.value=this.tempProd.name:inputName.setAttribute("placeholder", "הכנס שם מוצר")};
        inputName.addEventListener("keyup", this.Change);
        inputName.className="input";
        var inputPrice=document.createElement("input");
        inputPrice.setAttribute("type", "number");
        inputPrice.setAttribute("name", "price");
        inputPrice.addEventListener("keyup", this.Change);
        {this.tempProd.price?inputPrice.value=this.tempProd.price:inputPrice.setAttribute("placeholder", "מחיר")};
        inputPrice.className="input";
        var inputQty=document.createElement("input");
        inputQty.setAttribute("type", "number");
        inputQty.setAttribute("name", "qty");
        {this.tempProd.qty?inputQty.value=this.tempProd.qty:inputQty.setAttribute("placeholder", "כמות במלאי")};
        inputQty.addEventListener("keyup", this.Change);
        inputQty.className="input";
        var inputSelect=document.createElement("select");
        inputSelect.setAttribute("name", "category");
        inputSelect.setAttribute("value", "הכל");
        var opt ,p1;
        {this.tempProd.name?p1=category:p1="מוצרי יסוד"};
        opt= document.createElement ("option");
        opt.setAttribute("value", p1);
        opt.innerHTML=p1;
        inputSelect.append(opt);
        this.categories.map(p=>{ 
        if(p!=p1){
        opt= document.createElement ("option");
        opt.setAttribute("value", p);
        opt.innerHTML=p;
        inputSelect.append(opt);} });
        inputSelect.className="input";
        inputSelect.addEventListener("change", this.Change);
        var button=document.createElement("button");
        {this.tempProd.name?button.innerHTML= "עדכן": button.innerHTML= "הוסף מוצר"};
        button.className="button";
        button.key=code;
        {this.tempProd.name?button.addEventListener("click",this.UpdateProd):button.addEventListener("click", this.AddProduct)};
        label.innerHTML="שם";
        label.className="label";
        container.append(label);
        container.append(inputName);
        label=document.createElement("label");
        label.innerHTML="מחיר";
        label.className="label";
        container.append(label);
        container.append(inputPrice);
        label=document.createElement("label");
        label.innerHTML="כמות במלאי";
        label.className="label";
        container.append(label);
        container.append(inputQty);
        label=document.createElement("label");
        label.innerHTML="קטגוריה";
        label.className="label";
        container.append(label);
        container.append(inputSelect);
        container.append(button);
    }
    ShowSearch(){
        document.getElementById("qty").style.display="none";
        document.getElementById("search").style.display="block";
        var select = document.getElementById("selectCat");
        var options = document.querySelectorAll('option');
        options.forEach(o => o.remove());
        var opt= document.createElement ("option");
        opt.setAttribute("value", "הכל");
        opt.innerHTML="הכל";
        select.append(opt)
        this.categories.map(p=>{ 
            opt= document.createElement ("option");
            opt.setAttribute("value", p);
            opt.innerHTML=p;
            select.append(opt);} );
        this.ShowProducts();    
    }
    showManageQty(){
        document.getElementById("search").style.display="none";
        document.getElementById("qty").style.display="block";
        this.ShowProducts();
    }
    showCategory(){
        document.getElementById("search").style.display="none";
        document.getElementById("qty").style.display="none";
        container.innerHTML="";
        var label=document.createElement("label");
        var inputName=document.createElement("input");
        inputName.className="input";
        inputName.setAttribute("type", "text");
        inputName.setAttribute("id", "nameCat");
        label.innerHTML="שם";
        label.className="label";
        container.append(label);
        container.append(inputName);
        var button=document.createElement("button");
         button.innerHTML= "הוסף קטגוריה";
        button.className="button";
        button.addEventListener("click",this.AddCategory)
        container.append(button);
    }
    AddCategory=()=>{
     let name= document.getElementById("nameCat").value;
     if(this.categories.indexOf(name)==-1&&name!="")
     this.categories.push(name);
     else
     console.log("קטגוריה קיימת")
     document.getElementById("nameCat").value="";
    }
    AddProduct=()=> {
        console.log(this.products);
    let {name,price,category,qty} = {...this.tempProd};
    var p1=new Product(name,price,category,qty);
    this.products.push(p1);
    this.tempProd={name:"",price:0,category:"מוצרי יסוד",qty:0};
    this.ShowProducts();
    }
    UpdateProd=(e)=>{
           var code=e.target.key;
           let index=this.products.findIndex(p=>p.code==code);
           var {name,price,category,qty}={...this.tempProd};
           let p=this.products[index];
           p.name=name;
           p.price=price;
           p.category=category;
           p.qty=qty;
           this.products[index]=p;
           //this.products[index]=new Product(name,price,category,qty);     
           this.ShowProducts();
    }
    Change = (e) => {
        let {name, value,type}=e.target;
        if(type=="number")
        value=+value;
        if(type=="checkbox")
        value=e.target.checked;
        if(type=="select")
        value=e.target.selected;
        this.tempProd[name]=value;
    }
    SearchProducts=(e)=>{
         this.search[e.name]=e.value;
         let arr=this.products.filter(p=>this.search.cat=="הכל"||p.category==this.search.cat).filter(p=> p.price>=this.search.minPrice&&
            (!this.search.maxPrice|| p.price<=this.search.maxPrice)).filter(
           p=> p.name.indexOf(this.search.name)!=-1
         );
         this.ShowProducts(arr);
    }
    SearchByCode=(e)=>{
        let code=e.target.value;
        let arr=this.products.filter(p=>p.code==code);
        this.ShowProducts(arr);
    }
    manageQty=(kind)=>{
        let arr;
        if(kind==1)
          arr=this.products.filter(p=>p.qty==0);
         else
         arr=this.products.filter(p=>p.qty<5);
         this.ShowProducts(arr);
    } 

}
export default  window.shop=new Shop();
//דרך נוספת לקשר ארועים אם לא רוצים שהאובייקט יהיה גלובלי
document.getElementById("show").addEventListener("click", shop.ShowProducts);





