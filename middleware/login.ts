// If the user is not authenticated
export default async function ({ app, store, redirect, axios }) {
    const token = store.getters.getToken;
    if (!token) {
        const cookieToken = app.$cookies.get('token')
        if (cookieToken) {
            store.commit('setToken', {
                token: cookieToken
            })
            const refresh = await app.$axios.post('/refresh/token')
            if (refresh.status == 200) {
                const payload = refresh.data.token.split(".")[1]
                const decodedPayload = Buffer.from(payload, 'base64').toString()
                const jsonPayload = JSON.parse(decodedPayload)
                store.commit('login', {
                    userId: jsonPayload.id,
                    token: cookieToken
                })
                return redirect("/home")
            }
        }
    }
}