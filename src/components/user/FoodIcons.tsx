// 3D Food-themed icon components with depth, layers, and perspective

export function BurgerIcon({ className = "", style = {}, ...props }) {
  return (
    <div className={className} style={{ transformStyle: 'preserve-3d', ...style }} {...props}>
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
        <defs>
          <radialGradient id="burger-bun-top">
            <stop offset="0%" stopColor="#f59e0b"/>
            <stop offset="100%" stopColor="#d97706"/>
          </radialGradient>
          <radialGradient id="burger-bun-bottom">
            <stop offset="0%" stopColor="#d97706"/>
            <stop offset="100%" stopColor="#b45309"/>
          </radialGradient>
          <linearGradient id="burger-patty" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f"/>
            <stop offset="50%" stopColor="#451a03"/>
            <stop offset="100%" stopColor="#1c0a00"/>
          </linearGradient>
          <linearGradient id="burger-cheese" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047"/>
            <stop offset="100%" stopColor="#fbbf24"/>
          </linearGradient>
        </defs>
        
        {/* Bottom bun - back layer */}
        <ellipse cx="50" cy="95" rx="38" ry="14" fill="#92400e" opacity="0.4"/>
        <ellipse cx="50" cy="93" rx="36" ry="12" fill="url(#burger-bun-bottom)"/>
        <ellipse cx="50" cy="91" rx="33" ry="10" fill="#f59e0b" opacity="0.3"/>
        
        {/* Tomato layer with depth */}
        <ellipse cx="50" cy="83" rx="32" ry="7" fill="#7f1d1d" opacity="0.5"/>
        <ellipse cx="50" cy="82" rx="31" ry="6" fill="#dc2626"/>
        <ellipse cx="50" cy="81" rx="28" ry="5" fill="#ef4444" opacity="0.6"/>
        
        {/* Patty with 3D depth */}
        <ellipse cx="50" cy="73" rx="34" ry="10" fill="#1c0a00" opacity="0.6"/>
        <ellipse cx="50" cy="71" rx="33" ry="9" fill="url(#burger-patty)"/>
        <ellipse cx="50" cy="69" rx="30" ry="7" fill="#78350f" opacity="0.4"/>
        {/* Patty texture */}
        <ellipse cx="45" cy="70" rx="4" ry="2" fill="#451a03" opacity="0.8"/>
        <ellipse cx="55" cy="71" rx="3" ry="2" fill="#451a03" opacity="0.8"/>
        
        {/* Cheese with 3D drip effect */}
        <path d="M 18 58 L 20 68 L 30 68 L 28 58 Z" fill="url(#burger-cheese)"/>
        <path d="M 32 58 L 34 68 L 44 68 L 42 58 Z" fill="url(#burger-cheese)"/>
        <path d="M 46 58 L 48 68 L 58 68 L 56 58 Z" fill="url(#burger-cheese)"/>
        <path d="M 60 58 L 62 68 L 72 68 L 70 58 Z" fill="url(#burger-cheese)"/>
        <path d="M 74 58 L 76 68 L 82 68 L 80 58 Z" fill="url(#burger-cheese)"/>
        {/* Cheese front layer */}
        <ellipse cx="50" cy="58" rx="32" ry="7" fill="#f59e0b" opacity="0.3"/>
        <ellipse cx="50" cy="57" rx="31" ry="6" fill="url(#burger-cheese)"/>
        
        {/* Lettuce with wavy 3D effect */}
        <path d="M 18 48 Q 25 44, 32 48 T 46 48 T 60 48 T 74 48 T 82 48" 
              fill="#15803d" stroke="#166534" strokeWidth="1.5"/>
        <path d="M 20 46 Q 27 43, 34 46 T 48 46 T 62 46 T 76 46 T 80 46" 
              fill="#22c55e" opacity="0.8"/>
        <path d="M 22 45 Q 29 42, 36 45 T 50 45 T 64 45 T 78 45" 
              fill="#4ade80" opacity="0.5"/>
        
        {/* Top bun with depth and highlights */}
        <ellipse cx="50" cy="35" rx="38" ry="16" fill="#78350f" opacity="0.4"/>
        <ellipse cx="50" cy="33" rx="37" ry="15" fill="url(#burger-bun-top)"/>
        <ellipse cx="50" cy="31" rx="34" ry="13" fill="#fbbf24"/>
        <ellipse cx="50" cy="29" rx="30" ry="11" fill="#fde047" opacity="0.4"/>
        
        {/* Sesame seeds with 3D effect */}
        <ellipse cx="35" cy="28" rx="2.5" ry="2" fill="#fef3c7"/>
        <ellipse cx="35" cy="27" rx="2" ry="1.5" fill="#fff" opacity="0.8"/>
        <ellipse cx="50" cy="26" rx="2.5" ry="2" fill="#fef3c7"/>
        <ellipse cx="50" cy="25" rx="2" ry="1.5" fill="#fff" opacity="0.8"/>
        <ellipse cx="65" cy="29" rx="2.5" ry="2" fill="#fef3c7"/>
        <ellipse cx="65" cy="28" rx="2" ry="1.5" fill="#fff" opacity="0.8"/>
        <ellipse cx="42" cy="31" rx="2.5" ry="2" fill="#fef3c7"/>
        <ellipse cx="42" cy="30" rx="2" ry="1.5" fill="#fff" opacity="0.8"/>
        <ellipse cx="58" cy="30" rx="2.5" ry="2" fill="#fef3c7"/>
        <ellipse cx="58" cy="29" rx="2" ry="1.5" fill="#fff" opacity="0.8"/>
        
        {/* Top highlight */}
        <ellipse cx="45" cy="24" rx="8" ry="4" fill="#fff" opacity="0.3"/>
      </svg>
    </div>
  );
}

