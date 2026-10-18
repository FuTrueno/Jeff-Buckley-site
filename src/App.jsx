import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ListeningProvider } from "./context/ListeningProvider";
import Home from "./pages/Home";
import Information from "./pages/Information";
import ListeningForm from "./pages/ListeningForm";

/**
 * Routes use hash URLs (#/information) so the built site works on GitHub Pages
 * without server-side rewrites. Swap HashRouter for BrowserRouter if you host
 * somewhere that can serve index.html for every path.
 */
export default function App() {
  return (
    <ListeningProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="information" element={<Information />} />
          <Route path="listening-form" element={<ListeningForm />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </ListeningProvider>
  );
}
