import {
  Calculator,
  Code2,
  Languages,
  FlaskConical,
  BookOpen,
  Music,
  Briefcase,
  Palette,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────

export interface Category {
  key: string
  label_uz: string
  label_ru: string
  label_en: string
  icon: LucideIcon
}

export interface Teacher {
  id: string
  username: string
  display_name: string
  avatar: string
  bio_uz: string
  bio_ru: string
  bio_en: string
  rating: number
  rating_count: number
  sessions_taught: number
  joined_at: string
  verified: boolean
  faculty: string
}

export interface Service {
  id: string
  teacher_id: string
  title_uz: string
  title_ru: string
  title_en: string
  description_uz: string
  description_ru: string
  description_en: string
  category: string
  price_coins: number
  num_sessions: number
  session_duration_min: number
  format: 'offline'
  location: string
  created_at: string
  order_count: number
}

// ─── Categories ───────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    key: 'mathematics',
    label_uz: 'Matematika',
    label_ru: 'Математика',
    label_en: 'Mathematics',
    icon: Calculator,
  },
  {
    key: 'programming',
    label_uz: 'Dasturlash',
    label_ru: 'Программирование',
    label_en: 'Programming',
    icon: Code2,
  },
  {
    key: 'languages',
    label_uz: 'Tillar',
    label_ru: 'Языки',
    label_en: 'Languages',
    icon: Languages,
  },
  {
    key: 'science',
    label_uz: 'Fanlar',
    label_ru: 'Науки',
    label_en: 'Sciences',
    icon: FlaskConical,
  },
  {
    key: 'test_prep',
    label_uz: 'Test tayyorgarligi',
    label_ru: 'Подготовка к тестам',
    label_en: 'Test Prep',
    icon: BookOpen,
  },
  {
    key: 'music_arts',
    label_uz: 'Musiqa va san\'at',
    label_ru: 'Музыка и искусство',
    label_en: 'Music & Arts',
    icon: Music,
  },
  {
    key: 'business',
    label_uz: 'Biznes',
    label_ru: 'Бизнес',
    label_en: 'Business',
    icon: Briefcase,
  },
  {
    key: 'design',
    label_uz: 'Dizayn',
    label_ru: 'Дизайн',
    label_en: 'Design',
    icon: Palette,
  },
]

// ─── Teachers ─────────────────────────────────────────────