export function PizzaIcon({ className = "", style = {}, ...props }) {
  return (
    <div className={className} style={{ transformStyle: 'preserve-3d', ...style }} {...props}>
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
        <defs>
          <radialGradient id="pizza-dough">
            <stop offset="0%" stopColor="#fde047"/>
            <stop offset="60%" stopColor="#fbbf24"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </radialGradient>
          <radialGradient id="pepperoni-3d">
            <stop offset="0%" stopColor="#dc2626"/>
            <stop offset="70%" stopColor="#991b1b"/>
            <stop offset="100%" stopColor="#7f1d1d"/>
          </radialGradient>
        </defs>
        
        {/* Pizza shadow */}
        <path d="M 50 15 L 92 95 L 50 85 L 8 95 Z" fill="#000" opacity="0.3" transform="translate(2, 3)"/>
        
        {/* Pizza slice base with 3D depth */}
        <path d="M 50 15 L 90 93 L 50 83 L 10 93 Z" fill="#b45309"/>
        <path d="M 50 15 L 89 92 L 50 82 L 11 92 Z" fill="url(#pizza-dough)"/>
        
        {/* Cheese layer with strings */}
        <path d="M 50 18 L 87 90 L 50 81 L 13 90 Z" fill="#fde047" opacity="0.7"/>
        <path d="M 50 20 L 85 88 L 50 80 L 15 88 Z" fill="#fbbf24" opacity="0.5"/>
        
        {/* Crust edge with 3D depth */}
        <path d="M 10 93 Q 50 98, 90 93" fill="#92400e"/>
        <path d="M 11 92 Q 50 96, 89 92" fill="#b45309"/>
        <path d="M 12 91 Q 50 95, 88 91" fill="#d97706" opacity="0.8"/>
        
        {/* Pepperoni with 3D shadows and highlights */}
        <circle cx="45" cy="50" r="7" fill="#7f1d1d" opacity="0.6"/>
        <circle cx="44" cy="49" r="6.5" fill="url(#pepperoni-3d)"/>
        <circle cx="43" cy="48" r="5" fill="#ef4444" opacity="0.3"/>
        <ellipse cx="42" cy="47" rx="2" ry="1.5" fill="#fff" opacity="0.2"/>
        
        <circle cx="60" cy="60" r="7" fill="#7f1d1d" opacity="0.6"/>
        <circle cx="59" cy="59" r="6.5" fill="url(#pepperoni-3d)"/>
        <circle cx="58" cy="58" r="5" fill="#ef4444" opacity="0.3"/>
        <ellipse cx="57" cy="57" rx="2" ry="1.5" fill="#fff" opacity="0.2"/>
        
        <circle cx="35" cy="65" r="6" fill="#7f1d1d" opacity="0.6"/>
        <circle cx="34" cy="64" r="5.5" fill="url(#pepperoni-3d)"/>
        <circle cx="33" cy="63" r="4" fill="#ef4444" opacity="0.3"/>
        <ellipse cx="32" cy="62" rx="1.5" ry="1" fill="#fff" opacity="0.2"/>
        
        <circle cx="55" cy="75" r="6" fill="#7f1d1d" opacity="0.6"/>
        <circle cx="54" cy="74" r="5.5" fill="url(#pepperoni-3d)"/>
        <circle cx="53" cy="73" r="4" fill="#ef4444" opacity="0.3"/>
        <ellipse cx="52" cy="72" rx="1.5" ry="1" fill="#fff" opacity="0.2"/>
        
        {/* Mushroom slices with 3D effect */}
        <ellipse cx="30" cy="55" rx="4" ry="3" fill="#d4d4d4" opacity="0.3"/>
        <ellipse cx="29" cy="54" rx="3.5" ry="2.5" fill="#e5e5e5"/>
        <path d="M 27 54 Q 29 52, 31 54" fill="#a3a3a3" opacity="0.4"/>
        
        <ellipse cx="65" cy="70" rx="4" ry="3" fill="#d4d4d4" opacity="0.3"/>
        <ellipse cx="64" cy="69" rx="3.5" ry="2.5" fill="#e5e5e5"/>
        <path d="M 62 69 Q 64 67, 66 69" fill="#a3a3a3" opacity="0.4"/>
        
        {/* Cheese highlights - stringy effect */}
        <path d="M 40 45 Q 42 50, 44 55" stroke="#fef3c7" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <path d="M 55 55 Q 57 63, 59 70" stroke="#fef3c7" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <ellipse cx="50" cy="65" rx="4" ry="3" fill="#fef3c7" opacity="0.5"/>
      </svg>
    </div>
  );
}

