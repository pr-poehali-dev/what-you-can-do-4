import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

const CDN = 'https://cdn.poehali.dev/projects/b8e9b107-d738-4e55-ae4c-ce87d966227a/files/';
const RAT_IMG = CDN + 'd8b621c3-f477-4360-a461-3c6e42a3726b.jpg';

type Tab = 'home' | 'photos' | 'videos' | 'history' | 'games' | 'facts';

const photos = [
  { url: CDN + 'd8b621c3-f477-4360-a461-3c6e42a3726b.jpg', caption: 'Задумчивый портрет' },
  { url: CDN + '941031fb-9fce-495a-8c0c-8671be9dc1c9.jpg', caption: 'Пушистая красотка' },
  { url: CDN + 'd4c6c395-1e00-45ed-8086-8e8013c61f89.jpg', caption: 'Любопытный носик' },
  { url: CDN + 'c3bce22e-fbc8-410d-bdf2-205fdd596841.jpg', caption: 'Вкусное лакомство' },
  { url: CDN + 'e9fe2812-3eea-4a7b-922f-94aee2fe1c5f.jpg', caption: 'Сонные ушки' },
  { url: CDN + 'ee85fff8-6121-44bd-80da-7a8579d64fec.jpg', caption: 'Обнимашки вдвоём' },
  { url: CDN + 'c17c441a-c720-4ce7-9586-59d407264c6b.jpg', caption: 'Чёрный капюшон' },
  { url: CDN + '312dc115-5ae8-4240-8a14-5307fbee513e.jpg', caption: 'Любопытный стоячок' },
  { url: CDN + '49f55591-179b-4e1b-9392-3b8d22ea47a1.jpg', caption: 'Сладкий сон' },
];

const videos = [
  { src: 'https://vk.com/video_ext.php?oid=-237415732&id=456239017&hd=2', title: 'Декоративные крыски' },
  { src: 'https://vk.com/video_ext.php?oid=-237415732&id=456239020&hd=2', title: 'Крысиный уют' },
  { src: 'https://vk.com/video_ext.php?oid=-188817799&id=456239029&hd=2', title: 'Милые крысята' },
  { src: 'https://vk.com/video_ext.php?oid=-49385995&id=456239554&hd=2', title: 'Игры крысок' },
];

const historyParagraphs = [
  'Почему-то у людей бытует мнение, что предок декоративной мыши — мышь белая — была выведена исключительно для нужд лаборатории. На самом деле, в лабораторию эти мышки попали гораздо позднее (примерно в 20-ые годы прошлого века).',
  'Кто привёз этих мышек в Европу, точно не известно. А вот родина белой мыши — Япония и Китай. Первые белые мыши появились более 2000 лет назад, их содержали в качестве домашних питомцев, а в некоторых странах считали священным животным.',
  'Кому-то это покажется странным — вредный, казалось бы, грызун, вызывающий неприязнь у многих людей, и вдруг — украшение дома и священное животное. Современная наука давно доказала, что не существует вредных животных, и само применение термина «вредный» безграмотно по отношению к какому-либо биологическому виду.',
  'Народы Востока хорошо знали о вреде, причиняемом домашнему хозяйству полевыми и домовыми мышами. Однако они оценили мышь не как вредителя, а как животное в целом. Именно китайцы первыми обратили внимание на такие качества мышей, как: чистоплотность, дружелюбный нрав, неприхотливость и почти уникальную приспосабливаемость.',
  'Одним из отражений культа мыши у многих народов является календарь. Ведь именно в восточном календаре первый год двенадцатилетнего цикла посвящён мыши. А сколько легенд и сказок есть про мышей... И в большинстве из них мышка показывается именно с положительной стороны: в российских сказках мышка выступает в качестве маленького помощника положительных героев, в китайских и индийских — показаны её ум и смекалистость.',
  'В результате длительной селекции мыши утратили большинство отрицательных черт своих диких предков. Мышь декоративная отличается от дикой, как болонка от волка. Современная декоративная мышь завоевала Европу наравне с другими домашними питомцами. Вы только посмотрите, какие они красивые! А если взять мышку в руки и погладить — она расправит ушки и прикроет глазки от удовольствия. И вы сразу поймёте, что бояться тут абсолютно некого.',
];