export const TEACHERS: Teacher[] = [
  {
    id: 't1',
    username: 'aziz_tashmatov',
    display_name: 'Aziz Toshmatov',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aziz_tashmatov&backgroundColor=0F2044,C8A94D',
    bio_uz: 'Toshkent davlat texnika universiteti, Kompyuter injiniringi, 4-kurs. IELTS 7.5 ball, uch yil davomida 80 dan ortiq talabaga ingliz tili o\'rgatganman.',
    bio_ru: 'Студент 4 курса ТГТУ, Computer Engineering. IELTS 7.5, за три года подготовил более 80 студентов к сдаче IELTS.',
    bio_en: 'Final-year Computer Engineering student at TSTU. IELTS 7.5 scorer, helped 80+ students reach Band 6.5–7.5 over three years.',
    rating: 4.9,
    rating_count: 87,
    sessions_taught: 312,
    joined_at: '2024-02-10',
    verified: true,
    faculty: 'Kompyuter injiniringi fakulteti, 4-kurs',
  },
  {
    id: 't2',
    username: 'nilufar_yusupova',
    display_name: 'Nilufar Yusupova',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nilufar_yusupova&backgroundColor=0F2044,C8A94D',
    bio_uz: 'NamMI Matematika fakulteti magistranti. Oliy matematika, chiziqli algebra va differensial tenglamalar bo\'yicha tajribam bor.',
    bio_ru: 'Магистрантка НамГУ, факультет математики. Специализируюсь на высшей математике, линейной алгебре и дифференциальных уравнениях.',
    bio_en: 'MSc student in Mathematics at NamSU. Specialise in calculus, linear algebra, and differential equations for first- and second-year engineering students.',
    rating: 4.8,
    rating_count: 62,
    sessions_taught: 198,
    joined_at: '2024-03-18',
    verified: true,
    faculty: 'Matematika fakulteti, magistratura',
  },
  {
    id: 't3',
    username: 'bobur_rakhimov',
    display_name: 'Bobur Rahimov',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bobur_rakhimov&backgroundColor=0F2044,C8A94D',
    bio_uz: 'INHA universiteti, Axborot texnologiyalari, 3-kurs. Python, Django va ma\'lumotlar tahlili bo\'yicha freelancer sifatida ishlayapman.',
    bio_ru: 'Студент 3 курса ИУ, IT. Фрилансер — Python, Django, анализ данных. Открыт к сотрудничеству с начинающими.',
    bio_en: 'Third-year IT student at Inha University. Freelance Python/Django developer with experience in data analysis — patient teacher for beginners.',
    rating: 4.7,
    rating_count: 44,
    sessions_taught: 156,
    joined_at: '2024-05-01',
    verified: true,
    faculty: 'Axborot texnologiyalari, 3-kurs',
  },
  {
    id: 't4',
    username: 'sarvinoz_karimova',
    display_name: 'Sarvinoz Karimova',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarvinoz_karimova&backgroundColor=0F2044,C8A94D',
    bio_uz: 'TDPU Xorijiy tillar fakulteti, nemis tili yo\'nalishi, 4-kurs. DAAD stipendiyasiga hujjat topshirganman va A2–B1 daraja uchun dars beraman.',
    bio_ru: 'Студентка 4 курса ТГПУ, немецкий язык. Подавала документы на стипендию DAAD. Веду занятия уровней A1–B1.',
    bio_en: 'Final-year German Language student at TSPU, former DAAD applicant. Teaches German A1–B1 with focus on exam preparation.',
    rating: 4.6,
    rating_count: 31,
    sessions_taught: 89,
    joined_at: '2024-06-20',
    verified: false,
    faculty: 'Xorijiy tillar fakulteti, 4-kurs',
  },
  {
    id: 't5',
    username: 'jasur_ergashev',
    display_name: 'Jasur Ergashev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jasur_ergashev&backgroundColor=0F2044,C8A94D',
    bio_uz: 'TMA tibbiyot biologiyasi fakulteti, 3-kurs. Organik kimyo va biologiyadan imtihonga tayyorlash bo\'yicha ixtisoslasganman.',
    bio_ru: 'Студент 3 курса ТМА, медицинская биология. Специализируюсь на подготовке к вступительным экзаменам по органической химии и биологии.',
    bio_en: 'Third-year Medical Biology student at TMA. Specialises in MCAT-style and Uzbek med-school entrance prep for organic chemistry and biology.',
    rating: 4.8,
    rating_count: 53,
    sessions_taught: 174,
    joined_at: '2024-04-05',
    verified: true,
    faculty: 'Tibbiyot biologiyasi, 3-kurs',
  },
  {
    id: 't6',
    username: 'dildora_nazarova',
    display_name: 'Dildora Nazarova',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dildora_nazarova&backgroundColor=0F2044,C8A94D',
    bio_uz: 'O\'zDSMI Musiqa pedagogikasi, 4-kurs. Gitara va piano bo\'yicha 5 yillik tajribam bor, boshlang\'ichlarga o\'rgatishni yaxshi ko\'raman.',
    bio_ru: 'Студентка 4 курса УзГОСКИ, музыкальная педагогика. 5 лет опыта игры на гитаре и фортепиано, люблю работать с начинающими.',
    bio_en: 'Final-year Music Pedagogy student at UzSCI. Five years of guitar and piano experience; patient and encouraging with complete beginners.',
    rating: 4.9,
    rating_count: 28,
    sessions_taught: 67,
    joined_at: '2024-07-14',
    verified: false,
    faculty: 'Musiqa pedagogikasi, 4-kurs',
  },
  {
    id: 't7',
    username: 'ulugbek_mirzayev',
    display_name: 'Ulug\'bek Mirzayev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ulugbek_mirzayev&backgroundColor=0F2044,C8A94D',
    bio_uz: 'Westminster universiteti Toshkent, Biznes boshqaruvi, 3-kurs. Marketing va startap moliyasi bo\'yicha loyiha tajribam bor.',
    bio_ru: 'Студент 3 курса WUT, Business Management. Имею опыт в маркетинге и финансировании стартапов.',
    bio_en: 'Third-year Business Management student at Westminster Tashkent. Experienced in startup marketing and early-stage finance.',
    rating: 4.5,
    rating_count: 19,
    sessions_taught: 42,
    joined_at: '2024-09-03',
    verified: false,
    faculty: 'Biznes boshqaruvi, 3-kurs',
  },
  {
    id: 't8',
    username: 'maftuna_sodikova',
    display_name: 'Maftuna Sodiqova',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maftuna_sodikova&backgroundColor=0F2044,C8A94D',
    bio_uz: 'TDPU Rus tili va adabiyoti, magistratura. Rus tilini chet el sifatida o\'qitish metodikasi bo\'yicha ixtisoslasganman.',
    bio_ru: 'Магистрантка ТГПУ, русский язык и литература. Специализируюсь на методике преподавания РКИ.',
    bio_en: 'Master\'s student in Russian Language & Literature at TSPU. Specialises in teaching Russian as a foreign language (RFL).',
    rating: 4.7,
    rating_count: 38,
    sessions_taught: 121,
    joined_at: '2024-01-22',
    verified: true,
    faculty: 'Rus tili va adabiyoti, magistratura',
  },
  {
    id: 't9',
    username: 'sherzod_abdullayev',
    display_name: 'Sherzod Abdullayev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sherzod_abdullayev&backgroundColor=0F2044,C8A94D',
    bio_uz: 'TATU Kompyuter muhandisligi, 4-kurs. Figma va UI/UX dizayn bo\'yicha bir nechta loyihada ishlaganman.',
    bio_ru: 'Студент 4 курса ТУИТ, Computer Engineering. Работал над несколькими проектами в области Figma и UI/UX дизайна.',
    bio_en: 'Final-year Computer Engineering student at TUIT. Worked on multiple Figma and UI/UX design projects for local startups.',
    rating: 4.6,
    rating_count: 22,
    sessions_taught: 58,
    joined_at: '2024-08-11',
    verified: false,
    faculty: 'Kompyuter muhandisligi, 4-kurs',
  },
  {
    id: 't10',
    username: 'kamola_umarova',
    display_name: 'Kamola Umarova',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kamola_umarova&backgroundColor=0F2044,C8A94D',
    bio_uz: 'TDIU Xalqaro iqtisodiyot, 4-kurs. IELTS va SAT tayyorgarligi hamda ingliz tili biznes muloqoti bo\'yicha dars beraman.',
    bio_ru: 'Студентка 4 курса УМЭД, международная экономика. Веду занятия по подготовке к IELTS, SAT и деловому английскому.',
    bio_en: 'Final-year International Economics student at UWED. Teaches IELTS, SAT prep, and Business English communication.',
    rating: 4.8,
    rating_count: 71,
    sessions_taught: 267,
    joined_at: '2023-11-30',
    verified: true,
    faculty: 'Xalqaro iqtisodiyot, 4-kurs',
  },
]

