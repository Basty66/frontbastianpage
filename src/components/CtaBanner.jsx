import Reveal from './Reveal';

const CtaBanner = () => {
  const scrollToCotizador = () => {
    document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6">
      <Reveal animation="fade-up">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-blue-600/[0.08] via-blue-500/[0.04] to-transparent border border-blue-500/15 rounded-2xl p-5 sm:p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/[0.08] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-2 tracking-tight">
                ¿Te gustaron estos trabajos?
              </h3>
              <p className="text-[#A1A1AA] text-xs sm:text-sm mb-4 max-w-md mx-auto">
                Cotiza aquí y recibe un <span className="text-white font-medium">PDF con tu propuesta</span> al instante.
              </p>
              <button
                onClick={scrollToCotizador}
                className="relative overflow-hidden group bg-blue-600 text-white font-bold px-5 sm:px-6 py-2.5 rounded-xl transition-all duration-500 ease-out hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5 text-sm glow-blue-sm"
              >
                <span className="relative z-10">Cotizar mi proyecto</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CtaBanner;
