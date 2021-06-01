const state = () => ({
  testEmployee: "test employee working",
  dialogOpened: false,
});

const getters = {

};

const actions = {

};

const mutations = {
  changeDialogVisibility (state, status)  {
    state.dialogOpened = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
