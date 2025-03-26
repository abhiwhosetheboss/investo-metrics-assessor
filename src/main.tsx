
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

try {
  // Ensure we have a root element
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Failed to find root element");
  }

  // Create root and render app
  const root = createRoot(rootElement);
  root.render(<App />);

  console.log("App successfully mounted");
} catch (error) {
  console.error("Failed to initialize application:", error);
  // Show a fallback error UI if possible
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Application Error</h2>
        <p>Sorry, the application failed to load. Please try refreshing the page.</p>
        <pre style="background: #f1f1f1; padding: 10px; border-radius: 4px; text-align: left; margin-top: 20px; overflow: auto;">
          ${error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </div>
    `;
  }
}
