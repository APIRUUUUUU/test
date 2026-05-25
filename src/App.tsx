
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // ページが完全に読み込まれるまで待機
    if (document.readyState === 'complete') {
      setShowContent(true);
    } else {
      window.addEventListener('load', () => {
        setShowContent(true);
      });
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && showContent && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <BrowserRouter basename={__BASE_PATH__}>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
