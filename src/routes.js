import Home from "./pages/Home";
import About from "./pages/About";

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
    path: "/about",
    name: "О Нас",
    className: "nav-link",
    component: About
  }
  // {
  // 	id: 3,
  // 	isNavBar: true,
  // 	isExact: true,
  // 	path: "/delivery",
  // 	name: "Доставка",
  // 	className: "nav-link",
  // 	component: Delivery
  // },
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
