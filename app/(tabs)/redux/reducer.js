const initialState = {
    cart: {}, 
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_TO_CART': {
        const { itemId } = action.payload;
        const currentCount = state.cart[itemId] || 0;
        return {
          ...state,
          cart: {
            ...state.cart,
            [itemId]: currentCount + 1,
          },
        };
      }
      case 'REMOVE_FROM_CART': {
        const { itemId } = action.payload;
        const currentCart = { ...state.cart };
        if (currentCart[itemId] > 1) {
          currentCart[itemId] -= 1;
        } else {
          delete currentCart[itemId];
        }
        return {
          ...state,
          cart: currentCart,
        };
      }
      case 'SET_ITEM_COUNT': {
        const { itemId, count } = action.payload;
        const currentCart = { ...state.cart };
        if (count > 0) {
          currentCart[itemId] = count;
        } else {
          delete currentCart[itemId];
        }
        return {
          ...state,
          cart: currentCart,
        };
      }
      default:
        return state;
    }
  }
  