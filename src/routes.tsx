import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ArticlePage } from './pages/ArticlePage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { ArticleList } from './pages/dashboard/ArticleList';
import { NewArticlePage } from './pages/dashboard/NewArticlePage';
import { EditArticlePage } from './pages/dashboard/EditArticlePage';
import { DraftList } from './pages/dashboard/DraftList';
import { CommentList } from './pages/dashboard/CommentList';
import { DashboardSettings } from './pages/dashboard/DashboardSettings';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { UsersPage } from './pages/admin/UsersPage';
import { ArticlesPage } from './pages/admin/ArticlesPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/articles/:slug" element={<ArticlePage />} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/new" element={<NewArticlePage />} />
        <Route path="articles/:id/edit" element={<EditArticlePage />} />
        <Route path="drafts" element={<DraftList />} />
        <Route path="comments" element={<CommentList />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/articles"
        element={
          <AdminRoute>
            <ArticlesPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <CategoriesPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}