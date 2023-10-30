export default [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/layouts/AdminLayout.vue'),
        children: [
            {
                path: "",
                name: "product-managemnet",
                component: () => import('@/views/AdminPages/ProductManagement.vue')
            }
        ] 
    }
]