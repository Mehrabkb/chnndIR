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
    BTC: "Bitcoin",
    ETH: "Ethereum",
    USDT: "Tether",
    XRP: "XRP",
    BNB: "BNB",
    SOL: "Solana",
    USDC: "USD Coin",
    TRX: "TRON",
    DOGE: "Dogecoin",
    ADA: "Cardano",
    LINK: "Chainlink",
    XLM: "Stellar",
    AVAX: "Avalanche",
    SHIB: "Shiba Inu",
    LTC: "Litecoin",
    DOT: "Polkadot",
    UNI: "Uniswap",
    ATOM: "Cosmos",
    FIL: "Filecoin",


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
            //result = JSON.parse(result);
            // console.log("ajax started")
            //console.log(result.gold);
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

            let currencies1 = result.currency;
            let currencyTableBody = $("#currencyTableBody");

            // پیدا کردن قیمت دلار یک بار بیرون حلقه
            let usd = currencies1.find(c => c.symbol === "USD");
            let usdPrice = usd ? usd.price : 1;

            currencies1.slice(0, 10).forEach(element => {
                if (element.symbol === "USDT_IRT") return;

                let percent_color = element.change_percent >= 0 ? "red" : "green";
                let percent_class = element.change_percent >= 0 ? "percent_inc" : "percent_dec";

                let span = `<span class="${flagMap[element.symbol]} rounded-circle h4 border"></span>`;
                let valueInUSD = (element.price / usdPrice).toFixed(2);

                currencyTableBody.append(`
        <tr>
            <td class="align-middle text-center">${span}</td>
            <td class="align-middle">
                <h6>${element.name} (${element.symbol})</h6>
            </td>
            <td class="align-middle">
                <h4 class="price number-separator">
                    ${addThousandSeparator(element.price)}
                </h4>
                <h5 class="${percent_class}" style="color:${percent_color}">
                    ${element.change_percent}%
                </h5>
            </td>
            <td class="align-middle">
               USD ${addThousandSeparator(valueInUSD)}
            </td>
        </tr>
    `);
            });




            // اطلاعات ارزهای دیجیتال
            let cryptoData = result.cryptocurrency;
            let container = $("#cryptoContainer");
            let spotlight = $("#cryptoSpotlight");

            // ۱. جدا کردن BTC و ETH و حذف آن‌ها از لیست اصلی
            let btc = cryptoData.find(c => c.symbol === "BTC");
            let eth = cryptoData.find(c => c.symbol === "ETH");
            let otherCoins = cryptoData.filter(coin => coin.symbol !== "BTC" && coin.symbol !== "ETH");

            // ۲. جدا کردن ۲ ارز آخر برای ستون سمت چپ (مثلاً کوزموس و فایل‌کوین)
            let leftColumnExtras = otherCoins.slice(-2);
            let mainRightCoins = otherCoins.slice(0, -2);

            // ۳. رندر محتوای ستون سمت چپ
            spotlight.html(`
    <div class="d-flex flex-column h-100">
        <div class="spotlight-inner p-4 rounded-4 shadow-sm text-white mb-3" 
             style="background: #1a1a1a; height: calc(60% - 10px); min-height: 280px;">
            <div class="d-flex flex-column justify-content-center h-100 text-end">
                
                <div class="pb-2 border-bottom border-secondary border-opacity-25 mb-5">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="badge bg-warning text-dark px-2" style="font-size:0.6rem;">BTC</span>
                        <div class="d-flex align-items-center gap-2">
                             <span class="mx-1" style="font-size:1.1rem; font-weight: 500;">بیت‌کوین</span> 
                             <img src="images/crypto/BTC.svg" width="25">
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center gap-2 mt-3">
                    <div class="${btc.change_percent >= 0 ? 'text-danger' : 'text-success'} small" style="font-size:1rem;">${btc.change_percent}%</div>
                    <div class=" fs-5">${addThousandSeparator(btc.price)}</div>
                    </div>
                </div>
                
                <div class="my-6">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="badge bg-info text-dark px-2" style="font-size:0.6rem;">ETH</span>
                        <div class="d-flex align-items-center gap-2">
                             <span class="mx-1" style="font-size:1.1rem; font-weight: 500;">اتریوم</span> 
                             <img src="images/crypto/ETH.svg" width="25">
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center gap-2 mt-3">
                        <div class="${eth.change_percent >= 0 ? 'text-danger' : 'text-success'} small" style="font-size:1rem;">${eth.change_percent}%</div>                    
                        <div class=" fs-5">${addThousandSeparator(eth.price)}</div>
                    </div>

                </div>
                

            </div>
        </div>

        <div id="leftColumnCards" class="d-flex flex-column gap-3" style="height: 40%;"></div>
    </div>
`);

            // ۴. رندر کردن کارت‌های زیر کادر مشکی
            leftColumnExtras.forEach(coin => {
                $("#leftColumnCards").append(createSingleCard(coin));
            });

            // ۵. رندر کردن کارت‌های سمت راست
            container.empty();
            mainRightCoins.forEach(coin => {
                container.append(`<div class="col-12 col-md-6 col-xl-4">${createSingleCard(coin)}</div>`);
            });

            // تابع کمکی برای ساخت کارت (دقیقاً مشابه هم)
            function createSingleCard(coin) {
                let color = coin.change_percent >= 0 ? "red" : "green";
                return `
        <div class="crypto-mini-card p-3 rounded-4 shadow-sm border bg-white h-100 d-flex flex-column justify-content-between">
            <div class="d-flex align-items-center w-100 mb-2">
                <img src="images/crypto/${coin.symbol}.svg" width="32" class="me-2">
                
                <div class="flex-grow-1 text-end">
                    <div class="text-dark" style="font-size: 1.1rem; line-height: 1.1;">${coin.name_en}</div>
                    <div class="text-muted fs-6 mt-1" style="font-size: 0.75rem;">${coin.name}</div>
                </div>
            </div>
            
            <div class="d-flex justify-content-between align-items-end w-100 mt-2">
                <div class="text-dark" style="font-size: 1.1rem;">${addThousandSeparator(coin.price)}</div>
                <div  style="color: ${color}; font-size: 0.9rem;">${coin.change_percent}%</div>
            </div>
        </div>
    `;
            }

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

    const wpUrl = 'https://blog.chnnd.ir/wp-json/wp/v2/posts?per_page=4&_embed';

    function fetchLatestPosts() {
        $.ajax({
            url: wpUrl,
            method: 'GET',
            success: function (posts) {
                const $container = $('.blog-widget-container');

                // نگه داشتن هدر و حذف کارت‌های استاتیک قدیمی
                const $header = $container.find('.d-flex.justify-content-between').first();
                $container.empty().append($header);

                $.each(posts, function (index, post) {
                    // چک کردن وجود تصویر شاخص
                    let imageUrl = 'https://via.placeholder.com/90'; // تصویر پیش‌فرض
                    if (post._embedded && post._embedded['wp:featuredmedia']) {
                        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
                    }

                    // تمیز کردن متن خلاصه (حذف تگ‌های HTML اضافی)
                    const excerpt = post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 80) + '...';

                    // تبدیل تاریخ به شمسی (با استفاده از متد داخلی مرورگر)
                    const postDate = new Date(post.date).toLocaleDateString('fa-IR');
                    const postHtml = `
                        <a href="${post.link}" class="blog-card d-flex justify-content-between align-items-center p-3 mb-3 shadow-sm border rounded bg-white text-decoration-none" style="display: flex !important;">
                            <div class="blog-content text-end">
                                <h4 class="fs-6 fw-bold mb-2" style="color: #222;">${post.title.rendered}</h4>
                                <p class="text-muted small mb-2" style="line-height: 1.6;">${excerpt}</p>
                                <div class="text-secondary" style="font-size: 0.7rem;">${postDate}</div>
                            </div>
                            <div class="blog-image ms-3">
                                <img src="${imageUrl}" alt="${post.title.rendered}" class="rounded" style="width: 90px; height: 90px; object-fit: cover;">
                            </div>
                        </a>
                    `;

                    $container.append(postHtml);
                });
            },
            error: function (err) {
                console.error('خطا در ارتباط با وردپرس:', err);
            }
        });
    }
    fetchLatestPosts();

    $(".radio-btn").on("click", function () {
        $(".radio-inner").toggleClass("active");
        $("body").toggleClass("dark");
    });

});
function change(item) {
    const buttons = document.querySelectorAll('ion-icon');
    buttons.forEach(function (obj) {
        obj.classList.remove("active");
    });
    item.classList.add("active");
}


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