import Icon from "@/components/ui/icon";

const FEATURES = [
  {
    icon: "MapPin",
    title: "Любой город мира",
    desc: "Выбирайте из тысяч городов — от Москвы до Токио. Данные обновляются каждый час.",
  },
  {
    icon: "Zap",
    title: "Реальное время",
    desc: "Температура, ветер, влажность и осадки прямо сейчас — без задержек и устаревших данных.",
  },
  {
    icon: "BarChart2",
    title: "Почасовой прогноз",
    desc: "Планируйте день с точностью: смотрите погоду по часам на ближайшие сутки.",
  },
];

export default function Featured() {
  return (
    <div id="features" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="/images/mountain-landscape.jpg"
          alt="Горный пейзаж с облаками"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-16 lg:order-1">
        <h3 className="uppercase mb-4 text-xs tracking-widest text-neutral-500">Почему SkyWatch</h3>
        <p className="text-2xl lg:text-4xl mb-10 text-neutral-900 leading-tight font-medium">
          Погода — это не просто цифры. Это решения, которые ты принимаешь каждый день.
        </p>
        <div className="flex flex-col gap-6 mb-10">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center shrink-0">
                <Icon name={f.icon as "MapPin"} size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 mb-1">{f.title}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-black text-white border border-black px-5 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-widest"
        >
          Проверить погоду
        </button>
      </div>
    </div>
  );
}