// ─── Services ─────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    id: 's1',
    teacher_id: 't1',
    title_uz: 'IELTS Speaking: Band 7+ uchun 5 ta maxsus mashg\'ulot',
    title_ru: 'IELTS Speaking: 5 занятий для Band 7+',
    title_en: 'IELTS Speaking: 5 Focused Sessions for Band 7+',
    description_uz: 'IELTS Speaking imtihoniga chuqur tayyorgarlik ko\'rasiz. Har bir mashg\'ulotda real imtihon sharoitida amaliyot, tez javob berish va lug\'at boyitish ustida ishlaymiz. Siz Band 6.5 yoki undan yuqori darajaga ega bo\'lib, 7+ ga erishishni xohlasangiz, bu kurs siz uchun.',
    description_ru: 'Интенсивная подготовка к разделу Speaking экзамена IELTS. Каждое занятие — реальная симуляция экзамена с разбором ошибок, работой над беглостью и расширением словарного запаса. Курс рассчитан на студентов с уровнем Band 6.5+, нацеленных на 7+.',
    description_en: 'Intensive IELTS Speaking preparation across five structured sessions. We practise real exam simulations, work on fluency and lexical range, and break down the Band 7 criteria systematically. Designed for students already at Band 6.5 aiming for 7 or above.',
    category: 'test_prep',
    price_coins: 12,
    num_sessions: 5,
    session_duration_min: 60,
    format: 'offline',
    location: 'Mirzo Ulug\'bek tumani, Toshkent',
    created_at: '2025-01-15',
    order_count: 38,
  },
  {
    id: 's2',
    teacher_id: 't2',
    title_uz: 'Chiziqli algebra: birinchi kurs muhandislari uchun',
    title_ru: 'Линейная алгебра для первокурсников инженерных специальностей',
    title_en: 'Linear Algebra for First-Year Engineering Students',
    description_uz: 'Matritsalar, determinantlar, chiziqli tenglamalar sistemasi va vektorlar haqida asosdan boshlab tushuntiraman. Har bir mashg\'ulot amaliy masalalar yechishga bag\'ishlangan. Imtihon mavsumida kursni jadallashtirishim mumkin.',
    description_ru: 'Объясняю матрицы, определители, системы линейных уравнений и векторы с основ. Каждое занятие посвящено решению практических задач. Возможно ускорение курса в период сессии.',
    description_en: 'Clear explanation of matrices, determinants, systems of linear equations, and vector spaces from the ground up. Every session is practice-problem focused. Course pace can be accelerated during exam season.',
    category: 'mathematics',
    price_coins: 8,
    num_sessions: 6,
    session_duration_min: 90,
    format: 'offline',
    location: 'Yunusobod tumani, Toshkent',
    created_at: '2025-02-03',
    order_count: 27,
  },
  {
    id: 's3',
    teacher_id: 't3',
    title_uz: 'Python — noldan portfolio loyihasigacha (2 hafta)',
    title_ru: 'Python с нуля — до портфолио-проекта (2 недели)',
    title_en: 'Python from Scratch — Build a Portfolio Project in 2 Weeks',
    description_uz: 'Dasturlashni hech bilmaganlar uchun mo\'ljallangan intensiv kurs. O\'zgaruvchilar, sikllar, funksiyalar va fayllar bilan ishlashni o\'rganasiz, so\'ng o\'zingizning birinchi to\'liq loyihangizni yaratasiz. GitHub profilingiz tayyorlanadi.',
    description_ru: 'Интенсивный курс для тех, кто никогда не программировал. Переменные, циклы, функции, работа с файлами — и всё это на пути к вашему первому полноценному проекту. В конце — готовый GitHub-профиль.',
    description_en: 'Intensive course for complete beginners. You will learn variables, loops, functions, and file handling, then build your first complete project from scratch. By session 8 you will have a working GitHub portfolio.',
    category: 'programming',
    price_coins: 10,
    num_sessions: 8,
    session_duration_min: 60,
    format: 'offline',
    location: 'Chilonzor tumani, Toshkent',
    created_at: '2025-01-28',
    order_count: 45,
  },
  {
    id: 's4',
    teacher_id: 't8',
    title_uz: 'Rus tili suhbat mashg\'ulotlari (B1 → B2)',
    title_ru: 'Разговорный русский язык (B1 → B2)',
    title_en: 'Russian Conversation Practice (B1 → B2)',
    description_uz: 'Rus tilida erkin muloqot qilishni o\'rganmoqchimisiz? Bu kursda real hayotiy mavzularda suhbat, grammatika xatolarini tuzatish va ish va akademik muhitda muloqot ko\'nikmalaringizni oshirish ustida ishlaymiz.',
    description_ru: 'Хотите свободно говорить по-русски? В курсе — живые диалоги на реальные темы, разбор грамматических ошибок и развитие навыков общения в академической и профессиональной среде.',
    description_en: 'Designed for students who can understand Russian but struggle to speak confidently. Each session covers real-life topics, error correction, and communication strategies for academic and professional contexts.',
    category: 'languages',
    price_coins: 6,
    num_sessions: 4,
    session_duration_min: 60,
    format: 'offline',
    location: 'Shayxontohur tumani, Toshkent',
    created_at: '2025-03-01',
    order_count: 18,
  },
  {
    id: 's5',
    teacher_id: 't5',
    title_uz: 'Organik kimyo: tibbiyot fakultetiga kirish imtihoniga tayyorgarlik',
    title_ru: 'Органическая химия: подготовка к вступительным экзаменам в медвузы',
    title_en: 'Organic Chemistry: Med School Entrance Exam Preparation',
    description_uz: 'O\'zbekiston tibbiyot universiteti va TMA kirish imtihonlarida organik kimyo bo\'yicha eng ko\'p uchraydigan savollarni tahlil qilamiz. Strukturaviy formulalar, reaksiya mexanizmlari va test strategiyasi ustida ishlaymiz.',
    description_ru: 'Разбираем наиболее часто встречающиеся вопросы по органической химии на вступительных экзаменах в медицинские вузы Узбекистана. Структурные формулы, механизмы реакций и стратегия теста.',
    description_en: 'We work through the most common organic chemistry question types on Uzbek med-school entrance exams, covering structural formulas, reaction mechanisms, and test-taking strategy for the DTM format.',
    category: 'science',
    price_coins: 9,
    num_sessions: 5,
    session_duration_min: 90,
    format: 'offline',
    location: 'Mirzo Ulug\'bek tumani, Toshkent',
    created_at: '2025-02-14',
    order_count: 31,
  },
  {
    id: 's6',
    teacher_id: 't6',
    title_uz: 'Gitara — boshlang\'ichlar uchun (noldan akkordlargacha)',
    title_ru: 'Гитара для начинающих (с нуля до первых аккордов)',
    title_en: 'Guitar Basics for Beginners — Zero to First Chords',
    description_uz: 'Gitarani ushlab o\'tirish usulidan boshlab, birinchi akkordlar va qo\'shiqlar ijrosigacha. Har mashg\'ulotda amaliy natija ko\'rasiz. Gitarangiz bo\'lmasa, vaqtincha beraman.',
    description_ru: 'От правильной постановки рук до первых аккордов и песен. Каждое занятие даёт ощутимый результат. Инструмент на первое время предоставлю.',
    description_en: 'From correct hand positioning to your first chords and songs. Every session produces a tangible result you can hear. A guitar can be provided for the first few sessions if needed.',
    category: 'music_arts',
    price_coins: 5,
    num_sessions: 4,
    session_duration_min: 45,
    format: 'offline',
    location: 'Yakkasaroy tumani, Toshkent',
    created_at: '2025-03-10',
    order_count: 14,
  },
  {
    id: 's7',
    teacher_id: 't4',
    title_uz: 'Nemis tili A1: DAAD ariza uchun asos',
    title_ru: 'Немецкий A1: основа для подачи заявки на DAAD',
    title_en: 'German A1 — Foundations for DAAD Scholarship Applications',
    description_uz: 'DAAD yoki boshqa nemis stipendiyalariga ariza topshirmoqchi bo\'lganlar uchun. A1 darajasidan boshlab, zarur leksika va grammatikani o\'rganasiz, CV va motivatsion xatni nemischa tuzishda yordam beraman.',
    description_ru: 'Для студентов, планирующих подать заявку на DAAD или другие немецкие стипендии. Уровень A1 с нуля — лексика, грамматика и помощь с написанием CV и мотивационного письма на немецком.',
    description_en: 'Tailored for students planning to apply for DAAD or other German scholarships. We build A1 grammar and vocabulary from scratch and work on writing your CV and motivation letter in German.',
    category: 'languages',
    price_coins: 7,
    num_sessions: 6,
    session_duration_min: 60,
    format: 'offline',
    location: 'Yunusobod tumani, Toshkent',
    created_at: '2025-01-20',
    order_count: 22,
  },
  {
    id: 's8',
    teacher_id: 't7',
    title_uz: 'Startup marketing: ijtimoiy tarmoqlardan birinchi 1000 ta foydalanuvchiga',
    title_ru: 'Стартап-маркетинг: от соцсетей до первых 1000 пользователей',
    title_en: 'Startup Marketing: Social Media to First 1,000 Users',
    description_uz: 'Kichik byudjet bilan qanday qilib mahsulotingizni targ\'ib qilish mumkin? Instagram, Telegram va kontentni rejalashtirish asoslarini amaliy misollarda o\'rganamiz. O\'z startapingiz g\'oyasini ishlab chiqishingizga yordam beraman.',
    description_ru: 'Как продвигать продукт с ограниченным бюджетом? Instagram, Telegram, основы контент-планирования на реальных примерах. Помогу проработать идею вашего стартапа.',
    description_en: 'How to promote a product on a tight budget. We cover Instagram and Telegram channels, content planning fundamentals, and growth hacking techniques used by Uzbek startups. Ideal for students with a business idea.',
    category: 'business',
    price_coins: 8,
    num_sessions: 3,
    session_duration_min: 60,
    format: 'offline',
    location: 'Chilonzor tumani, Toshkent',
    created_at: '2025-02-28',
    order_count: 11,
  },
  {
    id: 's9',
    teacher_id: 't9',
    title_uz: 'Figma UI/UX: birinchi loyihadan portfolio sahifasigacha',
    title_ru: 'Figma UI/UX: от первого проекта до страницы портфолио',
    title_en: 'Figma UI/UX — From First Project to Portfolio Page',
    description_uz: 'Figmaning asosiy vositalarini o\'rganib, birinchi to\'liq mobil ilova dizayningizni yaratasiz. Prototiplash, komponentlar va dizayn tizimi bilan ishlash ko\'nikmalaringizni oshirasiz.',
    description_ru: 'Осваиваем базовые инструменты Figma и создаём первый полноценный дизайн мобильного приложения. Прототипирование, компоненты, работа с дизайн-системой.',
    description_en: 'Learn Figma fundamentals and create your first complete mobile app design. We cover prototyping, components, and design systems, finishing with a portfolio-ready case study.',
    category: 'design',
    price_coins: 9,
    num_sessions: 5,
    session_duration_min: 60,
    format: 'offline',
    location: 'Mirzo Ulug\'bek tumani, Toshkent',
    created_at: '2025-03-05',
    order_count: 19,
  },
  {
    id: 's10',
    teacher_id: 't10',
    title_uz: 'IELTS Academic: 4 ta bo\'lim bo\'yicha to\'liq tayyorgarlik',
    title_ru: 'IELTS Academic: комплексная подготовка по 4 разделам',
    title_en: 'IELTS Academic: Complete 4-Skill Preparation',
    description_uz: 'Listening, Reading, Writing va Speaking bo\'limlari bo\'yicha sistematik tayyorgarlik. Har bir darsda bitta bo\'limga e\'tibor qaratiladi, so\'ng umumiy strategiya ishlab chiqiladi. Doimiy topshiriqlar va teskari aloqa beriladi.',
    description_ru: 'Системная подготовка по всем четырём разделам IELTS Academic. Каждое занятие сосредоточено на одном разделе, затем формируется общая стратегия. Регулярные задания и обратная связь.',
    description_en: 'Systematic preparation across all four IELTS Academic skills. Each session targets one section, then we build an integrated strategy. Regular homework and detailed feedback are included.',
    category: 'test_prep',
    price_coins: 15,
    num_sessions: 10,
    session_duration_min: 60,
    format: 'offline',
    location: 'Yunusobod tumani, Toshkent',
    created_at: '2024-12-01',
    order_count: 50,
  },
  {
    id: 's11',
    teacher_id: 't2',
    title_uz: 'Matematik analiz: cheksiz kichik kattaliklar va integrallar',
    title_ru: 'Математический анализ: пределы и интегралы',
    title_en: 'Calculus: Limits, Derivatives and Integrals',
    description_uz: 'Cheksizga intiluvchi ketma-ketliklar, hosilalar va integrallarni amaliy misollarda tushuntiraman. Imtihon topshiriqlari ustida birga ishlaymiz. Kurs birinchi va ikkinchi kurs talabalari uchun mo\'ljallangan.',
    description_ru: 'Пределы, производные и интегралы на практических примерах. Разбираем экзаменационные задачи вместе. Курс рассчитан на студентов 1–2 курса.',
    description_en: 'Limits, derivatives, and integrals explained through practice problems. We work through past exam questions together. Aimed at first- and second-year students across all STEM faculties.',
    category: 'mathematics',
    price_coins: 7,
    num_sessions: 5,
    session_duration_min: 90,
    format: 'offline',
    location: 'Yunusobod tumani, Toshkent',
    created_at: '2025-01-10',
    order_count: 23,
  },
  {
    id: 's12',
    teacher_id: 't1',
    title_uz: 'Ingliz tili akademik yozuv (IELTS Writing Task 2)',
    title_ru: 'Академическое письмо на английском (IELTS Writing Task 2)',
    title_en: 'Academic English Writing — IELTS Writing Task 2',
    description_uz: 'IELTS Writing Task 2 uchun maxsus mashg\'ulotlar: argumentativ va munozara esse turlari, tezisni rivojlantirish, koheziya va leksika. Har mashg\'ulotda sizning esse yozib ko\'rib beraman va batafsil izoh beraman.',
    description_ru: 'Специальные занятия по IELTS Writing Task 2: аргументативные и дискуссионные эссе, развитие тезиса, связность и лексика. На каждом занятии пишем эссе и подробно разбираем ошибки.',
    description_en: 'Targeted sessions for IELTS Writing Task 2: argumentative and discussion essay types, thesis development, cohesion, and vocabulary range. Every session includes a timed essay with detailed written feedback.',
    category: 'test_prep',
    price_coins: 10,
    num_sessions: 5,
    session_duration_min: 60,
    format: 'offline',
    location: 'Mirzo Ulug\'bek tumani, Toshkent',
    created_at: '2025-02-20',
    order_count: 29,
  },
]

