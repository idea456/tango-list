export const state = () => ({
  error: false,
  errorMessage: ""
});

export const mutations = {
  changeError(state, newError) {
    state.error = newError;
  },
  setErrorMessage(state, newErrorMessage) {
    state.errorMessage = newErrorMessage;
  }
};
