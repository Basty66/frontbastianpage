import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFPreview({ file, className = '' }) {
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [error, setError] = useState(false);
  const containerRef = useState(null);

  useEffect(() => {
    const updateWidth = () => {
      const w = Math.min(window.innerWidth - 48, 800);
      setContainerWidth(w);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
        <p className="text-sm text-gray-500">No se pudo previsualizar el PDF en este dispositivo.</p>
        <a
          href={typeof file === 'string' ? file : '#'}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors"
        >
          Descargar PDF
        </a>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-auto h-full ${className}`}>
      <Document
        file={file}
        onLoadSuccess={({ numPages: n }) => { setNumPages(n); setError(false); }}
        onLoadError={() => setError(true)}
        loading={
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-sm text-gray-400">Cargando vista previa...</div>
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <p className="text-sm text-gray-500">Error al cargar el PDF.</p>
            <a href={typeof file === 'string' ? file : '#'} download target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors">
              Descargar PDF
            </a>
          </div>
        }
      >
        {Array.from({ length: numPages || 0 }, (_, i) => (
          <div key={i} className="flex justify-center mb-2">
            <Page
              pageNumber={i + 1}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