// ─── Dashboard / wallet types ─────────────────────────────

export interface CurrentUser {
  id: string
  display_name: string
  username: string
  avatar: string
  faculty_uz: string
  faculty_ru: string
  faculty_en: string
  joined_at: string
  balance_coins: number
  locked_coins: number
  lifetime_earned: number
  lifetime_spent: number
  is_teacher: boolean
  rating: number
  rating_count: number
}

export interface Order {
  id: string
  service_id: string
  buyer_id: string
  teacher_id: string
  num_sessions: number
  completed_sessions: number
  status: 'active' | 'completed' | 'pending' | 'disputed'
  created_at: string
  price_coins: number
}

export interface UserSession {
  id: string
  order_id: string
  sequence_num: number
  scheduled_at: string
  duration_min: number
  location: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

export interface Transaction {
  id: string
  type: 'topup' | 'escrow_lock' | 'escrow_release' | 'earn' | 'fee' | 'withdrawal'
  amount_coins: number
  balance_after: number
  note: string
  created_at: string
  reference_id: string | null
}

// ─── Current user (demo "logged-in" user) ─────────────────

export const CURRENT_USER: CurrentUser = {
  id: 'current-user-1',
  display_name: 'Sarvar Abdullayev',
  username: 'sarvar_a',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarvar_a&backgroundColor=0F2044,C8A94D',
  faculty_uz: 'Matematika fakulteti, 3-kurs',
  faculty_ru: 'Факультет математики, 3 курс',
  faculty_en: 'Mathematics Faculty, Year 3',
  joined_at: '2024-09-15',
  balance_coins: 47,
  locked_coins: 24,
  lifetime_earned: 89,
  lifetime_spent: 156,
  is_teacher: true,
  rating: 4.7,
  rating_count: 18,
}

// ─── Orders ───────────────────────────────────────────────

export const MY_ORDERS: Order[] = [
  {
    id: 'o1',
    service_id: 's1',
    buyer_id: 'current-user-1',
    teacher_id: 't1',
    num_sessions: 5,
    completed_sessions: 3,
    status: 'active',
    created_at: '2025-03-13',
    price_coins: 12,
  },
  {
    id: 'o2',
    service_id: 's10',
    buyer_id: 'current-user-1',
    teacher_id: 't10',
    num_sessions: 10,
    completed_sessions: 4,
    status: 'active',
    created_at: '2025-01-28',
    price_coins: 15,
  },
  {
    id: 'o3',
    service_id: 's3',
    buyer_id: 'current-user-1',
    teacher_id: 't3',
    num_sessions: 8,
    completed_sessions: 8,
    status: 'completed',
    created_at: '2024-10-22',
    price_coins: 10,
  },
  {
    id: 'o4',
    service_id: 's2',
    buyer_id: 'current-user-1',
    teacher_id: 't2',
    num_sessions: 6,
    completed_sessions: 6,
    status: 'completed',
    created_at: '2024-09-22',
    price_coins: 8,
  },
  {
    id: 'o5',
    service_id: 's5',
    buyer_id: 'current-user-1',
    teacher_id: 't5',
    num_sessions: 5,
    completed_sessions: 0,
    status: 'pending',
    created_at: '2025-04-20',
    price_coins: 9,
  },
  {
    id: 'o6',
    service_id: 's11',
    buyer_id: 'current-user-1',
    teacher_id: 't2',
    num_sessions: 5,
    completed_sessions: 2,
    status: 'disputed',
    created_at: '2025-03-01',
    price_coins: 7,
  },
]

// ─── Sessions ─────────────────────────────────────────────

export const MY_SESSIONS: UserSession[] = [
  { id: 'ss1', order_id: 'o1', sequence_num: 1, scheduled_at: '2025-03-20T10:00:00', duration_min: 60, location: "Mirzo Ulug'bek tumani", status: 'completed' },
  { id: 'ss2', order_id: 'o1', sequence_num: 2, scheduled_at: '2025-03-27T10:00:00', duration_min: 60, location: "Mirzo Ulug'bek tumani", status: 'completed' },
  { id: 'ss3', order_id: 'o1', sequence_num: 3, scheduled_at: '2025-04-03T10:00:00', duration_min: 60, location: "Mirzo Ulug'bek tumani", status: 'completed' },
  { id: 'ss4', order_id: 'o1', sequence_num: 4, scheduled_at: '2025-04-28T10:00:00', duration_min: 60, location: "Mirzo Ulug'bek tumani", status: 'upcoming' },
  { id: 'ss5', order_id: 'o1', sequence_num: 5, scheduled_at: '2025-05-05T10:00:00', duration_min: 60, location: "Mirzo Ulug'bek tumani", status: 'upcoming' },
  { id: 'ss6', order_id: 'o2', sequence_num: 1, scheduled_at: '2025-02-10T14:00:00', duration_min: 60, location: 'Yunusobod tumani', status: 'completed' },
  { id: 'ss7', order_id: 'o2', sequence_num: 2, scheduled_at: '2025-02-17T14:00:00', duration_min: 60, location: 'Yunusobod tumani', status: 'completed' },
  { id: 'ss8', order_id: 'o2', sequence_num: 3, scheduled_at: '2025-02-24T14:00:00', duration_min: 60, location: 'Yunusobod tumani', status: 'completed' },
  { id: 'ss9', order_id: 'o2', sequence_num: 4, scheduled_at: '2025-03-03T14:00:00', duration_min: 60, location: 'Yunusobod tumani', status: 'completed' },
  { id: 'ss10', order_id: 'o2', sequence_num: 5, scheduled_at: '2025-04-26T14:00:00', duration_min: 60, location: 'Yunusobod tumani', status: 'upcoming' },
  { id: 'ss11', order_id: 'o5', sequence_num: 1, scheduled_at: '2025-04-30T16:00:00', duration_min: 90, location: "Mirzo Ulug'bek tumani", status: 'upcoming' },
  { id: 'ss12', order_id: 'o6', sequence_num: 1, scheduled_at: '2025-03-15T11:00:00', duration_min: 90, location: 'Yunusobod tumani', status: 'completed' },
  { id: 'ss13', order_id: 'o6', sequence_num: 2, scheduled_at: '2025-03-22T11:00:00', duration_min: 90, location: 'Yunusobod tumani', status: 'completed' },
  { id: 'ss14', order_id: 'o6', sequence_num: 3, scheduled_at: '2025-04-01T11:00:00', duration_min: 90, location: 'Yunusobod tumani', status: 'cancelled' },
]

// ─── Transactions ─────────────────────────────────────────

export const MY_TRANSACTIONS: Transaction[] = [
  { id: 'tx1',  type: 'topup',         amount_coins:  50, balance_after:  50, note: 'Top-up via Click',                  created_at: '2024-09-16', reference_id: 'CLICK-291847' },
  { id: 'tx2',  type: 'escrow_lock',   amount_coins:  -8, balance_after:  42, note: 'Linear Algebra course booking',     created_at: '2024-09-22', reference_id: 'ORD-004' },
  { id: 'tx3',  type: 'earn',          amount_coins:   8, balance_after:  50, note: 'Linear Algebra — Session 1',        created_at: '2024-10-04', reference_id: 'ORD-EXT-001' },
  { id: 'tx4',  type: 'fee',           amount_coins:  -1, balance_after:  49, note: 'Platform fee (10%)',                created_at: '2024-10-04', reference_id: null },
  { id: 'tx5',  type: 'topup',         amount_coins:  30, balance_after:  79, note: 'Top-up via Payme',                  created_at: '2024-10-19', reference_id: 'PAYME-448921' },
  { id: 'tx6',  type: 'escrow_lock',   amount_coins: -10, balance_after:  69, note: 'Python from Scratch course booking', created_at: '2024-10-25', reference_id: 'ORD-003' },
  { id: 'tx7',  type: 'earn',          amount_coins:   8, balance_after:  77, note: 'Calculus — Session 1',              created_at: '2024-11-08', reference_id: 'ORD-EXT-002' },
  { id: 'tx8',  type: 'fee',           amount_coins:  -1, balance_after:  76, note: 'Platform fee (10%)',                created_at: '2024-11-08', reference_id: null },
  { id: 'tx9',  type: 'escrow_lock',   amount_coins:  -9, balance_after:  67, note: 'Organic Chemistry course booking',  created_at: '2024-11-22', reference_id: 'ORD-005' },
  { id: 'tx10', type: 'earn',          amount_coins:   8, balance_after:  75, note: 'Linear Algebra — Session 3',        created_at: '2024-12-12', reference_id: 'ORD-EXT-003' },
  { id: 'tx11', type: 'fee',           amount_coins:  -1, balance_after:  74, note: 'Platform fee (10%)',                created_at: '2024-12-12', reference_id: null },
  { id: 'tx12', type: 'escrow_lock',   amount_coins:  -8, balance_after:  66, note: 'Russian Conversation course booking', created_at: '2025-01-18', reference_id: 'ORD-EXT-004' },
  { id: 'tx13', type: 'earn',          amount_coins:   8, balance_after:  74, note: 'Calculus — Session 2',              created_at: '2025-02-15', reference_id: 'ORD-EXT-005' },
  { id: 'tx14', type: 'fee',           amount_coins:  -1, balance_after:  73, note: 'Platform fee (10%)',                created_at: '2025-02-15', reference_id: null },
  { id: 'tx15', type: 'withdrawal',    amount_coins: -26, balance_after:  47, note: 'Withdrawal to Kapitalbank ****4821', created_at: '2025-03-10', reference_id: 'WD-18472' },
]

// ─── Helpers ──────────────────────────────────────────────

export function getTeacher(id: string): Teacher | undefined {
  return TEACHERS.find((t) => t.id === id)
}

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

export function getServicesByTeacher(teacherId: string): Service[] {
  return SERVICES.filter((s) => s.teacher_id === teacherId)
}

export function getServicesByCategory(category: string): Service[] {
  return SERVICES.filter((s) => s.category === category)
}

export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key)
}
