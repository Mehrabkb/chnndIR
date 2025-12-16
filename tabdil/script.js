//داخل این ابجکت نتیجه وبسرویس را میذاریم
let results = {};

$.ajax({
    url : "https://chnnd.ir/currency_call/getdata.php",
    method : "GET",
    success:function(result){
        result = JSON.parse(result);
        results = result;
        let golds = result.gold;
        let currency = result.currency;
        let cryptocurrency = result.cryptocurrency;

        let slcList = $('select.list');
        for(let i = 0 ; i < golds.length ; i++){
            slcList.append("<option value='"+golds[i].symbol+"'>"+ golds[i].name +"</option>");
        }
        for(let i = 0 ; i < currency.length ; i++){
            slcList.append("<option value='"+currency[i].symbol+"'>"+ currency[i].name +"</option>");
        }
        for(let i = 0 ; i < cryptocurrency.length ; i++){
            slcList.append("<option value='"+cryptocurrency[i].symbol+"'>"+ cryptocurrency[i].name +"</option>");
        }
        
    }
});


$("form#converter-form").submit(function(e){
    e.preventDefault(); 
    let count = $("input#amount").val();
    let from = $("select#from").val();
    let to = $("select#to").val();
    let result = $("div.result");
    if(count < 1 || from == null || to == null){
        alertify.error("لطفا همه ی موارد را انتخاب کنید");
    }else if(from == to){
        alertify.error("هر دو مقدار نمیتوانند یکسان باشد");
    }else{
        result.html(calculate(count , from , to));
    }
});


function calculate(count , from , to){
    let fromValue = getTomanValue(from);
    let toValue = getTomanValue(to);
    if(from == "Toman")
        return count / toValue;
    if(to == "Toman")
        return count * fromValue;
    return (count * fromValue) / toValue;
}
function getTomanValue(key){
    for(let i = 0 ; i < results.cryptocurrency.length ; i++){
        if(results.cryptocurrency[i].symbol == key){
            if(results.cryptocurrency[i].unit == "دلار")
                return results.cryptocurrency[i].price * getDollarTomanValue();
            return results.cryptocurrency[i].price;
        }
    }
    for(let i = 0 ; i < results.currency.length ; i++){
        if(results.currency[i].symbol == key){
            if(results.currency[i].unit == "دلار")
                return results.cryptocurrency[i].price * getDollarTomanValue();
            return results.currency[i].price;
        }
    }
    for(let i = 0 ; i < results.gold.length ; i++){
        if(results.gold[i].symbol == key){
            if(results.gold[i].unit == "دلار")
                return results.cryptocurrency[i].price * getDollarTomanValue();
            return results.gold[i].price;
        }
    }
}

$(document).ready(function() {
    $('.js-example-basic-single').select2();
});
function getDollarTomanValue(){
    return results.currency[1].price;
}

$('button#swap').click(function(){
    let tempValue = $("select#from").val();
    $("select#from").val($("select#to").val()).trigger("change");
    $("select#to").val(tempValue).trigger('change');
})
function setSelectedItem(id , value){
    let options = document.querySelectorAll("select#" + id + " option");
    for(let i = 0  ; i< options.length ; i++){
        if(options[i].value == value){
            options[i].setAttribute("selected" , "true");
        }
    }

}