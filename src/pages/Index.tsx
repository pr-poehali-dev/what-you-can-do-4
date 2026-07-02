import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

const RAT_IMG =
  'https://cdn.poehali.dev/projects/b8e9b107-d738-4e55-ae4c-ce87d966227a/files/d8b621c3-f477-4360-a461-3c6e42a3726b.jpg';

type Tab = 'home' | 'photos' | 'videos';

const photos = [
  {
    url: 'https://cdn.poehali.dev/projects/b8e9b107-d738-4e55-ae4c-ce87d966227a/files/941031fb-9fce-495a-8c0c-8671be9dc1c9.jpg',
    caption: 'Пушистая красотка',
  },
  {
    url: 'https://cdn.poehali.dev/projects/b8e9b107-d738-4e55-ae4c-ce87d966227a/files/d4c6c395-1e00-45ed-8086-8e8013c61f89.jpg',
    caption: 'Любопытный носик',
  },
  {
    url: 'https://cdn.poehali.dev/projects/b8e9b107-d738-4e55-ae4c-ce87d966227a/files/c3bce22e-fbc8-410d-bdf2-205fdd596841.jpg',
    caption: 'Вкусное лакомство',
  },
  {
    url: 'https://cdn.poehali.dev/projects/b8e9b107-d738-4e55-ae4c-ce87d966227a/files/e9fe2812-3eea-4a7b-922f-94aee2fe1c5f.jpg',
    caption: 'Сонные ушки',
  },
  {
    url: 'https://cdn.poehali.dev/projects/b8e9b107-d738-4e55-ae4c-ce87d966227a/files/ee85fff8-6121-44bd-80da-7a8579d64fec.jpg',
    caption: 'Обнимашки вдвоём',
  },
  { url: RAT_IMG, caption: 'Классический портрет' },
];

const videos = [
  {
    src: 'https://rutube.ru/play/embed/c6cc4d620b1d4338901770a44b3e82f4',
    title: 'Декоративные крысы — Rutube',
  },
  {
    src: 'https://vk.com/video_ext.php?oid=-22822305&id=456239569&hd=2',
    title: 'Милые крыски — VK Видео',
  },
  {
    src: 'https://rutube.ru/play/embed/c6cc4d620b1d4338901770a44b3e82f4',
    title: 'Уход за крысками — Rutube',
  },
];

const Star = ({ style }: { style: React.CSSProperties }) => (
  <span
    className="absolute rounded-full bg-primary/70 animate-twinkle"
    style={style}
  />
);

export default function Index() {
  const [tab, setTab] = useState<Tab>('home');
  const [squeak, setSqueak] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSqueak = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(2600, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.2);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      void e;
    }
  };

  const handleSqueak = () => {
    setSqueak(true);
    setTimeout(() => setSqueak(false), 400);
    playSqueak();
  };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'home', label: 'Главная', icon: 'Home' },
    { key: 'photos', label: 'Фото', icon: 'Image' },
    { key: 'videos', label: 'Видео', icon: 'Play' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* атмосферный фон */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-accent/20 blur-[120px]" />
        {Array.from({ length: 30 }).map((_, i) => (
          <Star
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Навигация */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐀</span>
          <span className="font-display text-2xl font-semibold tracking-wide">
            Крысиный&nbsp;Мир
          </span>
        </div>
        <nav className="flex gap-1 md:gap-2 bg-secondary/50 backdrop-blur rounded-full p-1 border border-border">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.key
                  ? 'bg-primary text-primary-foreground glow-purple'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={t.icon} size={16} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10 px-6 md:px-12 pb-20">
        {tab === 'home' && (
          <section className="max-w-5xl mx-auto pt-8 md:pt-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Цитата */}
              <div className="animate-fade-in">
                <p className="uppercase tracking-[0.3em] text-primary text-xs mb-6">
                  Декоративные крысы
                </p>
                <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
                  «Маленькие лапки{' '}
                  <span className="text-gradient italic">оставляют</span>{' '}
                  большой след в сердце»
                </h1>
                <p className="text-muted-foreground text-lg mb-10 max-w-md">
                  Умные, ласковые и невероятно обаятельные. Погрузись в
                  уютный мир декоративных крыс.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setTab('photos')}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium glow-purple hover:scale-105 transition-transform"
                  >
                    <Icon name="Image" size={18} />
                    Смотреть фото
                  </button>
                  <button
                    onClick={() => setTab('videos')}
                    className="flex items-center gap-2 border border-border bg-secondary/50 backdrop-blur px-6 py-3 rounded-full font-medium hover:scale-105 hover:border-primary transition-all"
                  >
                    <Icon name="Play" size={18} />
                    Смотреть видео
                  </button>
                </div>
              </div>

              {/* Крыска с носиком */}
              <div className="relative flex justify-center animate-float-slow">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl scale-90" />
                  <img
                    src={RAT_IMG}
                    alt="Декоративная крыса"
                    className={`relative w-72 h-72 md:w-80 md:h-80 object-cover rounded-full border-4 border-primary/30 ${
                      squeak ? 'animate-squeak' : ''
                    }`}
                  />
                  {/* кликабельный носик */}
                  <button
                    onClick={handleSqueak}
                    aria-label="Пискнуть носиком"
                    className="absolute left-1/2 top-[56%] -translate-x-1/2 w-16 h-16 rounded-full cursor-pointer group"
                  >
                    <span className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-hover:ring-primary/60 group-hover:bg-primary/15 group-active:bg-primary/40 transition-all" />
                  </button>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-secondary/80 backdrop-blur border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground">
                    👆 нажми на носик — она пискнет
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 'photos' && (
          <section className="max-w-6xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              Галерея <span className="text-gradient">крысок</span>
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Самые милые мордочки в чёрно-фиолетовых тонах
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((p, i) => (
                <figure
                  key={i}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card hover:border-primary transition-colors"
                >
                  <img
                    src={p.url}
                    alt={p.caption}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4 font-display text-lg">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {tab === 'videos' && (
          <section className="max-w-6xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              Видео с <span className="text-gradient">крысками</span>
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Забавные и трогательные моменты
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v, i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden border border-border bg-card hover:border-primary transition-colors"
                >
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={v.src}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 font-display text-lg">{v.title}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 text-center text-muted-foreground text-sm pb-8">
        Сделано с 💜 для любителей декоративных крыс
      </footer>
    </div>
  );
}