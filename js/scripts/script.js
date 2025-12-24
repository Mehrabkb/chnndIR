// <<<<<<< HEAD:js/scripts/script.js
const flagMap = {
    "USD": "fi fi-us", // دلار آمریکا
    'EUR': "fi fi-eu", // یورو (اتحادیه اروپا)
    'AED': "fi fi-ae", // درهم امارات
    'GBP': "fi fi-gb", // پوند بریتانیا
    'JPY': "fi fi-jp", // ین ژاپن
    'KWD': "fi fi-kw", // دینار کویت
    'AUD': "fi fi-au", // دلار استرالیا
    'CAD': "fi fi-ca", // دلار کانادا
    'CNY': "fi fi-cn", // یوآن چین
    'TRY': "fi fi-tr", // لیر ترکیه
    'SAR': "fi fi-sa", // ریال عربستان
    'CHF': "fi fi-ch", // فرانک سوئیس
    'INR': "fi fi-in", // روپیه هند
    'PKR': "fi fi-pk", // روپیه پاکستان
    'IQD': "fi fi-iq", // دینار عراق
    'SYP': "fi fi-sy", // لیر سوریه
    'SEK': "fi fi-se", // کرون سوئد
    'QAR': "fi fi-qa", // ریال قطر
    'OMR': "fi fi-om", // ریال عمان
    'BHD': "fi fi-bh", // دینار بحرین
    'AFN': "fi fi-af", // افغانی افغانستان
    'MYR': "fi fi-my", // رینگیت مالزی
    'THB': "fi fi-th", // بات تایلند
    'RUB': "fi fi-ru", // روبل روسیه
    'AZN': "fi fi-az", // منات آذربایجان
    'AMD': "fi fi-am", // درام ارمنستان
    'GEL': "fi fi-ge", // لاری گرجستان
};

