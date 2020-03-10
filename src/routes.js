import Home from "./pages/Home";
import ForDrivers from "./pages/ForDrivers";

export const routes = [
  // --------------------------- isNavBar
  {
    id: 1,
    isNavBar: true,
    isExact: true,
    path: "/",
    name: "Metra",
    className: "logo",
    component: Home
  },
  {
    id: 2,
    isNavBar: true,
    isExact: true,
    path: "/",
    name: "Для пользователей",
    className: "nav-link",
    component: Home
  },
  {
    id: 3,
    isNavBar: true,
    isExact: true,
    path: "/for-drivers",
    name: "Для водителей",
    className: "nav-link",
    component: ForDrivers
  }
  // {
  // 	id: 4,
  // 	isNavBar: true,
  // 	isExact: true,
  // 	path: "/news",
  // 	name: "Новости",
  // 	className: "nav-link",
  // 	component: News
  // },
  // {
  // 	id: 5,
  // 	isNavBar: true,
  // 	isExact: true,
  // 	path: "/contacts",
  // 	name: "Контакты",
  // 	className: "nav-link",
  // 	component: Contacts
  // }
];
