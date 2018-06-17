import PaperPage from './components/PaperPage'
import Home from './components/Home'
import UploadPage from './components/UploadPage'
import DashboardPage from './components/DashboardPage'
import EditPage from './components/EditPage'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/edit/:id',
    component: EditPage,
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
