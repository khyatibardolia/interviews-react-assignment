import { BrowserRouter } from 'react-router-dom';
import Layout from "./layout/Layout";
import {AppRoutes} from "./routes";

function App() {

  return (
      <BrowserRouter>
          <Layout>
              <AppRoutes />
          </Layout>
      </BrowserRouter>
  );
}

export default App;
