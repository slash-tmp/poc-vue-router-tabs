import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "./pages/Home.vue";
import Audit from "./pages/audit/Audit.vue";
import AuditPage from "./pages/audit/AuditPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/audit/:id",
    component: Audit,
    name: "AuditRoot",
    children: [
      {
        name: "AuditPage",
        path: ":page",
        component: AuditPage,
      },
    ],
  },
  {
    path: "/",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
