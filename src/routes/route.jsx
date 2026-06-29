import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const DashboardPage = lazy(()=> import("../pages/dashboard/Dashboard"));
const CreateOrdersPage = lazy(()=> import("../pages/create-orders/CreateOrders"));
const InvoicePage = lazy(()=> import("../pages/invoice/Invoice"));
const SalesPage = lazy(()=> import("../pages/sales/Sales"));
const StockManagementPage = lazy(()=> import("../pages/stock-management/StockManagement"));
const Loader = lazy(() => import("../components/loader/loader"));

export const publicRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><DashboardPage></DashboardPage></Suspense>,
    },
    {
        path: '/create-order',
        element: <Suspense fallback={<Loader></Loader>}><CreateOrdersPage></CreateOrdersPage></Suspense>,
    },
    {
        path: '/invoice/:id',
        element: <Suspense fallback={<Loader></Loader>}><InvoicePage></InvoicePage></Suspense>,
    },
    {
        path: '/sales',
        element: <Suspense fallback={<Loader></Loader>}><SalesPage></SalesPage></Suspense>,
    },
    {
        path: '/stock',
        element: <Suspense fallback={<Loader></Loader>}><StockManagementPage></StockManagementPage></Suspense>,
    },
])
