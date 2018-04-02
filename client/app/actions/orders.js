export const loadOrders = (orders) => {
  return {
    type: 'LOAD_ORDERS',
    orders,
  }
}