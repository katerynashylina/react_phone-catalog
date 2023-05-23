import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import './utils/normalize.scss';
import { useState, useEffect } from 'react';
import { HeadNavigation } from './components/HeadNavigation/HeadNavigation';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFound } from './pages/NotFoundPage/NotFound';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { Phone } from './types/Phone';
import { getPhones } from './helpers/fetchPhones';
import { Loader } from './components/Loader/Loader';
import { FootNavigation } from './components/FootNavigation/FootNavigation';

const App = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  // const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const productsFromServer = await getPhones();

      setPhones(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="page">
      <HeadNavigation />

      {(isLoading) ? <Loader /> : (
        <>
          <div className="main">
            <Routes>
              <Route
                path="/"
                element={(
                  <HomePage
                    phones={phones}
                  />
                )}
              />
              <Route
                path="home"
                element={
                  <Navigate to="/" replace />
                }
              />

              <Route path="/phones">
                <Route index element={<PhonesPage />} />
                <Route
                  path=":productId"
                  element={<PhonesPage />}
                />
              </Route>

              <Route path="/tablets">
                <Route index element={<TabletsPage />} />
                <Route
                  path=":productId"
                  element={<TabletsPage />}
                />
              </Route>

              <Route path="/accessories">
                <Route index element={<AccessoriesPage />} />
                <Route
                  path=":productId"
                  element={<AccessoriesPage />}
                />
              </Route>

              {/* <Route path="/favourites">
              <Route index element={<PhonesPage />} />
              <Route
                path=":productId"
                element={<PhonesPage/>}
              />
            </Route>
            <Route path="/phones">
              <Route index element={<PhonesPage />} />
              <Route
                path=":productId"
                element={<PhonesPage/>}
              />
            </Route> */}

              <Route
                path="*"
                element={
                  <NotFound />
                }
              />
            </Routes>
          </div>
        </>
      )}

      <FootNavigation />
    </div>
  );
};

export default App;