$(function () {
    // Notification.requestPermission().then(p => {
    //     if (p === "granted") {
    //         new Notification("تست نوتیفیکیشن", {
    //             body: "اگر اینو دیدی یعنی کار می‌کنه ✅",
    //             icon: "https://via.placeholder.com/128"
    //         });
    //     } else {
    //         console.log("اجازه داده نشد ❌");
    //     }
    // });
    $.ajax({
        url: "https://chnnd.ir/currency_call/getdata.php",
        method: 'GET',
        success: function (result) {
            result = JSON.parse(result);
            // console.log(result.gold);
            let golds = result.gold;
            let coinContainer = $("#coinContainer");
            let gold18Container = $("#18kGold");
            let ounceContainer = $("#ounceContainer");
            let meltedGold = $("#meltedGold");

            // اطلاعات طلا
            golds.forEach(element => {
                let percent_color = element.change_percent >= 0 ? "red" : "green";
                let percent_class = element.change_percent >= 0 ? "percent_inc" : "percent_dec";

                switch (element.symbol) {
                    case 'IR_COIN_EMAMI': {
                        coinContainer.append(`
                        <h3 class="mb-4 fw-bold fs-5">${element.name}</h3>
                        <span class="priceSymbol mb-2 fs-5">${addThousandSeparator(element.price)}</span>
                        <span class="pricePercent ${percent_class} fs-6" style="color: ${percent_color};">${element.change_percent}%</span>
                    `);
                        break;
                    }
                    case 'IR_GOLD_18K': {
                        gold18Container.append(`
                        <h3 class="mb-4 fw-bold fs-5">${element.name}</h3>
                        <span class="priceSymbol mb-2 fs-5">${addThousandSeparator(element.price)}</span>
                        <span class="pricePercent ${percent_class} fs-6" style="color: ${percent_color};">${element.change_percent}%</span>
                    `);
                        break;
                    }
                    case 'XAUUSD': {
                        ounceContainer.append(`
                        <h3 class="mb-4 fw-bold fs-5">${element.name}</h3>
                        <span class="priceSymbol mb-2 fs-5">${addThousandSeparator(element.price)}</span>
                        <span class="pricePercent ${percent_class} fs-6" style="color: ${percent_color};">${element.change_percent}%</span>
                    `);
                        break;
                    }
                    case 'IR_GOLD_MELTED': {
                        meltedGold.append(`
                        <h3 class="mb-4 fw-bold fs-5">${element.name}</h3>
                        <span class="priceSymbol mb-2 fs-5">${addThousandSeparator(element.price)}</span>
                        <span class="pricePercent ${percent_class} fs-6" style="color: ${percent_color};">${element.change_percent}%</span>
                    `);
                        break;
                    }
                }
            });

            // اطلاعات ارزها
            let currencies = result.currency;
            let currencyContainer = $("#currencyContainer");

            currencies.forEach(element => {
                let percent_color = element.change_percent >= 0 ? "red" : "green";
                let percent_class = element.change_percent >= 0 ? "percent_inc" : "percent_dec";
                let span = element.symbol != "USDT_IRT" ?
                    `<span class="${flagMap[element.symbol]} rounded-circle h3 border"></span>` :
                    `<img src='images/tether.webp' class='rounded-circle' width='50'>`;

                currencyContainer.append(`
                <div class="col-11 col-md-2 border p-3 rounded m-3">
                    <div class="row align-items-center">
                        <div class="col-3">${span}</div>
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

            // اطلاعات ارزهای دیجیتال
            let cryptocurrencies = result.cryptocurrency;
            let cryptoContainer = $("#cryptoContainer");

            
            console.log(result.cryptocurrency)

            cryptocurrencies.forEach(element => {
                let percent_color = element.change_percent >= 0 ? "red" : "green";
                let percent_class = element.change_percent >= 0 ? "percent_inc" : "percent_dec";
                let logoSrc = `images/crypto/${element.symbol}.svg`;

                let span = element.symbol != "USDT" ?
                    `<span class="${flagMap[element.symbol]} rounded-circle h3 border"></span>` :
                    `<img src='images/tether.webp' class='rounded-circle' width='50'>`;

                cryptoContainer.append(`
                <div class="col-11 col-md-2 border p-3 rounded m-3">
                    <div class="row align-items-center">
                        <div class="col-3">
                         <img src="${logoSrc}" class="rounded-circle" width="50" alt="${element.name_en} logo" style="width:30px;"></div>
                        <div class="col-9 text-end">
                            <h4 class="h6 text-end">${element.name_en}</h4>
                            <span class="text-end" style="font-size:0.6rem;">${element.name}</span>
                        </div>
                        <div class="col-12 mt-3">
                            <h5 class="${percent_class}" style="color:${percent_color}">${element.change_percent}%</h5>
                            <h2 class="price number-separator">${addThousandSeparator(element.price)}</h2>
                        </div>
                    </div>
                </div>
            `);
            });
        },
        error: function (xhr, status, error) {
            console.error("خطا در AJAX:", {
                status: xhr.status,
                statusText: xhr.statusText,
                error: error,
                response: xhr.responseText
            });

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
    });

    $(".radio-btn").on("click", function () {
        $(".radio-inner").toggleClass("active");
        $("body").toggleClass("dark");
    })

    sendCodeBtnClicked();
});

function addThousandSeparator(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Service Worker registered"));
}




window.onerror = function (message, source, lineno, colno, error) {
    document.body.innerHTML += `<p style="color:red">JS Error: ${message} at ${source}:${lineno}</p>`;
};

function sendCodeBtnClicked() {

    $(document).ready(function () {
        $("#getCodeBtn").on("click", function () {
            let phone = $("#phone").val();
            let regex = /^09[0-9]{9}$/; // باید با 09 شروع بشه و 11 رقم باشه

            if (!regex.test(phone)) {
                // نمایش خطا
                $("#phone").addClass("input-error");
                $("#phoneError").fadeIn();

                // بعد از 1 ثانیه کلاس لرزش حذف بشه تا دوباره کار کنه
                setTimeout(() => {
                    $("#phone").removeClass("input-error");
                }, 1000);
            } else {
                $("#phoneError").fadeOut();

                // نمایش اینپوت کد فعالسازی
                $("#activationCodeGroup").removeClass("d-none").hide().slideDown(500);

                // شماره readonly بشه
                $("#phone").prop("readonly", true);

                $("#loginBtn").removeClass("d-none").hide().fadeIn(500);

                // دکمه غیرفعال بشه
                $(this).prop("disabled", true);
            }
        });
    });

}