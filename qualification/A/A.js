const maxProfit = prices => {
  prices = [...prices].reverse();
  const profit = [0];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < prices[i - 1]) {
      const diff = prices[i - 1] - prices[i];
      profit.push(profit[profit.length - 1] + diff);
    }
  }

  return profit[profit.length - 1];
};

module.exports = maxProfit;