const facts = [
  { icon: '🤍', text: 'Мыши-альбиносы всегда отличаются миролюбивым характером.' },
  { icon: '💪', text: 'Грызуны выживают в самых сложных условиях.' },
  { icon: '📖', text: 'Слово «мышь» произошло от индоевропейского «муш» — «вор».' },
  { icon: '🌍', text: 'На Земле мышей больше, чем других млекопитающих.' },
  { icon: '🔄', text: 'Плодовитые грызуны имеют огромное количество природных врагов, но легко восстанавливают популяцию.' },
  { icon: '🐾', text: 'Под волосяным покровом на хвосте у мышей расположены чешуйки.' },
  { icon: '📏', text: 'Самая маленькая мышь имеет длину 50 мм, самая большая — 480 мм.' },
  { icon: '🦷', text: 'Зубы грызунов растут до смерти со скоростью 1 мм в сутки — мышам нужно постоянно стачивать их о древесину.' },
  { icon: '⚔️', text: 'Крысы и мыши — природные враги и разные животные. Крысы поедают мышей, мыши уничтожают крысиные выводки.' },
  { icon: '🔢', text: 'Сегодня в мире известно примерно 130 подвидов мышей.' },
  { icon: '🏛️', text: 'В Древнем Риме крыс принимали за «больших мышей».' },
  { icon: '🔬', text: 'Белые мыши — участники практически всех экспериментов косметологов, фармацевтов и пр.' },
  { icon: '🏠', text: 'В условиях неволи грызуны проживают в 5 раз дольше.' },
  { icon: '👶', text: 'В год домашняя мышь может принести до 14 приплодов по 12 особей.' },
  { icon: '🤸', text: 'Желтогорлые мыши прыгают на расстояние до 100 см в длину.' },
  { icon: '✨', text: 'Сатиновые мыши — декоративный вид, выведенный искусственно.' },
  { icon: '🧬', text: 'Чтобы получить потомство сатиновых мышей, скрещивают особей с особым сатиновым геномом. Если генома нет хотя бы у одной особи — получится обычная домашняя мышь.' },
  { icon: '😴', text: 'Мыши спят и бодрствуют периодами — проявляют активность до 15–20 раз в сутки от 25 минут до 1,5 часов.' },
  { icon: '🦅', text: 'Домашние мыши — отличный корм для птиц, рептилий, пауков.' },
  { icon: '🏃', text: 'Иглистые мыши бегают со скоростью до 13 км/ч и умеют плавать.' },
  { icon: '🧠', text: 'Землеройки — общепризнанные домашние зверьки. Ласковые грызуны отличаются острым умом.' },
  { icon: '🦎', text: 'Игольчатые мыши могут сбрасывать кожу, которая быстро восстанавливается.' },
  { icon: '🐘', text: 'Слоны не боятся мышей.' },
  { icon: '🎬', text: 'Микки-Маус — самая известная мышь в мире.' },
  { icon: '🌱', text: 'Землеройки достигают зрелости в 2–3 месяца и приносят потомство до 6 раз в год.' },
  { icon: '🌳', text: 'Рыжегорлые мыши способны добыть еду с дерева высотой до 4 м.' },
  { icon: '🏡', text: 'Грызуны следят за чистотой гнезда, но не меняют подстилку, а роют новые норки.' },
];

const games = [
  {
    img: CDN + '6420c78b-6673-4899-8562-2ce0d62dbdbf.jpg',
    title: 'Мыши: Эволюция',
    desc: 'Развивай своих мышек от простых грызунов до удивительных существ!',
    url: 'https://yandex.ru/games/app/myshi-evoliutsiia-123261',
  },
  {
    img: CDN + 'b9f085c5-e8d3-42fa-812a-4ae95763c270.jpg',
    title: 'Мышиное приключение',
    desc: 'Весёлая игра про храброго мышонка, покоряющего большой мир.',
    url: 'https://yandex.ru/games/app/311046',
  },
];

const Star = ({ style }: { style: React.CSSProperties }) => (
  <span className="absolute rounded-full bg-primary/70 animate-twinkle" style={style} />
);

