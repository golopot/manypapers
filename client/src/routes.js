import PaperPage from './components/PaperPage'
import Home from './components/Home'
import UploadPage from './components/UploadPage'
import DashboardPage from './components/DashboardPage'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/paper/:id',
    component: PaperPage,
  },
  {
    path: '/upload',
    component: UploadPage,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
  },
]

export default routes
