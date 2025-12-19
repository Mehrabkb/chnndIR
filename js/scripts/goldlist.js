const imageMap = {
    "IR_GOLD_18K": "../images/goldcard.jpg",
    "IR_GOLD_24K": "../images/goldcard.jpg",
    "IR_GOLD_MELTED": "../images/ouncegold.webp",
    "XAUUSD": "../images/ouncegold.webp",
    "IR_COIN_1G": "../images/1gcoin.jpg",
    "IR_COIN_HALF": "../images/1gcoin.jpg",
    "IR_COIN_QUARTER": "../images/1gcoin.jpg",
    "IR_COIN_EMAMI": "../images/imamicoin.jpg",
    "IR_COIN_BAHAR": "../images/1gcoin.jpg",

};

$(function () {
    $.ajax({
        url: "https://chnnd.ir/currency_call/getdata.php",
        method: "GET",
        dataType: "json", // خروجی JSON مستقیم
        success: function (result) {
            let golds = result.gold;
            let goldContainer = $("#goldContainer");
            console.log(golds);

            // فقط 9 آیتم اول
            golds.slice(0, 9).forEach(element => {
                let percent_color = element.change_percent >= 0 ? "red" : "green";
                let percent_class = element.change_percent >= 0 ? "percent_inc" : "percent_dec";

                let imgSrc = imageMap[element.symbol] || "images/default.jpg";

                goldContainer.append(`
          <div class="col-md-3 mb-3">
            <div class="card priceCard p-3 d-flex flex-column align-items-center position-relative">
             <img src="${imgSrc}" class="mb-2" alt="${element.name}">
              <h3 class=" fw-bold fs-4">${element.name}</h3>
              <!-- نماد انگلیسی -->
              <small class="text-secondary mt-1 mb-3">${element.name_en}</small>

              <!-- قیمت اصلی -->
              <span class="priceSymbol mb-2 fs-5">
                ${addThousandSeparator(element.price)} ${element.unit}
              </span>

              <!-- تغییرات -->
              <span class="pricePercent ${percent_class} fs-6" style="color:${percent_color};">
                ${element.change_percent}% (${addThousandSeparator(element.change_value)} ${element.unit})
              </span>

              <!-- تاریخ و ساعت -->
              <div class="mt-3 text-muted fs-6">
                📅 ${element.date} &nbsp; ⏰ ${element.time}
              </div>

              
            </div>
          </div>
        `);
            });
        },
        error: function (xhr, status, error) {
            console.error("خطا در دریافت داده:", error);
        }
    });
    showPersianDateTime();

    // آپدیت هر ثانیه
    setInterval(showPersianDateTime, 1000);
});

// جداکننده هزارگان
function addThousandSeparator(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showPersianDateTime() {
    // تاریخ و ساعت فعلی
    let now = new Date();

    // تاریخ شمسی با فرمت فارسی
    let persianDate = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(now);

    // ساعت شمسی با فرمت فارسی
    let persianTime = new Intl.DateTimeFormat("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).format(now);

    // نمایش در صفحه
    document.getElementById("datetime").innerHTML = `آخرین بروزرسانی :  📅 ${persianDate}&emsp;⏰ ${persianTime}`;

}