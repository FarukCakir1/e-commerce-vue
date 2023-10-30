export default [
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/layouts/AuthLayout.vue'),
        children: [
            {
                path: "register",
                name: "register",
                component: () => import('@/views/AuthPages/RegisterPage.vue')
            },
            {
                path: "login",
                name: "login",
                component: () => import('@/views/AuthPages/LoginPage.vue')
            }
        ] 
    }
]