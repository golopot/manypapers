import PaperPage from './components/PaperPage'
import Home from './components/Home'
import UploadPage from './components/UploadPage'

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
]

export default routes