export function TacoIcon({ className = "", style = {}, ...props }) {
  return (
    <div className={className} style={{ transformStyle: 'preserve-3d', ...style }} {...props}>
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))' }}>
        <defs>
          <linearGradient id="taco-shell-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b"/>
            <stop offset="50%" stopColor="#d97706"/>
            <stop offset="100%" stopColor="#b45309"/>
          </linearGradient>
          <linearGradient id="taco-shell-inner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706"/>
            <stop offset="100%" stopColor="#92400e"/>
          </linearGradient>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="50" cy="98" rx="35" ry="8" fill="#000" opacity="0.3"/>
        
        {/* Taco shell outer with 3D depth */}
        <path d="M 20 85 Q 50 35, 80 85 L 78 88 Q 50 40, 22 88 Z" 
              fill="url(#taco-shell-outer)" stroke="#b45309" strokeWidth="2.5"/>
        
        {/* Shell texture lines for 3D effect */}
        <path d="M 25 82 Q 50 42, 75 82" stroke="#92400e" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M 28 79 Q 50 45, 72 79" stroke="#92400e" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M 31 76 Q 50 48, 69 76" stroke="#92400e" strokeWidth="1" fill="none" opacity="0.4"/>
        
        {/* Inner shell shadow */}
        <path d="M 22 88 Q 50 40, 78 88 L 74 91 Q 50 47, 26 91 Z" 
              fill="url(#taco-shell-inner)"/>
        <path d="M 26 91 Q 50 47, 74 91 L 70 93 Q 50 52, 30 93 Z" 
              fill="#451a03" opacity="0.5"/>
        
        {/* Lettuce with 3D layers */}
        <path d="M 30 87 Q 35 80, 40 87 T 50 87 T 60 87 T 70 87" 
              fill="#166534" opacity="0.6"/>
        <path d="M 31 86 Q 36 79, 41 86 T 51 86 T 61 86 T 69 86" 
              fill="#22c55e" stroke="#15803d" strokeWidth="1"/>
        <path d="M 32 85 Q 37 79, 42 85 T 52 85 T 62 85 T 68 85" 
              fill="#4ade80" opacity="0.6"/>
        
        {/* Meat with 3D texture */}
        <ellipse cx="50" cy="93" rx="22" ry="7" fill="#451a03" opacity="0.7"/>
        <ellipse cx="50" cy="92" rx="21" ry="6" fill="#78350f"/>
        <ellipse cx="50" cy="91" rx="20" ry="5" fill="#92400e" opacity="0.4"/>
        {/* Meat texture bumps */}
        <ellipse cx="42" cy="91" rx="3" ry="2" fill="#451a03" opacity="0.6"/>
        <ellipse cx="50" cy="92" rx="3" ry="2" fill="#451a03" opacity="0.6"/>
        <ellipse cx="58" cy="91" rx="3" ry="2" fill="#451a03" opacity="0.6"/>
        
        {/* Cheese drips with 3D effect */}
        <path d="M 32 88 L 34 96 L 38 96 L 36 88 Z" fill="#f59e0b" opacity="0.3"/>
        <path d="M 33 88 L 35 95 L 37 95 L 35 88 Z" fill="#fbbf24"/>
        <path d="M 34 89 L 35 94 L 36 94 L 35 89 Z" fill="#fde047" opacity="0.6"/>
        
        <path d="M 48 88 L 50 96 L 54 96 L 52 88 Z" fill="#f59e0b" opacity="0.3"/>
        <path d="M 49 88 L 51 95 L 53 95 L 51 88 Z" fill="#fbbf24"/>
        <path d="M 50 89 L 51 94 L 52 94 L 51 89 Z" fill="#fde047" opacity="0.6"/>
        
        <path d="M 64 88 L 66 96 L 70 96 L 68 88 Z" fill="#f59e0b" opacity="0.3"/>
        <path d="M 65 88 L 67 95 L 69 95 L 67 88 Z" fill="#fbbf24"/>
        <path d="M 66 89 L 67 94 L 68 94 L 67 89 Z" fill="#fde047" opacity="0.6"/>
        
        {/* Tomato chunks with highlights */}
        <ellipse cx="40" cy="88" rx="3" ry="2.5" fill="#7f1d1d" opacity="0.5"/>
        <circle cx="40" cy="87" r="2.5" fill="#dc2626"/>
        <ellipse cx="39" cy="86" rx="1" ry="0.8" fill="#fca5a5" opacity="0.6"/>
        
        <ellipse cx="55" cy="87" rx="3" ry="2.5" fill="#7f1d1d" opacity="0.5"/>
        <circle cx="55" cy="86" r="2.5" fill="#dc2626"/>
        <ellipse cx="54" cy="85" rx="1" ry="0.8" fill="#fca5a5" opacity="0.6"/>
        
        <ellipse cx="48" cy="89" rx="2.5" ry="2" fill="#7f1d1d" opacity="0.5"/>
        <circle cx="48" cy="88" r="2" fill="#dc2626"/>
        <ellipse cx="47" cy="87" rx="0.8" ry="0.6" fill="#fca5a5" opacity="0.6"/>
      </svg>
    </div>
  );
}

