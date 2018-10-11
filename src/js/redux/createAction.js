const createAction = (name, payload = null) => {
  return {
    type: name,
    payload
  };
}

export default createAction;
