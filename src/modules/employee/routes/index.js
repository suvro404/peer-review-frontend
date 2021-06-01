export default [
  {
    path: '/employee/:id',
    name: 'Employee',
    component:  () => import('../views/Employee'),
    props: true
  },
];
