export const state = () => ({
    token: null,
    userId: null,
    isConnected: false
})

export const mutations = {
    login(state, payload) {
        state.userId = payload.userId;
        state.token = payload.token;
        state.isConnected = true;
        this.$cookies.set('token', state.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "none",
            secure: true
        })
    },
    setToken(state, payload) {
        state.token = payload.token;
        state.isConnected = true;
        this.$cookies.set('token', state.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        })
    },
    logout(state) {
        state.userId = null;
        state.token = null;
        state.isConnected = false;
        this.$cookies.remove('token')
    }
}