export const loadOrders = (orders) => {
  return {
    type: 'LOAD_ORDERS',
    orders,
  }
}

export const addOrder = (order) => {
  return {
    type: 'ADD_ORDER',
    order,
  }
}