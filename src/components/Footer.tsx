export default function Footer() {
  return (
    <div
      className="relative h-[400px] sm:h-[600px] lg:h-[800px] max-h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+400px)] sm:h-[calc(100vh+600px)] lg:h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[400px] sm:h-[600px] lg:h-[800px] sticky top-[calc(100vh-400px)] sm:top[calc(100vh-600px)] lg:top-[calc(100vh-800px)]">
          <div className="bg-sky-950 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 h-full w-full flex flex-col justify-between">
            <div className="flex shrink-0 gap-8 sm:gap-12 lg:gap-20">
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-sky-400/60 text-xs sm:text-sm tracking-widest">Навигация</h3>
                <a
                  href="#features"
                  className="text-white hover:text-sky-300 transition-colors duration-300 text-sm sm:text-base"
                >
                  Возможности
                </a>
                <a
                  href="#cities"
                  className="text-white hover:text-sky-300 transition-colors duration-300 text-sm sm:text-base"
                >
                  Города
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="text-white hover:text-sky-300 transition-colors duration-300 text-sm sm:text-base"
                >
                  Проверить погоду
                </a>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-sky-400/60 text-xs sm:text-sm tracking-widest">Данные</h3>
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-sky-300 transition-colors duration-300 text-sm sm:text-base"
                >
                  Open-Meteo API
                </a>
                <span className="text-white/50 text-sm sm:text-base">
                  Обновление каждый час
                </span>
                <span className="text-white/50 text-sm sm:text-base">
                  Бесплатно и без регистрации
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
              <h1 className="text-[18vw] sm:text-[16vw] lg:text-[14vw] leading-[0.8] mt-4 sm:mt-6 lg:mt-10 text-white font-bold tracking-tight">
                SKYWATCH
              </h1>
              <p className="text-sky-400/50 text-sm sm:text-base">{new Date().getFullYear()} SkyWatch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
