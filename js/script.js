// tomzhao.xyz - 剩余价值计算器脚本
const _0x1234 = ['1738c81ccec49dcb31842070'];
const _0x5678 = _0x1234[0];

const _0xabcd = {
    init: function() {
        flatpickr.localize(flatpickr.l10ns.zh);
        this._initDatePickers();
        this._fetchExchangeRate();
        this._setDefaultTransactionDate();
        document.getElementById('currency').addEventListener('change', this._fetchExchangeRate.bind(this));
        document.getElementById('calculateBtn').addEventListener('click', this._calculateAndSend.bind(this));
    },

    _initDatePickers: function() {
        flatpickr("#expiryDate", {
            dateFormat: "Y-m-d",
            locale: "zh",
            placeholder: "选择到期日期",
            minDate: "today",
            onChange: (selectedDates, dateStr) => {
                const transactionPicker = document.getElementById('transactionDate')._flatpickr;
                transactionPicker.set('maxDate', dateStr);
                this._validateDates();
            }
        });

        flatpickr("#transactionDate", {
            dateFormat: "Y-m-d",
            locale: "zh",
            placeholder: "选择交易日期",
            minDate: "today",
            onChange: this._validateDates.bind(this)
        });
    },

    _validateDates: function() {
        const expiryDateInput = document.getElementById('expiryDate').value;
        const transactionDateInput = document.getElementById('transactionDate').value;
        
        if (!expiryDateInput || !transactionDateInput) return;

        const expiryDate = new Date(expiryDateInput);
        const transactionDate = new Date(transactionDateInput);
        const today = new Date();

        [expiryDate, transactionDate, today].forEach(date => date.setHours(0, 0, 0, 0));

        if (transactionDate < today) {
            this._showNotification('交易日期不能早于今天', 'error');
            this._setDefaultTransactionDate();
            return;
        }

        if (expiryDate <= today) {
            this._showNotification('到期日期必须晚于今天', 'error');
            document.getElementById('expiryDate').value = '';
            return;
        }

        if (transactionDate > expiryDate) {
            this._showNotification('交易日期不能晚于到期日期', 'error');
            this._setDefaultTransactionDate();
            return;
        }

        if (expiryDate.getTime() === transactionDate.getTime()) {
            this._showNotification('交易日期不能等于到期日期', 'error');
            this._setDefaultTransactionDate();
            return;
        }

        this._updateRemainingDays();
    },

    _updateRemainingDays: function() {
        const expiryDate = document.getElementById('expiryDate').value;
        const transactionDate = document.getElementById('transactionDate').value;

        if (expiryDate && transactionDate) {
            const remainingDays = this._calculateRemainingDays(expiryDate, transactionDate);
            document.getElementById('remainingDays').textContent = remainingDays;
            
            if (remainingDays === 0) {
                this._showNotification('剩余天数为0，请检查日期设置', 'warning');
            }
        } else {
            document.getElementById('remainingDays').textContent = '0';
        }
    },

    _fetchExchangeRate: function() {
        const currency = document.getElementById('currency').value;
        fetch(`https://v6.exchangerate-api.com/v6/${_0x5678}/latest/${currency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rates.CNY;
                const utcDate = new Date(data.time_last_update_utc);
                const eastEightTime = new Date(utcDate.getTime() + (8 * 60 * 60 * 1000));
                const formattedDate = `${eastEightTime.getUTCFullYear()}/${String(eastEightTime.getUTCMonth() + 1).padStart(2, '0')}/${String(eastEightTime.getUTCDate()).padStart(2, '0')}`;
                document.getElementById('exchangeRate').value = rate.toFixed(3);
                document.getElementById('customRate').value = rate.toFixed(3);
                document.getElementById('updateDate').innerText = `更新时间: ${formattedDate}`;
            })
            .catch(error => {
                console.error('Error fetching the exchange rate:', error);
                this._showNotification('获取汇率失败，请稍后再试。', 'error');
            });
    },

    _setDefaultTransactionDate: function() {
        const today = new Date();
        const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        document.getElementById('transactionDate').value = defaultDate;
        if (document.getElementById('transactionDate')._flatpickr) {
            document.getElementById('transactionDate')._flatpickr.setDate(defaultDate);
        }
    },

    _calculateRemainingDays: function(expiryDate, transactionDate) {
        const expiry = new Date(expiryDate);
        const transaction = new Date(transactionDate);

        [expiry, transaction].forEach(date => date.setHours(0, 0, 0, 0));
        
        if (expiry <= transaction) {
            return 0;
        }

        return Math.floor((expiry.getTime() - transaction.getTime()) / (1000 * 3600 * 24));
    },

    _calculateAndSend: function() {
        const customRate = parseFloat(document.getElementById('customRate').value);
        const amount = parseFloat(document.getElementById('amount').value);
        const cycle = parseInt(document.getElementById('cycle').value);
        const expiryDate = document.getElementById('expiryDate').value;
        const transactionDate = document.getElementById('transactionDate').value;
        const bidAmount = parseFloat(document.getElementById('bidAmount').value);

        if (customRate && amount && cycle && expiryDate && transactionDate && !isNaN(bidAmount)) {
            const localAmount = (amount * customRate).toFixed(2);
            const remainingDays = this._calculateRemainingDays(expiryDate, transactionDate);
            
            const annualPrice = localAmount * (12 / cycle);
            const dailyValue = annualPrice / 365;
            const remainingValue = (dailyValue * remainingDays).toFixed(2);
            const premiumValue = (bidAmount - parseFloat(remainingValue)).toFixed(2);

            const result = {
                remainingValue,
                premiumValue,
                watermark: "tomzhao.xyz"
            };

            const data = {
                price: localAmount,
                time: remainingDays,
                customRate,
                amount,
                cycle,
                expiryDate,
                transactionDate,
                bidAmount
            };

            this._updateResults(result, data);
            this._showNotification('计算完成！', 'success');
        } else {
            this._showNotification('请填写所有字段并确保输入有效', 'error');
        }
    },

    _updateResults: function(result, data) {
        document.getElementById('resultDate').innerText = data.transactionDate;
        document.getElementById('resultForeignRate').innerText = data.customRate.toFixed(3);
        document.getElementById('resultPrice').innerText = `${data.price} 人民币/年`;
        document.getElementById('resultDays').innerText = data.time;
        document.getElementById('resultExpiry').innerText = data.expiryDate;
        document.getElementById('resultValue').innerText = `${result.remainingValue} 元`;
        document.getElementById('premiumValue').innerText = `${result.premiumValue} 元`;
        
        document.getElementById('calcResult').scrollIntoView({ behavior: 'smooth' });
    },

    _showNotification: function(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
};

document.addEventListener('DOMContentLoaded', _0xabcd.init.bind(_0xabcd));