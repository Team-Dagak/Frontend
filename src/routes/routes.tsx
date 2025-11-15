import Home from '@/views/home';
import YuriByeong from '@/views/yuriByeong';


const routes = [
    {
        path : '/',
        component : Home,
        name : 'Home',
    },
    {
        path: '/yuribyeong',
        component: YuriByeong,
        name: 'YuriByeong'
    }
]

export default routes;