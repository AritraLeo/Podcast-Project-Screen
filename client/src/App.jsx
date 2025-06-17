
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import TranscriptEditor from './components/TranscriptEditor';
import WidgetConfiguration from './components/WidgetConfiguration';
import Settings from './components/Settings';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:projectId" element={<ProjectDetail />} />
      <Route path="/project/:projectId/transcript/:linkId" element={<TranscriptEditor />} />
      <Route path="/project/:projectId/widget-configuration" element={<WidgetConfiguration />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
