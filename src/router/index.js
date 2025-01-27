import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import DashBoardView from "@/views/DashBoardView.vue";
import AgendaView from "@/views/AgendaView.vue";
import ViewMeeting from "@/views/ViewMeeting.vue"
import AddMeeting from "@/views/AddMeetingView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      component: MainLayout, // MainLayout as the wrapper
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashBoardView,
        },
        {
          path: 'agenda',
          name: 'agenda',
          component: AgendaView,
        },
        {
          path: 'agenda/view-rapat',
          name: 'view-rapat',
          component: ViewMeeting,
        },
        {
          path: 'agenda/add-rapat',
          name: 'add-rapat',
          component: AddMeeting,
        },
      ],
    },
  ],
});

export default router;
