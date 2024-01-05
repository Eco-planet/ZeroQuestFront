export default {
  namespaced: true,
  state: {
    validations: {},
  },
  mutations: {
    setValidationError(state: Nullable, error: Nullable) {
      state.validations = error;
    },
  },
};
