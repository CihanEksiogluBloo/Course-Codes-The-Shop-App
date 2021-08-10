import Order from "../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;


      const response = await fetch(
        `https://theshopapp-6c970-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const i in resData) {
        loadedOrders.push(
          new Order(
            i,
            resData[i].cartItems,
            resData[i].totalAmount,
            new Date(resData[i].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, payload: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const date = new Date();
    const response = await fetch(
      `https://theshopapp-6c970-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
};
