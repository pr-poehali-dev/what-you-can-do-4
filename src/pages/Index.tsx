import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CDN = 'https://cdn.poehali.dev/projects/b8e9b107-d738-4e55-ae4c-ce87d966227a/files/';
const PAPER_IMG = CDN + 'f8463dad-7357-4a40-97ce-7898b2ffa8fa.jpg';

type Tab = 'home' | 'mods' | 'guide';

const modSites = [
  {
    name: 'ruminecraft.ru',
    desc: 'Большая коллекция проверенных модов на любой вкус — от простых текстур до глобальных модификаций.',
    icon: 'Package',
  },
  {
    name: 'Minecraft-inside',
    desc: 'Проверенный сайт с модами, картами и текстурпаками. Всё безопасно и без вирусов.',
    icon: 'Boxes',
  },
];

const guideSteps = [
  { n: 1, text: 'Найди мод, который хочешь установить.' },
  { n: 2, text: 'Скачай этот мод — сайты, где это 100% безопасно делать, я оставил во вкладке «Моды».' },
  { n: 3, text: 'Посмотри, для какой он версии — обычно над кнопкой «Скачать» написано, для какой версии Minecraft подходит мод.' },
  { n: 4, text: 'Подожди, пока мод скачается.' },
  { n: 5, text: 'Открой папку с Minecraft.' },
  { n: 6, text: 'Где эта папка? В лаунчере с именем TLauncher в правом нижнем углу есть кнопка в виде папочки — нажми на неё. В открывшейся папке найди папку mods. Если не нашёл — создай папку именно с этим названием.' },
  { n: 7, text: 'Нашёл папку, скачал мод — красава! Кидай мод в папку mods, выставляй нужную версию и запускай игру. Не забудь выставить версию с припиской forge, иначе игра не запустится.' },
];

const Star = ({ style }: { style: React.CSSProperties }) => (
  <span className="absolute rounded-full bg-primary/60 animate-twinkle" style={style} />
);

export default function Index() {
  const [tab, setTab] = useState<Tab>('home');

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'home', label: 'Главная', icon: 'Home' },
    { key: 'mods', label: 'Моды', icon: 'Boxes' },
    { key: 'guide', label: 'Учение', icon: 'GraduationCap' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* фон */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-accent/15 blur-[120px]" />
        {Array.from({ length: 30 }).map((_, i) => (
          <Star key={i} style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 4}s`,
          }} />
        ))}
      </div>

      {/* Навигация */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-12 py-5 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📦</span>
          <span className="font-display text-2xl font-semibold tracking-wide">Мир&nbsp;Модов</span>
        </div>
        <nav className="flex gap-1 bg-secondary/50 backdrop-blur rounded-full p-1 border border-border flex-wrap justify-center">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.key
                  ? 'bg-primary text-primary-foreground glow-purple'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={t.icon} size={15} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 px-6 md:px-12 pb-20">

        {/* ГЛАВНАЯ */}
        {tab === 'home' && (
          <section className="max-w-5xl mx-auto pt-8 md:pt-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="animate-fade-in">
                <p className="uppercase tracking-[0.3em] text-primary text-xs mb-6">Моды для Minecraft</p>
                <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
                  «Найди свой{' '}
                  <span className="text-gradient italic">мод</span>{' '}
                  в океане возможностей»
                </h1>
                <p className="text-muted-foreground text-lg mb-10 max-w-md">
                  Проверенные сайты с модами и понятная инструкция по установке — всё в одном месте.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setTab('mods')} className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium glow-purple hover:scale-105 transition-transform">
                    <Icon name="Boxes" size={18} />Смотреть моды
                  </button>
                  <button onClick={() => setTab('guide')} className="flex items-center gap-2 border border-border bg-secondary/50 backdrop-blur px-6 py-3 rounded-full font-medium hover:scale-105 hover:border-primary transition-all">
                    <Icon name="GraduationCap" size={18} />Как установить
                  </button>
                </div>
              </div>

              <div className="relative flex justify-center animate-float-slow">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-3xl scale-90" />
                  <div className="relative block w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-primary/30">
                    <img src={PAPER_IMG} alt="Лист А4 в море" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* МОДЫ */}
        {tab === 'mods' && (
          <section className="max-w-4xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              Проверенные <span className="text-gradient">сайты с модами</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Проверенные ресурсы для скачивания модов
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {modSites.map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                    <Icon name={s.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display text-2xl mb-2">{s.name}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* УЧЕНИЕ */}
        {tab === 'guide' && (
          <section className="max-w-3xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              Как <span className="text-gradient">установить мод</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">Пошаговая инструкция для новичков</p>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent hidden sm:block" />
              <div className="space-y-6">
                {guideSteps.map((s) => (
                  <div key={s.n} className="flex gap-6 items-start">
                    <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-semibold glow-purple">
                        {s.n}
                      </div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors flex-1">
                      <p className="text-foreground/90 leading-relaxed text-base">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 text-center text-muted-foreground text-sm pb-8">
        Сделано для тех, кто любит моды 📦
      </footer>
    </div>
  );
}
