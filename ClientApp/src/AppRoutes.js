import { Home } from "./components/Web/Home";
import { Agenda } from "./components/Web/Agenda";
import { Huren } from "./components/Web/Huren";
import { Tickets } from "./components/Web/Tickets";
import { Doneer } from "./components/Web/Doneer";
import { Overons } from "./components/Web/Overons";
import { Contact } from"./components/Web/Contact";
import { MijnLaak } from"./components/Web/MijnLaak";
import { ShowPage } from"./components/Web/ShowPage";
import { Payment } from"./components/Web/Payment";
import { Admin } from"./components/Web/Admin";
import { LoginPage } from"./components/api-authorization/LoginPage";
import { RegisterPage } from"./components/api-authorization/RegisterPage";

const AppRoutes = [
  
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Agenda',
    element: <Agenda />
  },
  {
    path: '/Tickets',
    element: <Tickets />
  },
  {
    path: '/Huren',
    element: <Huren />
  },
  {
    path: '/Doneer',
    element: <Doneer />
  },
  {
    path: '/Overons',
    element: <Overons />
  },
  {
    path: '/Contact',
    element: <Contact />
  },
  {
    path: '/MijnLaak',
    element: <MijnLaak />
  },
  {
    path: '/show/:id',
    element: <ShowPage />
  },{
    path: '/Payment',
    element: <Payment />
  },
  {
    path: '/Admin',
    element: <Admin />
  },
  {
    path: '/LoginPage',
    element: <LoginPage />
  },
  {
    path: '/RegisterPage',
    element: <RegisterPage />
  },
];

export default AppRoutes;