export function SushiIcon({ className = "", style = {}, ...props }) {
  return (
    <div className={className} style={{ transformStyle: 'preserve-3d', ...style }} {...props}>
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))' }}>
        <defs>
          <linearGradient id="sushi-rice" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7"/>
            <stop offset="100%" stopColor="#fde68a"/>
          </linearGradient>
          <radialGradient id="salmon-gradient">
            <stop offset="0%" stopColor="#fdba74"/>
            <stop offset="100%" stopColor="#fb923c"/>
          </radialGradient>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="50" cy="95" rx="28" ry="6" fill="#000" opacity="0.3"/>
        
        {/* Nori (seaweed) wrap with 3D depth */}
        <rect x="23" y="48" width="54" height="40" rx="4" fill="#000" opacity="0.4"/>
        <rect x="24" y="47" width="52" height="39" rx="4" fill="#0a0a0a" stroke="#000" strokeWidth="2"/>
        <rect x="25" y="48" width="50" height="37" rx="3" fill="#1a1a1a"/>
        
        {/* Nori texture */}
        <line x1="27" y1="52" x2="73" y2="52" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.5"/>
        <line x1="27" y1="58" x2="73" y2="58" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.5"/>
        <line x1="27" y1="64" x2="73" y2="64" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.5"/>
        <line x1="27" y1="70" x2="73" y2="70" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.5"/>
        <line x1="27" y1="76" x2="73" y2="76" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.5"/>
        <line x1="27" y1="82" x2="73" y2="82" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.5"/>
        
        {/* Rice top with 3D perspective */}
        <ellipse cx="50" cy="47" rx="28" ry="10" fill="#d4a574" opacity="0.4"/>
        <ellipse cx="50" cy="46" rx="27" ry="9" fill="url(#sushi-rice)" stroke="#fde68a" strokeWidth="1.5"/>
        <ellipse cx="50" cy="45" rx="25" ry="8" fill="#fff" opacity="0.3"/>
        
        {/* Rice bottom with 3D perspective */}
        <ellipse cx="50" cy="88" rx="28" ry="10" fill="#d4a574" opacity="0.4"/>
        <ellipse cx="50" cy="87" rx="27" ry="9" fill="url(#sushi-rice)" stroke="#fde68a" strokeWidth="1.5"/>
        <ellipse cx="50" cy="86" rx="25" ry="8" fill="#fff" opacity="0.3"/>
        
        {/* Salmon layer with 3D depth */}
        <ellipse cx="50" cy="57" rx="20" ry="7" fill="#ea580c" opacity="0.5"/>
        <ellipse cx="50" cy="56" rx="19" ry="6" fill="url(#salmon-gradient)"/>
        <ellipse cx="50" cy="55" rx="17" ry="5" fill="#fdba74" opacity="0.5"/>
        {/* Salmon fat lines */}
        <path d="M 35 55 Q 50 57, 65 55" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M 37 56 Q 50 58, 63 56" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.3"/>
        
        {/* Avocado with 3D layers */}
        <ellipse cx="50" cy="67" rx="18" ry="6" fill="#15803d" opacity="0.5"/>
        <ellipse cx="50" cy="66" rx="17" ry="5" fill="#22c55e"/>
        <ellipse cx="50" cy="65" rx="15" ry="4" fill="#4ade80" opacity="0.6"/>
        {/* Avocado center */}
        <ellipse cx="50" cy="65" rx="4" ry="2" fill="#dcfce7" opacity="0.8"/>
        
        {/* Cucumber with 3D effect */}
        <ellipse cx="50" cy="77" rx="16" ry="5" fill="#166534" opacity="0.5"/>
        <ellipse cx="50" cy="76" rx="15" ry="4" fill="#86efac"/>
        <ellipse cx="50" cy="75" rx="13" ry="3" fill="#bbf7d0" opacity="0.7"/>
        {/* Cucumber seeds */}
        <ellipse cx="46" cy="75" rx="1" ry="0.8" fill="#22c55e" opacity="0.6"/>
        <ellipse cx="50" cy="76" rx="1" ry="0.8" fill="#22c55e" opacity="0.6"/>
        <ellipse cx="54" cy="75" rx="1" ry="0.8" fill="#22c55e" opacity="0.6"/>
        
        {/* Rice grain texture with 3D dots */}
        <circle cx="35" cy="44" r="1" fill="#fbbf24" opacity="0.6"/>
        <circle cx="45" cy="43" r="1" fill="#fbbf24" opacity="0.6"/>
        <circle cx="55" cy="44" r="1" fill="#fbbf24" opacity="0.6"/>
        <circle cx="65" cy="43" r="1" fill="#fbbf24" opacity="0.6"/>
        <circle cx="40" cy="45" r="0.8" fill="#f59e0b" opacity="0.5"/>
        <circle cx="50" cy="44" r="0.8" fill="#f59e0b" opacity="0.5"/>
        <circle cx="60" cy="45" r="0.8" fill="#f59e0b" opacity="0.5"/>
        
        {/* Top highlight */}
        <ellipse cx="48" cy="42" rx="10" ry="3" fill="#fff" opacity="0.2"/>
      </svg>
    </div>
  );
}