export default function Index() {
  const [tab, setTab] = useState<Tab>('home');
  const [squeak, setSqueak] = useState(false);
  const [lightbox, setLightbox] = useState<{ url: string; caption: string } | null>(null);
  const [trapState, setTrapState] = useState<'normal' | 'burning' | 'ash'>('normal');
  const trapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTrap = () => {
    if (trapState !== 'normal') return;
    setTrapState('burning');
    trapTimerRef.current = setTimeout(() => {
      setTrapState('ash');
    }, 7000);
  };
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSqueak = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
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
    } catch (e) { void e; }
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
    { key: 'history', label: 'История', icon: 'BookOpen' },
    { key: 'games', label: 'Игры', icon: 'Gamepad2' },
    { key: 'facts', label: 'Факты', icon: 'Lightbulb' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* фон */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-accent/20 blur-[120px]" />
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
          <span className="text-2xl">🐀</span>
          <span className="font-display text-2xl font-semibold tracking-wide">Крысиный&nbsp;Мир</span>
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
                <p className="uppercase tracking-[0.3em] text-primary text-xs mb-6">Декоративные крысы</p>
                <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
                  «Маленькие лапки{' '}
                  <span className="text-gradient italic">оставляют</span>{' '}
                  большой след в сердце»
                </h1>
                <p className="text-muted-foreground text-lg mb-10 max-w-md">
                  Умные, ласковые и невероятно обаятельные. Погрузись в уютный мир декоративных крыс.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setTab('photos')} className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium glow-purple hover:scale-105 transition-transform">
                    <Icon name="Image" size={18} />Смотреть фото
                  </button>
                  <button onClick={() => setTab('videos')} className="flex items-center gap-2 border border-border bg-secondary/50 backdrop-blur px-6 py-3 rounded-full font-medium hover:scale-105 hover:border-primary transition-all">
                    <Icon name="Play" size={18} />Смотреть видео
                  </button>
                </div>
              </div>

              <div className="relative flex justify-center animate-float-slow">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl scale-90" />
                  <button
                    onClick={handleSqueak}
                    aria-label="Нажми на крыску — она пискнет"
                    className={`relative block w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 cursor-pointer transition-all duration-200
                      ${squeak ? 'border-primary scale-95 brightness-150' : 'border-primary/30 hover:border-primary/70 hover:scale-105'}`}
                  >
                    <img src={RAT_IMG} alt="Декоративная крыса" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 rounded-full bg-primary/0 hover:bg-primary/10 transition-colors" />
                    {squeak && (
                      <span className="absolute inset-0 flex items-center justify-center text-4xl animate-scale-in">💜</span>
                    )}
                  </button>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-secondary/80 backdrop-blur border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground">
                    👆 нажми на крыску — она пискнет
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ФОТО */}
        {tab === 'photos' && (
          <section className="max-w-6xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              Галерея <span className="text-gradient">крысок</span>
            </h2>
            <p className="text-center text-muted-foreground mb-10">Нажми на фото — и оно увеличится</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((p, i) => (
                <figure key={i} onClick={() => setLightbox(p)} className="group relative overflow-hidden rounded-3xl border border-border bg-card hover:border-primary transition-all cursor-zoom-in">
                  <img src={p.url} alt={p.caption} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-2">
                      <Icon name="ZoomIn" size={20} className="text-white" />
                    </span>
                  </div>
                  <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4 font-display text-lg">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ВИДЕО */}
        {tab === 'videos' && (
          <section className="max-w-6xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              Видео с <span className="text-gradient">крысками</span>
            </h2>
            <p className="text-center text-muted-foreground mb-10">Забавные и трогательные моменты</p>
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map((v, i) => (
                <div key={i} className="rounded-3xl overflow-hidden border border-border bg-card hover:border-primary transition-colors">
                  <div className="aspect-video">
                    <iframe className="w-full h-full" src={v.src} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <div className="p-4 font-display text-lg">{v.title}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ИСТОРИЯ */}
        {tab === 'history' && (
          <section className="max-w-3xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              История <span className="text-gradient">мышки</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">Откуда пришли наши любимые питомцы</p>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent hidden sm:block" />
              <div className="space-y-6">
                {historyParagraphs.map((para, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-primary glow-purple mt-2" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
                      <p className="text-foreground/90 leading-relaxed text-base">{para}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 max-w-md text-center">
                <span className="text-4xl mb-3 block">🐀</span>
                <p className="font-display text-xl text-primary">«Мышка — не вредитель, а друг»</p>
                <p className="text-muted-foreground text-sm mt-2">Народы Востока знали это тысячи лет</p>
              </div>
            </div>
          </section>
        )}

        {/* ИГРЫ */}
        {tab === 'games' && (
          <section className="max-w-4xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              Игры про <span className="text-gradient">мышек</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">Нажми на игру — и играй прямо сейчас!</p>

            <div className="grid sm:grid-cols-2 gap-8">
              {games.map((g, i) => (
                <a
                  key={i}
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-3xl overflow-hidden border border-border bg-card hover:border-primary transition-all hover:scale-105 cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img src={g.img} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="bg-primary/90 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                        <Icon name="Play" size={28} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-full px-3 py-1 text-xs text-white flex items-center gap-1">
                      <Icon name="ExternalLink" size={12} />
                      Яндекс Игры
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl mb-2 group-hover:text-primary transition-colors">{g.title}</h3>
                    <p className="text-muted-foreground text-sm">{g.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                      <Icon name="Gamepad2" size={16} />
                      Играть бесплатно
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Мышеловка */}
            <div className="mt-16 flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-sm">
                {trapState === 'normal' && '👇 А это что тут такое...'}
                {trapState === 'burning' && '🔥 Горит! Горит!'}
                {trapState === 'ash' && '💀 Справедливость восстановлена'}
              </p>

              <div
                className={`relative cursor-pointer transition-all duration-500 ${
                  trapState === 'normal' ? 'hover:scale-110' : ''
                } ${trapState === 'burning' ? 'animate-pulse' : ''}`}
                onClick={handleTrap}
              >
                {/* обычная мышеловка */}
                <img
                  src={CDN + 'd673a6a0-6ca4-4995-a9d1-72e5de10ec72.jpg'}
                  alt="Мышеловка"
                  className={`w-64 h-64 object-cover rounded-2xl border-2 border-border transition-all duration-700 ${
                    trapState === 'normal' ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                />
                {/* горящая */}
                <img
                  src={CDN + 'ad8c3094-6116-4eeb-a1a1-8c2910b5271f.jpg'}
                  alt="Мышеловка горит"
                  className={`w-64 h-64 object-cover rounded-2xl border-2 border-orange-500 transition-all duration-700 ${
                    trapState === 'burning' ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                  style={{ filter: trapState === 'burning' ? 'drop-shadow(0 0 24px orange)' : 'none' }}
                />
                {/* пепел */}
                <img
                  src={CDN + 'b994cdb7-f4e0-4cb3-8c3e-e9dd6a1f3595.jpg'}
                  alt="Пепел"
                  className={`w-64 h-64 object-cover rounded-2xl border-2 border-primary/30 transition-all duration-700 ${
                    trapState === 'ash' ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                />

                {trapState === 'normal' && (
                  <div className="absolute inset-0 flex items-end justify-center pb-3">
                    <span className="bg-black/70 backdrop-blur text-white text-xs rounded-full px-3 py-1">
                      нажми, если осмелишься 😈
                    </span>
                  </div>
                )}
              </div>

              {trapState === 'ash' && (
                <div className="text-center animate-fade-in">
                  <p className="font-display text-2xl text-primary">🏳️ Это тебе за мышек!</p>
                  <button
                    onClick={() => setTrapState('normal')}
                    className="mt-3 text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                  >
                    поставить новую мышеловку
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
        {/* ФАКТЫ */}
        {tab === 'facts' && (
          <section className="max-w-4xl mx-auto pt-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl mb-2 text-center">
              Интересные <span className="text-gradient">факты</span>
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              27 удивительных фактов о мышах, которые вас удивят
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {facts.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-colors group"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform">{f.icon}</span>
                  <p className="text-foreground/90 leading-relaxed text-sm">{f.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <footer className="relative z-10 text-center text-muted-foreground text-sm pb-8">
        Сделано с 💜 для любителей декоративных крыс
      </footer>

      {/* Лайтбокс */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
              <Icon name="X" size={20} />Закрыть
            </button>
            <img src={lightbox.url} alt={lightbox.caption} className="w-full max-h-[80vh] object-contain rounded-2xl border border-primary/30" />
            <p className="text-center font-display text-xl text-white/90 mt-4">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}