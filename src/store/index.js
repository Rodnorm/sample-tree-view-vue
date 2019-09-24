import Vue from 'vue';
import Vuex from 'vuex';
import createdPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selected: []
    },
    mutations: {
        filter: (state, array) => {
            state.selected = array;
        }
    },
    getters: {
        getList: state => state.selected
    },
    actions: {
        filterArray: ({ commit }, array) => commit('filter', array)
    },
    plugins: [createdPersistedState()]
});
