import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <section className="py-20 px-4 sm:px-6 text-center max-w-lg mx-auto">
          <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold font-heading text-red-400">!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">Algo salió mal</h2>
          <p className="text-slate-300 mb-6">Ocurrió un error inesperado. Recarga la página o intenta de nuevo.</p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.reload(); }}
            className="text-brand-cyan hover:text-cyan-300 transition-colors font-medium"
          >
            Recargar página
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
