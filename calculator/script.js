document.getElementById('vpsForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const price = document.getElementById('initialPrice').value;
  const time = document.getElementById('usageTime').value;

  try {
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price, time })
    });

    if (!response.ok) {
      throw new Error('网络响应失败');
    }

    const data = await response.json();
    document.getElementById('result').innerText = `剩余价值: $${data.remainingValue}`;
  } catch (error) {
    document.getElementById('result').innerText = `错误: ${error.message}`;
  }
});
