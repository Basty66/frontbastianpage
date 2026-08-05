import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const DarkSkeleton = ({ children, ...props }) => (
  <SkeletonTheme baseColor="rgba(255,255,255,0.04)" highlightColor="rgba(255,255,255,0.08)" borderRadius="0.75rem" duration={1.5}>
    {children || <Skeleton {...props} />}
  </SkeletonTheme>
);

export function HeroSkeleton() {
  return (
    <DarkSkeleton>
      <section className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-between py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto gap-8 sm:gap-12">
        <div className="flex-1 space-y-5 sm:space-y-6 text-center lg:text-left">
          <Skeleton width={180} height={28} className="mx-auto lg:mx-0" />
          <div className="space-y-3">
            <Skeleton width="100%" height={48} />
            <Skeleton width="85%" height={48} />
          </div>
          <Skeleton width="90%" height={24} count={2} />
          <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start pt-3">
            <Skeleton width={180} height={48} borderRadius="0.75rem" />
            <Skeleton width={160} height={48} borderRadius="0.75rem" />
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
            <Skeleton width={80} height={50} />
            <Skeleton width={80} height={50} />
            <Skeleton width={80} height={50} />
          </div>
        </div>
        <div className="flex-1 w-full max-w-xl">
          <Skeleton height={380} borderRadius="1rem" />
        </div>
      </section>
    </DarkSkeleton>
  );
}

export function ServicesSkeleton() {
  return (
    <DarkSkeleton>
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-3">
            <Skeleton width="60%" height={40} className="mx-auto" />
            <Skeleton width="40%" height={20} className="mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton width={48} height={48} borderRadius="0.75rem" />
                  <Skeleton width="60%" height={20} />
                </div>
                <Skeleton count={2} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </DarkSkeleton>
  );
}

export function TestimoniosSkeleton() {
  return (
    <DarkSkeleton>
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-3">
            <Skeleton width="50%" height={40} className="mx-auto" />
            <Skeleton width="45%" height={20} className="mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} width={16} height={16} borderRadius="50%" />
                  ))}
                </div>
                <Skeleton count={3} />
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                  <Skeleton width={40} height={40} borderRadius="50%" />
                  <div className="space-y-1">
                    <Skeleton width={120} height={14} />
                    <Skeleton width={80} height={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DarkSkeleton>
  );
}

export function CotizadorSkeleton() {
  return (
    <DarkSkeleton>
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <Skeleton width="60%" height={48} className="mx-auto" />
          <Skeleton width="40%" height={20} className="mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl p-6 space-y-4">
              <Skeleton width="50%" height={20} />
              <Skeleton width="70%" height={32} />
              <Skeleton count={3} />
              <Skeleton width="100%" height={40} borderRadius="0.75rem" />
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 rounded-2xl p-8 space-y-6">
            <Skeleton width="40%" height={24} />
            <Skeleton width="100%" height={48} />
            <Skeleton width="100%" height={48} />
            <Skeleton width="60%" height={20} />
          </div>
          <div className="lg:col-span-2 rounded-2xl p-8 space-y-4">
            <Skeleton width="50%" height={28} />
            <Skeleton count={2} />
            <Skeleton width="100%" height={48} borderRadius="0.75rem" />
          </div>
        </div>
      </section>
    </DarkSkeleton>
  );
}

export function PortfolioSkeleton() {
  return (
    <DarkSkeleton>
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <Skeleton width="45%" height={40} className="mx-auto" />
            <Skeleton width="35%" height={20} className="mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton height={200} />
                <div className="p-4 space-y-2">
                  <Skeleton width="60%" height={18} />
                  <Skeleton width="40%" height={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DarkSkeleton>
  );
}

export function BlogSkeleton() {
  return (
    <DarkSkeleton>
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <Skeleton width="35%" height={40} className="mx-auto" />
            <Skeleton width="50%" height={20} className="mx-auto" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl">
                <Skeleton width={120} height={100} borderRadius="1rem" className="flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton width="70%" height={20} />
                  <Skeleton count={2} />
                  <Skeleton width="30%" height={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DarkSkeleton>
  );
}
