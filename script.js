const flagMap = {
    "USD": "fi fi-us",       // دلار آمریکا
    'EUR': "fi fi-eu",       // یورو (اتحادیه اروپا)
    'AED': "fi fi-ae",       // درهم امارات
    'GBP': "fi fi-gb",       // پوند بریتانیا
    'JPY': "fi fi-jp",       // ین ژاپن
    'KWD': "fi fi-kw",       // دینار کویت
    'AUD': "fi fi-au",       // دلار استرالیا
    'CAD': "fi fi-ca",       // دلار کانادا
    'CNY': "fi fi-cn",       // یوآن چین
    'TRY': "fi fi-tr",       // لیر ترکیه
    'SAR': "fi fi-sa",       // ریال عربستان
    'CHF': "fi fi-ch",       // فرانک سوئیس
    'INR': "fi fi-in",       // روپیه هند
    'PKR': "fi fi-pk",       // روپیه پاکستان
    'IQD': "fi fi-iq",       // دینار عراق
    'SYP': "fi fi-sy",       // لیر سوریه
    'SEK': "fi fi-se",       // کرون سوئد
    'QAR': "fi fi-qa",       // ریال قطر
    'OMR': "fi fi-om",       // ریال عمان
    'BHD': "fi fi-bh",       // دینار بحرین
    'AFN': "fi fi-af",       // افغانی افغانستان
    'MYR': "fi fi-my",       // رینگیت مالزی
    'THB': "fi fi-th",       // بات تایلند
    'RUB': "fi fi-ru",       // روبل روسیه
    'AZN': "fi fi-az",       // منات آذربایجان
    'AMD': "fi fi-am",       // درام ارمنستان
    'GEL': "fi fi-ge",       // لاری گرجستان
};

$(function () {
    // Notification.requestPermission().then(p => {
    //     if (p === "granted") {
    //       new Notification("تست نوتیفیکیشن", {
    //         body: "اگر اینو دیدی یعنی کار می‌کنه ✅",
    //         icon: "https://via.placeholder.com/128"
    //       });
    //     } else {
    //       console.log("اجازه داده نشد ❌");
    //     }
    //   });
    $.ajax({
        url: "https://chnnd.ir/currency_call/getdata.php",
        method: 'GET',
        success: function (result) {
            result = JSON.parse(result);
            // console.log(result.gold);
            let golds = result.gold;
            let main = $(".main");
            main.append(`<h2 class="col-12 h2">Golds</h2>`);
            main.append('<hr>');

            golds.forEach(element => {
                let percent_color = element.change_percent >= 0 ? "red" : "green";
                let percent_class = element.change_percent >= 0 ? "percent_inc" : "percent_dec";
                main.append(`<div class="col-11 col-md-2 border p-3 rounded m-3">
                <div class="row align-items-center">
                    <div class="col-3">
                        <img src='gold.png' class='rounded-circle' width='50'>
                    </div>
                    <div class="col-9 text-end">
                        <h4 class="h6 text-end">${element.name_en}</h4>
                        <span class="text-end" style="font-size:0.6rem;">${element.name}</span>
                    </div>
                    <div class="col-12 mt-3">
                        <h5 class="${percent_class}" style="color:${percent_color}">${element.change_percent}</h5>
                        <h2 class="price number-separator">${addThousandSeparator(element.price)}</h2>
                    </div>
                </div>
            </div>
                    `);
            });
            let currencies = result.currency;
            main.append(`<h2 class="col-12 h2">Currencies</h2>`);
            main.append('<hr>');
            currencies.forEach(element => {
                let percent_color = element.change_percent >= 0 ? "red" : "green";
                let percent_class = element.change_percent >= 0 ? "percent_inc" : "percent_dec";
                let span = element.symbol != "USDT_IRT" ? `<span class="${flagMap[element.symbol]} rounded-circle h3 border"></span>` : `<img src='tether.webp' class='rounded-circle' width='50'>`;
                main.append(`<div class="col-11 col-md-2 border p-3 rounded m-3">
                <div class="row align-items-center">
                    <div class="col-3">
                        ${span}
                    </div>
                    <div class="col-9 text-end">
                        <h4 class="h6 text-end">${element.name_en}</h4>
                        <span class="text-end" style="font-size:0.6rem;">${element.name}</span>
                    </div>
                    <div class="col-12 mt-3">
                        <h5 class="${percent_class}" style="color:${percent_color}">${element.change_percent}</h5>
                        <h2 class="price number-separator">${addThousandSeparator(element.price)}</h2>
                    </div>
                </div>
            </div>
                    `);
            });
        },
        error: function(xhr, status, error) {
        console.error("خطا در AJAX:", {
            status: xhr.status,
            statusText: xhr.statusText,
            error: error,
            response: xhr.responseText
        });
        
        // نمایش خطا به کاربر
        if (xhr.status === 0) {
            alert("خطای شبکه: اتصال به سرور برقرار نشد");
        } else if (xhr.status === 404) {
            alert("آدرس API یافت نشد");
        } else if (xhr.status === 500) {
            alert("خطای سرور");
        } else {
            alert("خطای ناشناخته: " + xhr.status);
        }
    },
    })
});
function addThousandSeparator(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
$(document).ready(function () {
    $(".radio-btn").on("click", function () {
        $(".radio-inner").toggleClass("active");
        $("body").toggleClass("dark");
    })
})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registered"));
}



  
  function hlbutton(){
    Notification.requestPermission().then(p => {
        if (p === "granted") {
          new Notification("تست نوتیفیکیشن", {
            body: "اگر اینو دیدی یعنی کار می‌کنه ✅",
            icon: "https://via.placeholder.com/128"
          });
        } else {
          console.log("اجازه داده نشد ❌");
        }
      });
      
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").then(() => {
          console.log("Service Worker ثبت شد ✅");
      
          // صبر کن تا SW آماده بشه
          navigator.serviceWorker.ready.then(reg => {
            reg.active.postMessage({
              title: "سلام مهراب!",
              body: "این نوتیفیکیشن بدون سرویس پوش ساخته شده 🎉"
            });
          });
        });
      }
  }

  window.onerror = function(message, source, lineno, colno, error) {
    document.body.innerHTML += `<p style="color:red">JS Error: ${message} at ${source}:${lineno}</p>`;
  };
  