const state = () => ({
  testAdmin: "test admin working",
  reviewDialogOpened: false,
  editDialogOpened: false,
  deleteDialogOpened: false,
  addDialogOpened: false
});

const getters = {

};

const actions = {

};

const mutations = {
  changeReviewDialogVisibility (state, status)  {
    state.reviewDialogOpened = status;
  },
  changeEditDialogVisibility (state, status)  {
    state.editDialogOpened = status;
  },
  changeDeleteDialogVisibility (state, status)  {
    state.deleteDialogOpened = status;
  },
  changeAddDialogVisibility (state, status)  {
    state.addDialogOpened = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
