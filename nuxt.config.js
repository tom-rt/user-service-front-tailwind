export default {
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/axios',
        'cookie-universal-nuxt'
    ],
    axios: {
        baseURL: 'http://localhost:8081/v1'
    },
    plugins: [
        '~/plugins/axios.ts'
    ],
    css: [
        { src: '~assets/css/style.css', lang: 'css' }
    ],
    build: {
        additionalExtensions: ['ts', 'tsx'],
    }
}