export default [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: "",
                name: "home",
                component: () => import('@/views/MainPages/HomePage.vue')
            },
            {
                path: "/basket",
                name: "basket",
                component: () => import('@/views/MainPages/BasketPage.vue')
            },
            {
                path: "/payment",
                name: "payment",
                component: () => import('@/views/MainPages/PaymentPage.vue')
            }
        ] 
    }
]