export function DonutIcon({ className = "", style = {}, ...props }) {
  return (
    <div className={className} style={{ transformStyle: 'preserve-3d', ...style }} {...props}>
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
        <defs>
          <radialGradient id="donut-dough">
            <stop offset="0%" stopColor="#fde047"/>
            <stop offset="70%" stopColor="#fbbf24"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </radialGradient>
          <radialGradient id="frosting-pink">
            <stop offset="0%" stopColor="#f9a8d4"/>
            <stop offset="50%" stopColor="#ec4899"/>
            <stop offset="100%" stopColor="#db2777"/>
          </radialGradient>
          <radialGradient id="hole-shadow">
            <stop offset="0%" stopColor="#000"/>
            <stop offset="100%" stopColor="#0f0f0f"/>
          </radialGradient>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="50" cy="95" rx="38" ry="10" fill="#000" opacity="0.3"/>
        
        {/* Donut base bottom layer (3D depth) */}
        <circle cx="50" cy="62" r="38" fill="#b45309" opacity="0.4"/>
        <circle cx="50" cy="60" r="37" fill="url(#donut-dough)"/>
        <circle cx="50" cy="58" r="36" fill="#fde047" opacity="0.3"/>
        
        {/* Donut hole bottom (3D depth) */}
        <circle cx="50" cy="62" r="18" fill="#000" opacity="0.6"/>
        <circle cx="50" cy="60" r="17" fill="url(#hole-shadow)"/>
        <circle cx="50" cy="58" r="16" fill="#1a1a1a"/>
        <circle cx="50" cy="56" r="15" fill="#0f0f0f"/>
        
        {/* Frosting with 3D drip effect */}
        <path d="M 12 52 Q 15 40, 25 38 Q 30 36, 35 38 T 50 35 T 65 38 T 75 38 Q 85 40, 88 52 
                 Q 88 58, 85 62 Q 83 64, 80 64 T 70 65 T 60 64 T 50 65 T 40 64 T 30 65 T 20 64 Q 15 64, 12 58 Z" 
              fill="#be185d" opacity="0.5"/>
        <path d="M 13 51 Q 16 40, 26 38 Q 31 36, 36 38 T 50 35 T 64 38 T 74 38 Q 84 40, 87 51 
                 Q 87 57, 84 61 Q 82 63, 79 63 T 70 64 T 60 63 T 50 64 T 40 63 T 30 64 T 21 63 Q 16 63, 13 57 Z" 
              fill="url(#frosting-pink)" stroke="#db2777" strokeWidth="1.5"/>
        <path d="M 14 50 Q 17 41, 27 39 Q 32 37, 37 39 T 50 37 T 63 39 T 73 39 Q 83 41, 86 50 
                 Q 86 55, 83 58 Q 81 60, 78 60 T 70 61 T 60 60 T 50 61 T 40 60 T 30 61 T 22 60 Q 17 60, 14 55 Z" 
              fill="#f9a8d4" opacity="0.6"/>
        
        {/* Frosting drips with 3D layers */}
        <ellipse cx="30" cy="65" rx="4" ry="6" fill="#be185d" opacity="0.5"/>
        <ellipse cx="30" cy="64" rx="3.5" ry="5.5" fill="#ec4899"/>
        <ellipse cx="30" cy="63" rx="3" ry="5" fill="#f9a8d4" opacity="0.4"/>
        
        <ellipse cx="50" cy="67" rx="4" ry="7" fill="#be185d" opacity="0.5"/>
        <ellipse cx="50" cy="66" rx="3.5" ry="6.5" fill="#ec4899"/>
        <ellipse cx="50" cy="65" rx="3" ry="6" fill="#f9a8d4" opacity="0.4"/>
        
        <ellipse cx="70" cy="65" rx="4" ry="6" fill="#be185d" opacity="0.5"/>
        <ellipse cx="70" cy="64" rx="3.5" ry="5.5" fill="#ec4899"/>
        <ellipse cx="70" cy="63" rx="3" ry="5" fill="#f9a8d4" opacity="0.4"/>
        
        {/* Sprinkles with 3D depth and shadows */}
        <rect x="24" y="43" width="9" height="2.5" fill="#b91c1c" rx="1" transform="rotate(15 28.5 44.25)"/>
        <rect x="25" y="42" width="8" height="2" fill="#ef4444" rx="1" transform="rotate(15 29 43)"/>
        
        <rect x="39" y="40" width="9" height="2.5" fill="#1e40af" rx="1" transform="rotate(-20 43.5 41.25)"/>
        <rect x="40" y="39" width="8" height="2" fill="#3b82f6" rx="1" transform="rotate(-20 44 40)"/>
        
        <rect x="54" y="42" width="9" height="2.5" fill="#15803d" rx="1" transform="rotate(30 58.5 43.25)"/>
        <rect x="55" y="41" width="8" height="2" fill="#22c55e" rx="1" transform="rotate(30 59 42)"/>
        
        <rect x="69" y="45" width="9" height="2.5" fill="#b45309" rx="1" transform="rotate(-15 73.5 46.25)"/>
        <rect x="70" y="44" width="8" height="2" fill="#fbbf24" rx="1" transform="rotate(-15 74 45)"/>
        
        <rect x="34" y="51" width="7" height="2.5" fill="#6b21a8" rx="1" transform="rotate(45 37.5 52.25)"/>
        <rect x="35" y="50" width="6" height="2" fill="#8b5cf6" rx="1" transform="rotate(45 38 51)"/>
        
        <rect x="49" y="48" width="7" height="2.5" fill="#c2410c" rx="1" transform="rotate(-30 52.5 49.25)"/>
        <rect x="50" y="47" width="6" height="2" fill="#f97316" rx="1" transform="rotate(-30 53 48)"/>
        
        <rect x="64" y="53" width="7" height="2.5" fill="#0e7490" rx="1" transform="rotate(20 67.5 54.25)"/>
        <rect x="65" y="52" width="6" height="2" fill="#06b6d4" rx="1" transform="rotate(20 68 53)"/>
        
        <rect x="43" y="56" width="6" height="2.5" fill="#be123c" rx="1" transform="rotate(-10 46 57.25)"/>
        <rect x="44" y="55" width="5" height="2" fill="#f43f5e" rx="1" transform="rotate(-10 46.5 56)"/>
        
        {/* Top shine/highlight */}
        <ellipse cx="45" cy="40" rx="12" ry="5" fill="#fff" opacity="0.3"/>
        <ellipse cx="48" cy="38" rx="8" ry="3" fill="#fff" opacity="0.4"/>
      </svg>
    </div>
  );
}

