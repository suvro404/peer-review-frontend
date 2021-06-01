export default [
  {
    path: '/admin/:id',
    name: 'Admin',
    component:  () => import('../views/Admin'),
    props: true
  },
];
