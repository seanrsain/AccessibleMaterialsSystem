export const startLoading = () => {
  return {
    type: 'LOADING',
    isLoading: true,
  }
}

export const stopLoading = () => {
  return {
    type: 'LOADING',
    isLoading: false,
  }
}