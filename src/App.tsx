import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import VideoReview from './VideoReview';

function Home() {
  return (
    <div className="min-h-screen bg-base text-white flex items-center justify-center font-body">
      <h1 className="text-4xl font-bold font-heading">Loom Initialized</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/v/:share_token" element={<VideoReview />} />
      </Routes>
    </BrowserRouter>
  );
}
