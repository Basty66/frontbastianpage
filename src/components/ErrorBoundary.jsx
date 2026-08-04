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
          <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold font-heading text-white/60">!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">Algo salió mal</h2>
          <p className="text-[#A1A1AA] mb-6">Ocurrió un error inesperado. Recarga la página o intenta de nuevo.</p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.reload(); }}
            className="text-white/60 hover:text-white transition-colors font-medium"
          >
            Recargar página
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
