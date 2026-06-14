import { STAGES } from '../data/stages'

// Percentage positions matching equipment centers in the 1200×600 SVG viewBox
const NODE_POSITIONS = [
  { left: '10.8%', top: '75%'   }, // Stage 1 — Sandbox
  { left: '26.3%', top: '56.7%' }, // Stage 2 — Swing seat
  { left: '43.6%', top: '35.8%' }, // Stage 3 — Slide top platform
  { left: '65.8%', top: '69.2%' }, // Stage 4 — Carousel center
  { left: '86.7%', top: '28%'   }, // Stage 5 — Castle tower top
]

const LADDER_RUNGS = [280, 300, 320, 340, 360, 380, 400, 420, 440, 460]

export default function GameScreen({ activeStageId, stageProgress, go }) {
  const currentStageIndex = activeStageId ? STAGES.findIndex((s) => s.id === activeStageId) : 0
  const currentStage = STAGES[currentStageIndex]

  const getStageStatus = (stageId) => {
    const idx = STAGES.findIndex((s) => s.id === stageId)
    const progress = stageProgress[stageId]
    if (progress?.completedAt) return 'completed'
    if (progress?.maxLevel > 0) return 'in-progress'
    // Stage 1 always available; later stages unlock when previous is completed
    if (idx === 0) return 'available'
    const prevDone = stageProgress[STAGES[idx - 1].id]?.completedAt
    return prevDone ? 'available' : 'locked'
  }

  return (
    <div className="fixed inset-0 overflow-hidden">

      {/* ── SVG Playground Scene ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#42A5F5" />
            <stop offset="100%" stopColor="#B3E5FC" />
          </linearGradient>
          <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>
          <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="100%" stopColor="#F9A825" />
          </linearGradient>
          <linearGradient id="slideGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFB74D" />
            <stop offset="100%" stopColor="#FF8F00" />
          </linearGradient>
          <linearGradient id="castleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#AB47BC" />
            <stop offset="100%" stopColor="#6A1B9A" />
          </linearGradient>
          <linearGradient id="pathShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#900038" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#900038" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Sky ── */}
        <rect width="1200" height="600" fill="url(#skyGrad)" />

        {/* Sun */}
        <circle cx="1095" cy="72" r="52" fill="#FFF59D" opacity="0.9" />
        <circle cx="1095" cy="72" r="40" fill="#FFEE58" />

        {/* Clouds */}
        <g opacity="0.95">
          <circle cx="148" cy="82" r="30" fill="white" />
          <circle cx="178" cy="66" r="42" fill="white" />
          <circle cx="218" cy="74" r="32" fill="white" />
          <circle cx="246" cy="82" r="23" fill="white" />
          <circle cx="120" cy="90" r="20" fill="white" />
        </g>
        <g opacity="0.88">
          <circle cx="468" cy="58" r="26" fill="white" />
          <circle cx="498" cy="45" r="35" fill="white" />
          <circle cx="534" cy="54" r="28" fill="white" />
          <circle cx="558" cy="62" r="20" fill="white" />
        </g>
        <g opacity="0.85">
          <circle cx="728" cy="94" r="24" fill="white" />
          <circle cx="758" cy="80" r="33" fill="white" />
          <circle cx="792" cy="88" r="26" fill="white" />
          <circle cx="815" cy="96" r="19" fill="white" />
        </g>

        {/* Background hills */}
        <path
          d="M0,420 Q100,368 220,395 Q340,422 460,378 Q580,334 700,368 Q820,402 940,355 Q1060,308 1200,350 L1200,480 L0,480 Z"
          fill="#A5D6A7"
          opacity="0.45"
        />

        {/* ── Ground ── */}
        <rect x="0" y="475" width="1200" height="125" fill="url(#grassGrad)" />
        <path
          d="M0,475 Q25,462 50,475 Q75,488 100,475 Q125,462 150,475 Q175,488 200,475 Q225,462 250,475 Q275,488 300,475 Q325,462 350,475 Q375,488 400,475 Q425,462 450,475 Q475,488 500,475 Q525,462 550,475 Q575,488 600,475 Q625,462 650,475 Q675,488 700,475 Q725,462 750,475 Q775,488 800,475 Q825,462 850,475 Q875,488 900,475 Q925,462 950,475 Q975,488 1000,475 Q1025,462 1050,475 Q1075,488 1100,475 Q1125,462 1150,475 Q1175,488 1200,475 L1200,600 L0,600 Z"
          fill="#66BB6A"
        />

        {/* ── Winding Path (shadow then main) ── */}
        <path
          d="M 130,453 C 205,390 258,358 313,342 C 368,326 432,232 524,215 C 616,198 708,432 790,418 C 872,404 960,252 1040,168"
          stroke="#900038"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
          transform="translate(4,5)"
        />
        <path
          d="M 130,453 C 205,390 258,358 313,342 C 368,326 432,232 524,215 C 616,198 708,432 790,418 C 872,404 960,252 1040,168"
          stroke="#e2165f"
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dashed white centre line */}
        <path
          d="M 130,453 C 205,390 258,358 313,342 C 368,326 432,232 524,215 C 616,198 708,432 790,418 C 872,404 960,252 1040,168"
          stroke="white"
          strokeWidth="3"
          strokeDasharray="14 14"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* ═══════════════════════════
            STAGE 1 — SANDBOX
        ═══════════════════════════ */}
        {/* Wooden frame */}
        <rect x="58"  y="454" width="148" height="24" fill="#8D6E63" rx="5" />
        <rect x="58"  y="438" width="10"  height="42" fill="#6D4C41" rx="3" />
        <rect x="196" y="438" width="10"  height="42" fill="#6D4C41" rx="3" />
        <rect x="58"  y="438" width="148" height="10" fill="#A1887F" rx="3" />
        {/* Sand */}
        <ellipse cx="132" cy="460" rx="66" ry="14" fill="url(#sandGrad)" />
        <ellipse cx="108" cy="456" rx="14" ry="5"  fill="#F9A825" opacity="0.35" />
        <ellipse cx="158" cy="462" rx="12" ry="4"  fill="#FFF9C4" opacity="0.45" />
        {/* Bucket */}
        <path d="M100,443 L106,458 L118,458 L124,443 Z" fill="#e2165f" />
        <rect x="101" y="440" width="22" height="5" fill="#b80049" rx="2" />
        {/* Shovel */}
        <line x1="150" y1="430" x2="154" y2="452" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="152" cy="456" rx="6" ry="5" fill="#78909C" />

        {/* ═══════════════════════════
            STAGE 2 — SWING SET
        ═══════════════════════════ */}
        {/* Left A-frame */}
        <line x1="244" y1="478" x2="292" y2="235" stroke="#4E342E" strokeWidth="11" strokeLinecap="round" />
        <line x1="316" y1="478" x2="292" y2="235" stroke="#4E342E" strokeWidth="11" strokeLinecap="round" />
        {/* Right A-frame */}
        <line x1="348" y1="478" x2="374" y2="235" stroke="#4E342E" strokeWidth="11" strokeLinecap="round" />
        <line x1="396" y1="478" x2="374" y2="235" stroke="#4E342E" strokeWidth="11" strokeLinecap="round" />
        {/* Top crossbar */}
        <rect x="289" y="229" width="88" height="14" fill="#3E2723" rx="7" />
        {/* Left swing chains */}
        <line x1="308" y1="243" x2="304" y2="338" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
        <line x1="320" y1="243" x2="323" y2="338" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
        {/* Right swing chains */}
        <line x1="347" y1="243" x2="344" y2="338" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
        <line x1="359" y1="243" x2="362" y2="338" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
        {/* Seats */}
        <rect x="296" y="338" width="34" height="10" fill="#4CAF50" rx="4" />
        <rect x="337" y="338" width="34" height="10" fill="#FF9800" rx="4" />

        {/* ═══════════════════════════
            DECORATIVE TREE (between swing & slide)
        ═══════════════════════════ */}
        <rect x="450" y="398" width="14" height="80" fill="#5D4037" rx="3" />
        <circle cx="457" cy="382" r="40" fill="#388E3C" />
        <circle cx="438" cy="396" r="28" fill="#43A047" />
        <circle cx="476" cy="393" r="26" fill="#2E7D32" />

        {/* ═══════════════════════════
            STAGE 3 — SLIDE
        ═══════════════════════════ */}
        {/* Tower */}
        <rect x="492" y="228" width="62" height="250" fill="#FF7043" rx="6" />
        {/* Platform top cap */}
        <rect x="486" y="222" width="74" height="16" fill="#E64A19" rx="5" />
        {/* Railing */}
        <line x1="486" y1="222" x2="486" y2="190" stroke="#BF360C" strokeWidth="5" strokeLinecap="round" />
        <line x1="560" y1="222" x2="560" y2="190" stroke="#BF360C" strokeWidth="5" strokeLinecap="round" />
        <line x1="486" y1="190" x2="560" y2="190" stroke="#BF360C" strokeWidth="5" strokeLinecap="round" />
        {/* Ladder side rails */}
        <line x1="481" y1="268" x2="481" y2="472" stroke="#BF360C" strokeWidth="4" />
        <line x1="492" y1="268" x2="492" y2="472" stroke="#BF360C" strokeWidth="4" />
        {/* Ladder rungs */}
        {LADDER_RUNGS.map((y) => (
          <line key={y} x1="481" y1={y} x2="492" y2={y} stroke="#BF360C" strokeWidth="3" />
        ))}
        {/* Slide surface */}
        <path d="M 554,230 Q 642,322 664,480" stroke="#FF8F00" strokeWidth="26" fill="none" strokeLinecap="round" />
        <path d="M 554,230 Q 642,322 664,480" stroke="#FFD54F" strokeWidth="20" fill="none" strokeLinecap="round" />
        {/* Slide rails */}
        <path d="M 558,223 Q 650,317 670,480" stroke="#E65100" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 549,237 Q 634,330 655,480" stroke="#E65100" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* ═══════════════════════════
            STAGE 4 — CAROUSEL
        ═══════════════════════════ */}
        {/* Center pole */}
        <line x1="790" y1="372" x2="790" y2="462" stroke="#5D4037" strokeWidth="12" strokeLinecap="round" />
        {/* Canopy */}
        <path d="M 706,374 Q 790,330 874,374 Z" fill="#e2165f" />
        <path d="M 712,377 Q 790,336 868,377 Q 856,386 790,382 Q 724,386 712,377 Z" fill="#FF80AB" opacity="0.65" />
        {/* Hanging rods */}
        <line x1="740" y1="370" x2="728" y2="410" stroke="#8D6E63" strokeWidth="5" strokeLinecap="round" />
        <line x1="790" y1="368" x2="790" y2="410" stroke="#8D6E63" strokeWidth="5" strokeLinecap="round" />
        <line x1="840" y1="370" x2="852" y2="410" stroke="#8D6E63" strokeWidth="5" strokeLinecap="round" />
        {/* Rotating platform */}
        <ellipse cx="790" cy="415" rx="78" ry="20" fill="#795548" />
        <ellipse cx="790" cy="410" rx="72" ry="17" fill="#A1887F" />
        {/* Spokes */}
        <line x1="790" y1="375" x2="722" y2="410" stroke="#5D4037" strokeWidth="7" strokeLinecap="round" />
        <line x1="790" y1="375" x2="858" y2="410" stroke="#5D4037" strokeWidth="7" strokeLinecap="round" />
        <line x1="790" y1="375" x2="754" y2="372" stroke="#5D4037" strokeWidth="7" strokeLinecap="round" />
        <line x1="790" y1="375" x2="826" y2="372" stroke="#5D4037" strokeWidth="7" strokeLinecap="round" />
        {/* Handle rings */}
        <circle cx="726" cy="406" r="7" fill="#b80049" />
        <circle cx="854" cy="406" r="7" fill="#b80049" />
        <circle cx="755" cy="368" r="6" fill="#b80049" />
        <circle cx="825" cy="368" r="6" fill="#b80049" />

        {/* ═══════════════════════════
            DECORATIVE TREE (between carousel & castle)
        ═══════════════════════════ */}
        <rect x="920" y="398" width="14" height="80" fill="#5D4037" rx="3" />
        <circle cx="927" cy="380" r="38" fill="#388E3C" />
        <circle cx="910" cy="394" r="27" fill="#43A047" />
        <circle cx="944" cy="390" r="25" fill="#2E7D32" />

        {/* ═══════════════════════════
            STAGE 5 — CASTLE
        ═══════════════════════════ */}
        {/* Side tower left */}
        <rect x="962" y="305" width="36" height="175" fill="#8E24AA" rx="4" />
        <rect x="958" y="288" width="12" height="24" fill="#6A1B9A" rx="2" />
        <rect x="973" y="288" width="12" height="24" fill="#6A1B9A" rx="2" />
        <rect x="988" y="288" width="12" height="24" fill="#6A1B9A" rx="2" />
        <rect x="968" y="340" width="22" height="26" fill="#CE93D8" rx="3" />
        {/* Main tower body */}
        <rect x="992" y="268" width="96" height="212" fill="url(#castleGrad)" rx="6" />
        {/* Battlements */}
        <rect x="992" y="247" width="18" height="28" fill="#7B1FA2" rx="3" />
        <rect x="1017" y="247" width="18" height="28" fill="#7B1FA2" rx="3" />
        <rect x="1042" y="247" width="18" height="28" fill="#7B1FA2" rx="3" />
        <rect x="1067" y="247" width="18" height="28" fill="#7B1FA2" rx="3" />
        {/* Windows */}
        <rect x="1008" y="306" width="24" height="30" fill="#CE93D8" rx="3" />
        <rect x="1048" y="306" width="24" height="30" fill="#CE93D8" rx="3" />
        <rect x="1008" y="354" width="24" height="30" fill="#CE93D8" rx="3" />
        <rect x="1048" y="354" width="24" height="30" fill="#CE93D8" rx="3" />
        {/* Door arch */}
        <path d="M 1024,480 L 1024,430 Q 1040,412 1056,430 L 1056,480 Z" fill="#4A148C" />
        {/* Side tower right */}
        <rect x="1082" y="305" width="36" height="175" fill="#8E24AA" rx="4" />
        <rect x="1078" y="288" width="12" height="24" fill="#6A1B9A" rx="2" />
        <rect x="1093" y="288" width="12" height="24" fill="#6A1B9A" rx="2" />
        <rect x="1108" y="288" width="12" height="24" fill="#6A1B9A" rx="2" />
        <rect x="1090" y="340" width="22" height="26" fill="#CE93D8" rx="3" />
        {/* Flagpole */}
        <line x1="1040" y1="170" x2="1040" y2="249" stroke="#FFD700" strokeWidth="5" strokeLinecap="round" />
        {/* Flag */}
        <path d="M 1040,172 L 1080,186 L 1040,200 Z" fill="#b9f61d" />
        {/* Star cap */}
        <circle cx="1040" cy="170" r="8" fill="#FFD700" />

        {/* ── Flowers near sandbox ── */}
        <circle cx="36" cy="471" r="5" fill="#FF80AB" />
        <circle cx="42" cy="468" r="5" fill="#FF4081" />
        <circle cx="32" cy="468" r="4" fill="#F48FB1" />
        <line x1="38" y1="473" x2="38" y2="482" stroke="#4CAF50" strokeWidth="2" />
      </svg>

      {/* ── Stage nodes overlaid on equipment ── */}
      {STAGES.map((stage, idx) => {
        const isActive = stage.id === activeStageId
        const status = getStageStatus(stage.id)
        const isLocked = status === 'locked'
        const isCompleted = status === 'completed'
        const isUnlocked = !isLocked
        const pos = NODE_POSITIONS[idx]

        return (
          <div
            key={stage.id}
            className="absolute"
            style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative flex flex-col items-center group">
              {/* NOW badge */}
              {isActive && (
                <div className="absolute -top-10 px-3 py-1 bg-lime text-ink-800 text-xs font-bold rounded-full whitespace-nowrap shadow-lg animate-floating">
                  SEKARANG!
                </div>
              )}

              <button
                disabled={isLocked}
                className={[
                  'relative w-16 h-16 lg:w-20 lg:h-20 rounded-full font-bold text-xl lg:text-2xl transition-all',
                  'flex items-center justify-center shadow-xl border-4 border-white',
                  isActive    ? 'ring-4 ring-white ring-offset-2 scale-110 animate-floating' : '',
                  isCompleted ? 'bg-forest-500 text-white' : '',
                  isActive && !isCompleted ? 'bg-lime text-ink-800' : '',
                  isLocked    ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60' : 'hover:scale-110 hover:shadow-2xl cursor-pointer',
                ].join(' ')}
                style={
                  isUnlocked && !isActive && !isCompleted
                    ? { background: stage.color, color: 'white' }
                    : undefined
                }
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-2xl">check</span>
                ) : idx === STAGES.length - 1 ? (
                  <span className="material-symbols-outlined text-2xl">star</span>
                ) : (
                  <span className="font-black">{idx + 1}</span>
                )}
              </button>

              {/* Stage name on hover */}
              <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="text-xs font-semibold text-ink-800 bg-white/90 px-3 py-1 rounded-lg whitespace-nowrap shadow-md">
                  {stage.name}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      {/* ── Header (floating) ── */}
      <div className="absolute top-0 inset-x-0 bg-white/70 backdrop-blur-sm flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-lime rounded-2xl flex items-center justify-center shadow-sm">
            <span className="text-ink-800 font-black text-sm select-none">V²</span>
          </div>
          <span className="font-display font-bold text-ink-800 text-lg">VINUR</span>
        </div>

        {/* Center: Tour button */}
        <button
          onClick={() => go('dashboard')}
          className="font-sans flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest-500 text-white font-semibold text-sm hover:bg-forest-600 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>supervisor_account</span>
          Go to Tour for Parents
        </button>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-2xl text-ink-600 hover:text-ink-800 transition-colors">
            volume_up
          </button>
          <button
            onClick={() => go('progress')}
            className="font-sans px-4 py-2 rounded-lg bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-colors"
          >
            Progress
          </button>
          <button
            onClick={() => go('dashboard')}
            className="material-symbols-outlined text-2xl text-ink-600 hover:text-ink-800 transition-colors"
          >
            close
          </button>
        </div>
      </div>

      {/* ── Bottom info bar (floating) ── */}
      <div className="absolute bottom-0 inset-x-0 bg-white/70 backdrop-blur-sm px-6 lg:px-10 py-4">
        <p className="text-sm text-ink-600">
          <strong>STAGE SEKARANG:</strong> {currentStage.name}
          {currentStageIndex < STAGES.length - 1 && (
            <span className="ml-4 text-ink-500">
              | <strong>BERIKUTNYA:</strong> {STAGES[currentStageIndex + 1].name}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