export function IceCreamIcon({ className = "", style = {}, ...props }) {
  return (
    <div className={className} style={{ transformStyle: 'preserve-3d', ...style }} {...props}>
      <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
        <defs>
          <linearGradient id="cone-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b"/>
            <stop offset="50%" stopColor="#d97706"/>
            <stop offset="100%" stopColor="#b45309"/>
          </linearGradient>
          <radialGradient id="scoop-orange">
            <stop offset="0%" stopColor="#fdba74"/>
            <stop offset="70%" stopColor="#fb923c"/>
            <stop offset="100%" stopColor="#f97316"/>
          </radialGradient>
          <radialGradient id="scoop-yellow">
            <stop offset="0%" stopColor="#fef08a"/>
            <stop offset="70%" stopColor="#fde047"/>
            <stop offset="100%" stopColor="#fbbf24"/>
          </radialGradient>
          <radialGradient id="scoop-pink">
            <stop offset="0%" stopColor="#fbcfe8"/>
            <stop offset="70%" stopColor="#f9a8d4"/>
            <stop offset="100%" stopColor="#ec4899"/>
          </radialGradient>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="50" cy="115" rx="20" ry="5" fill="#000" opacity="0.3"/>
        
        {/* Cone with 3D depth */}
        <path d="M 32 70 L 50 110 L 68 70 Z" fill="#78350f" opacity="0.5"/>
        <path d="M 33 69 L 50 108 L 67 69 Z" fill="url(#cone-gradient)" stroke="#b45309" strokeWidth="2"/>
        <path d="M 34 68 L 50 106 L 66 68 Z" fill="#f59e0b" opacity="0.3"/>
        
        {/* Cone waffle pattern */}
        <line x1="38" y1="74" x2="44" y2="85" stroke="#92400e" strokeWidth="1.5"/>
        <line x1="45" y1="74" x2="50" y2="85" stroke="#92400e" strokeWidth="1.5"/>
        <line x1="52" y1="74" x2="56" y2="85" stroke="#92400e" strokeWidth="1.5"/>
        <line x1="59" y1="74" x2="62" y2="85" stroke="#92400e" strokeWidth="1.5"/>
        
        <line x1="40" y1="80" x2="60" y2="80" stroke="#92400e" strokeWidth="1.5"/>
        <line x1="42" y1="87" x2="58" y2="87" stroke="#92400e" strokeWidth="1.5"/>
        <line x1="44" y1="94" x2="56" y2="94" stroke="#92400e" strokeWidth="1.5"/>
        <line x1="46" y1="101" x2="54" y2="101" stroke="#92400e" strokeWidth="1.5"/>
        
        {/* Diagonal cross pattern */}
        <line x1="43" y1="79" x2="48" y2="90" stroke="#92400e" strokeWidth="1"/>
        <line x1="52" y1="79" x2="57" y2="90" stroke="#92400e" strokeWidth="1"/>
        <line x1="45" y1="88" x2="50" y2="98" stroke="#92400e" strokeWidth="1"/>
        
        {/* Bottom scoop (orange) with 3D depth */}
        <circle cx="50" cy="63" r="19" fill="#c2410c" opacity="0.4"/>
        <circle cx="50" cy="61" r="18" fill="url(#scoop-orange)" stroke="#f97316" strokeWidth="1.5"/>
        <circle cx="50" cy="59" rx="16" ry="15" fill="#fdba74" opacity="0.4"/>
        {/* Texture dots */}
        <circle cx="45" cy="59" r="1.5" fill="#c2410c" opacity="0.3"/>
        <circle cx="52" cy="61" r="1.5" fill="#c2410c" opacity="0.3"/>
        <circle cx="48" cy="64" r="1.2" fill="#c2410c" opacity="0.3"/>
        {/* Highlight */}
        <ellipse cx="55" cy="56" rx="5" ry="4" fill="#fff" opacity="0.5"/>
        <ellipse cx="57" cy="54" rx="3" ry="2" fill="#fff" opacity="0.7"/>
        
        {/* Middle scoop (yellow) with 3D depth */}
        <circle cx="42" cy="45" r="17" fill="#d97706" opacity="0.4"/>
        <circle cx="42" cy="43" r="16" fill="url(#scoop-yellow)" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="42" cy="41" rx="14" ry="13" fill="#fef08a" opacity="0.4"/>
        {/* Texture dots */}
        <circle cx="38" cy="42" r="1.5" fill="#d97706" opacity="0.3"/>
        <circle cx="44" cy="44" r="1.5" fill="#d97706" opacity="0.3"/>
        <circle cx="40" cy="47" r="1.2" fill="#d97706" opacity="0.3"/>
        {/* Highlight */}
        <ellipse cx="38" cy="38" rx="5" ry="4" fill="#fff" opacity="0.5"/>
        <ellipse cx="36" cy="36" rx="3" ry="2" fill="#fff" opacity="0.7"/>
        
        {/* Top scoop (pink) with 3D depth */}
        <circle cx="58" cy="45" r="17" fill="#be185d" opacity="0.4"/>
        <circle cx="58" cy="43" r="16" fill="url(#scoop-pink)" stroke="#ec4899" strokeWidth="1.5"/>
        <circle cx="58" cy="41" rx="14" ry="13" fill="#fbcfe8" opacity="0.4"/>
        {/* Texture dots */}
        <circle cx="54" cy="42" r="1.5" fill="#be185d" opacity="0.3"/>
        <circle cx="60" cy="44" r="1.5" fill="#be185d" opacity="0.3"/>
        <circle cx="56" cy="47" r="1.2" fill="#be185d" opacity="0.3"/>
        {/* Highlight */}
        <ellipse cx="62" cy="38" rx="5" ry="4" fill="#fff" opacity="0.5"/>
        <ellipse cx="64" cy="36" rx="3" ry="2" fill="#fff" opacity="0.7"/>
        
        {/* Melting drips with 3D effect */}
        <ellipse cx="40" cy="69" rx="3" ry="5" fill="#c2410c" opacity="0.4"/>
        <ellipse cx="40" cy="68" rx="2.5" ry="4.5" fill="#fb923c"/>
        <ellipse cx="40" cy="67" rx="2" ry="4" fill="#fdba74" opacity="0.5"/>
        
        <ellipse cx="60" cy="69" rx="3" ry="5" fill="#c2410c" opacity="0.4"/>
        <ellipse cx="60" cy="68" rx="2.5" ry="4.5" fill="#fb923c"/>
        <ellipse cx="60" cy="67" rx="2" ry="4" fill="#fdba74" opacity="0.5"/>
      </svg>
    </div>
  );
}
