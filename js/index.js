const apiKey = 'You_ApiKey';

function fetchExchangeRate() {
    console.log(1);
    const currency = document.getElementById('currency').value;
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates.CNY;

            // 将时间转换为东八区时间
            const utcDate = new Date(data.time_last_update_utc);
            const eastEightTime = new Date(utcDate.getTime() + (8 * 60 * 60 * 1000));
            const formattedDate = `${eastEightTime.getUTCFullYear()}/${String(eastEightTime.getUTCMonth() + 1).padStart(2, '0')}/${String(eastEightTime.getUTCDate()).padStart(2, '0')}`;

            document.getElementById('exchangeRate').value = rate;
            document.getElementById('customRate').value = rate; // 初始自定汇率跟随API变化
            document.getElementById('updateDate').innerText = formattedDate;
        })
        .catch(error => {
            console.error('Error fetching the exchange rate:', error);
        });
}

function setDefaultTransactionDate() {
    const currentDate = new Date();
    // 将时间转换为东八区时间
    const eastEightTime = new Date(currentDate.getTime() + (8 * 60 * 60 * 1000));
    const year = eastEightTime.getUTCFullYear();
    const month = String(eastEightTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(eastEightTime.getUTCDate()).padStart(2, '0');
    document.getElementById('transactionDate').value = `${year}-${month}-${day}`;
}

function generateResult() {
    var exchangeRate = document.getElementById('exchangeRate').value;
    var customRate = document.getElementById('customRate').value;
    var amount = document.getElementById('amount').value;
    var cycle = document.getElementById('cycle').value;
    var expiryDate = document.getElementById('expiryDate').value;
    var transactionDate = document.getElementById('transactionDate').value;
    var bidAmount = document.getElementById('bidAmount').value;

    if (customRate && amount && cycle && expiryDate && transactionDate) {
        var localAmount = (amount * customRate).toFixed(2);

        var currentDate = new Date();
        var expiry = new Date(expiryDate);
        var timeDiff = expiry.getTime() - currentDate.getTime();
        var remainingDays = Math.max(Math.ceil(timeDiff / (1000 * 3600 * 24)), 0); // 剩余天数，不允许负值
        var remainingValue = (localAmount * remainingDays / 365).toFixed(3);

        var premiumValue = (bidAmount - remainingValue).toFixed(3);

        // 更新页面元素显示结果
        document.getElementById('resultDate').innerText = transactionDate;
        document.getElementById('resultForeignRate').innerText = customRate;
        document.getElementById('resultPrice').innerText = localAmount + " 人民币/年";
        document.getElementById('resultDays').innerText = remainingDays;
        document.getElementById('resultExpiry').innerText = expiryDate;
        document.getElementById('resultValue').innerText = remainingValue + " 元";
        document.getElementById('premiumValue').innerText = premiumValue + " 元";

        document.getElementById('calcResult').style.display = 'block'; // 显示结果框
    } else {
        document.getElementById('calcResult').style.display = 'block';
        document.getElementById('calcResult').innerText = '请填写所有字段';
    }
}

fetchExchangeRate();  // 初始化时获取默认币种的汇率
setDefaultTransactionDate(); // 初始化时设置交易日期