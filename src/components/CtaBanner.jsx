import Reveal from './Reveal';

const CtaBanner = () => {
  const scrollToCotizador = () => {
    document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <Reveal animation="fade-up">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-blue-600/[0.08] via-blue-500/[0.04] to-transparent border border-blue-500/15 rounded-2xl sm:rounded-3xl p-6 sm:p-10 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/[0.08] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-400/[0.06] rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block text-blue-400/70 font-semibold tracking-wider text-[10px] sm:text-xs uppercase px-3 py-1 bg-blue-500/[0.08] rounded-full border border-blue-500/15 mb-4">
                Cotización instantánea
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white mb-3 tracking-tight">
                ¿Te gustaron estos trabajos?
              </h3>
              <p className="text-[#A1A1AA] text-sm sm:text-base mb-6 max-w-lg mx-auto">
                Cotiza directo aquí y recibe un <span className="text-white font-medium">PDF con tu propuesta</span> al instante en tu correo.
              </p>
              <button
                onClick={scrollToCotizador}
                className="relative overflow-hidden group bg-blue-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-all duration-500 ease-out hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5 text-sm glow-blue-sm"
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
