export const FETCH_HOME_DATA = "FETCH_HOME_DATA";

export const fetchHomeData = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_HOME_DATA,
      payload: {
        /* fetched data */
      },
    });
  };
};
