export const actions = {
  nuxtServerInit({ commit }, { req, route, store, app }) {},

  nuxtClientInit({ commit }, { req, route, store, app }) {}
};


export const state = () => ({
  user_id: "",
  user_token: ""
})

export const mutations = {
  set_token(state, token) {
    state.user_token = token
  },
    set_id(state, id) {
    state.user_id = id
  },
  set_user(state, id, token) {
    state.user_id = id
    state.user_token = token
  }
}

