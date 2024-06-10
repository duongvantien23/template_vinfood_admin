
export function formatCurrency(amount: number): string {
    if (amount % 1 !== 0) {
      return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  