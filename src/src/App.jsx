import { useState, useEffect, useRef } from "react";

// ============================================================
// DONNÉES INITIALES
// ============================================================
const MENU = [
  // Boissons chaudes (cafés avec eau offerte)
  { id: "cafe_noir", name: "Café Noir", price: 13, category: "cafe", withWater: true },
  { id: "cafe_americain", name: "Café Américain", price: 15, category: "cafe", withWater: true },
  { id: "double_expresso", name: "Double Expresso", price: 13, category: "cafe", withWater: true },
  { id: "ness_ness", name: "Ness Ness", price: 13, category: "cafe", withWater: true },
  { id: "cafe_creme", name: "Café Crème", price: 15, category: "cafe", withWater: true },
  { id: "nespresso", name: "Nespresso", price: 18, category: "cafe", withWater: true },
  { id: "cappucino", name: "Cappucino", price: 18, category: "cafe", withWater: true },
  { id: "lait_chocolat", name: "Lait Chocolat", price: 15, category: "boisson_chaude", withWater: false },
  { id: "chocolat_chaude", name: "Chocolat Chaude", price: 15, category: "boisson_chaude", withWater: false },
  { id: "noisette", name: "Noisette / Makiata", price: 15, category: "boisson_chaude", withWater: false },
  { id: "latte_makiata", name: "Latte Makiata", price: 24, category: "boisson_chaude", withWater: false },
  { id: "the_menthe", name: "Thé à la Menthe", price: 12, category: "boisson_chaude", withWater: false },
  { id: "verveinne", name: "Verveinne", price: 12, category: "boisson_chaude", withWater: false },
  { id: "verveinne_lait", name: "Verveinne au Lait", price: 13, category: "boisson_chaude", withWater: false },
  { id: "the_noire", name: "Thé Noire", price: 12, category: "boisson_chaude", withWater: false },
  // Petit déjeuner
  { id: "pdj_express", name: "PDJ Express", price: 27, category: "petit_dejeuner", withWater: false },
  { id: "pdj_beldi", name: "PDJ Beldi", price: 34, category: "petit_dejeuner", withWater: false },
  { id: "pdj_fassi", name: "PDJ Fassi", price: 38, category: "petit_dejeuner", withWater: false },
  { id: "pdj_saloon55", name: "PDJ Saloon 55", price: 44, category: "petit_dejeuner", withWater: false },
  // Mkilat
  { id: "mkila_tomate", name: "Mkila Tomate", price: 17, category: "mkilat", withWater: false },
  { id: "mkila_fromage", name: "Mkila Fromage", price: 18, category: "mkilat", withWater: false },
  { id: "mkila_jambone", name: "Mkila Jambone", price: 18, category: "mkilat", withWater: false },
  { id: "mkila_fruits_mer", name: "Mkila Fruit de Mer", price: 40, category: "mkilat", withWater: false },
  // Toaste
  { id: "toaste_fromage", name: "Toaste Fromage", price: 18, category: "toaste", withWater: false },
  { id: "toaste_jambon_fromage", name: "Toaste Jambon Fromage", price: 20, category: "toaste", withWater: false },
  // Pizza
  { id: "pizza_marguerite", name: "Pizza Marguerite", price: 25, category: "pizza", withWater: false },
  { id: "pizza_thon", name: "Pizza Thon", price: 35, category: "pizza", withWater: false },
  { id: "pizza_kefta", name: "Pizza Kefta", price: 35, category: "pizza", withWater: false },
  { id: "pizza_poulet", name: "Pizza Poulet", price: 35, category: "pizza", withWater: false },
  { id: "pizza_fruits_mer", name: "Pizza Fruits de Mer", price: 40, category: "pizza", withWater: false },
  { id: "pizza_4fromage", name: "Pizza 4 Fromage", price: 30, category: "pizza", withWater: false },
  { id: "pizza_mixtes", name: "Pizza Mixtes", price: 45, category: "pizza", withWater: false },
  { id: "pizza_jambons", name: "Pizza Jambons", price: 35, category: "pizza", withWater: false },
  { id: "pizza_vegetarienne", name: "Pizza Végétarienne", price: 30, category: "pizza", withWater: false },
  // Tacos
  { id: "tacos_kefta", name: "Tacos Kefta", price: 40, category: "tacos", withWater: false },
  { id: "tacos_poulet", name: "Tacos Poulet", price: 35, category: "tacos", withWater: false },
  { id: "tacos_mixtes", name: "Tacos Mixtes", price: 45, category: "tacos", withWater: false },
  { id: "tacos_cordon", name: "Tacos Cordon Bleue", price: 40, category: "tacos", withWater: false },
  { id: "tacos_nuggets", name: "Tacos Nuggets", price: 35, category: "tacos", withWater: false },
  // Pasticho
  { id: "pasticho_poulet", name: "Pasticho Poulet", price: 30, category: "pasticho", withWater: false },
  { id: "pasticho_kefta", name: "Pasticho Kefta", price: 35, category: "pasticho", withWater: false },
  { id: "pasticho_mixtes", name: "Pasticho Mixtes", price: 35, category: "pasticho", withWater: false },
  // Crêpes salées
  { id: "crepes_jambons", name: "Crêpes Jambons", price: 35, category: "crepes_salee", withWater: false },
  { id: "crepes_poulet", name: "Crêpes Poulet", price: 30, category: "crepes_salee", withWater: false },
  { id: "crepes_kefta", name: "Crêpes Kefta", price: 40, category: "crepes_salee", withWater: false },
  { id: "crepes_mixtes_s", name: "Crêpes Mixtes", price: 40, category: "crepes_salee", withWater: false },
  // Sandwich
  { id: "sandwich_kefta", name: "Sandwich Kefta", price: 30, category: "sandwich", withWater: false },
  { id: "sandwich_poulet", name: "Sandwich Poulet", price: 25, category: "sandwich", withWater: false },
  { id: "sandwich_mixtes", name: "Sandwich Mixtes", price: 30, category: "sandwich", withWater: false },
  { id: "sandwich_fruits_mer", name: "Sandwich Fruit de Mers", price: 35, category: "sandwich", withWater: false },
  { id: "sandwich_cordon", name: "Sandwich Cordon Bleue", price: 30, category: "sandwich", withWater: false },
  // Pâtes
  { id: "pates_bolognaise", name: "Pâtes Bolognaise", price: 35, category: "pates", withWater: false },
  { id: "pates_poulet", name: "Pâtes Poulet Champignons", price: 30, category: "pates", withWater: false },
  { id: "pates_fruits_mer", name: "Pâtes Fruit de Mers", price: 40, category: "pates", withWater: false },
  // Jus
  { id: "jus_orange", name: "Jus d'Orange", price: 19, category: "jus", withWater: false },
  { id: "jus_citron", name: "Jus de Citron", price: 19, category: "jus", withWater: false },
  { id: "jus_pomme", name: "Jus de Pomme", price: 19, category: "jus", withWater: false },
  { id: "jus_fraise", name: "Jus de Fraise", price: 24, category: "jus", withWater: false },
  { id: "jus_mangue", name: "Jus de Mangue", price: 24, category: "jus", withWater: false },
  { id: "jus_ananas", name: "Jus d'Ananas", price: 24, category: "jus", withWater: false },
  { id: "jus_avocat", name: "Jus d'Avocat", price: 24, category: "jus", withWater: false },
  { id: "jus_kiwi", name: "Jus de Kiwi", price: 24, category: "jus", withWater: false },
  { id: "jus_avocat_sec", name: "Jus d'Avocat Fruit Sec", price: 29, category: "jus", withWater: false },
  { id: "za3za3", name: "Za3 Za3", price: 39, category: "jus", withWater: false },
  // Moctail
  { id: "mojito_virgin", name: "Mojito Virgin", price: 29, category: "moctail", withWater: false },
  { id: "mojito_fruit_rouge", name: "Mojito Fruit Rouge", price: 34, category: "moctail", withWater: false },
  { id: "mojito_maison", name: "Mojito Maison", price: 44, category: "moctail", withWater: false },
  { id: "pina_colada", name: "Pina Colada", price: 41, category: "moctail", withWater: false },
  { id: "flamingo", name: "Flamingo", price: 44, category: "moctail", withWater: false },
  { id: "bora_bora", name: "Bora Bora", price: 39, category: "moctail", withWater: false },
  // Detox
  { id: "citron_node", name: "Citron Node", price: 24, category: "detox", withWater: false },
  { id: "energetique", name: "Énergétique", price: 39, category: "detox", withWater: false },
  { id: "detox_maison", name: "Detox Maison", price: 39, category: "detox", withWater: false },
  // Sodas
  { id: "coca_cola", name: "Coca Cola", price: 15, category: "soda", withWater: false },
  { id: "coca_zero", name: "Coca Cola Zero", price: 15, category: "soda", withWater: false },
  { id: "sprite", name: "Sprite", price: 15, category: "soda", withWater: false },
  { id: "poms", name: "Poms", price: 15, category: "soda", withWater: false },
  { id: "hawai", name: "Hawaï", price: 15, category: "soda", withWater: false },
  { id: "orangina", name: "Orangina", price: 15, category: "soda", withWater: false },
  { id: "schweppes_citron", name: "Schweppes Citron", price: 15, category: "soda", withWater: false },
  { id: "schweppes_tonic", name: "Schweppes Tonic", price: 15, category: "soda", withWater: false },
  { id: "oulmas_tropical", name: "Oulmas Tropical", price: 15, category: "soda", withWater: false },
  { id: "oulmas_mojito", name: "Oulmas Mojito", price: 15, category: "soda", withWater: false },
  { id: "oulmas_orange", name: "Oulmas Orange", price: 15, category: "soda", withWater: false },
  { id: "oulmas_fraise", name: "Oulmas Fraise", price: 15, category: "soda", withWater: false },
  // Eau
  { id: "eau_33cl", name: "Eau Minérale 33cl", price: 4, category: "eau", withWater: false },
  { id: "eau_50cl", name: "Eau Minérale 50cl", price: 10, category: "eau", withWater: false },
  { id: "eau_15l", name: "Eau Minérale 1,5L", price: 15, category: "eau", withWater: false },
  { id: "oulmas_33cl", name: "Oulmas 33cl", price: 12, category: "eau", withWater: false },
  { id: "oulmas_50cl", name: "Oulmas 50cl", price: 17, category: "eau", withWater: false },
  // Desserts
  { id: "crepes_nutella", name: "Crêpes Nutella", price: 20, category: "dessert", withWater: false },
  { id: "crepes_sucre", name: "Crêpes Sucrée", price: 15, category: "dessert", withWater: false },
  { id: "crepes_nature", name: "Crêpes Nature", price: 15, category: "dessert", withWater: false },
  { id: "crepes_nutella_banane", name: "Crêpes Nutella Banane/Fraises", price: 25, category: "dessert", withWater: false },
  { id: "glace_1boule", name: "Glace 1 Boule", price: 15, category: "dessert", withWater: false },
  { id: "glace_2boules", name: "Glace 2 Boules", price: 25, category: "dessert", withWater: false },
  { id: "glace_3boules", name: "Glace 3 Boules", price: 40, category: "dessert", withWater: false },
  { id: "tiramisu", name: "Tiramisu Fait Maison", price: 30, category: "dessert", withWater: false },
  { id: "creme_brule", name: "Crème Brûlée", price: 30, category: "dessert", withWater: false },
];

const CATEGORIES = {
  cafe: "☕ Cafés",
  boisson_chaude: "🍵 Boissons Chaudes",
  petit_dejeuner: "🌅 Petit Déjeuner",
  mkilat: "🥘 Mkilat",
  toaste: "🍞 Toaste",
  pizza: "🍕 Pizza",
  tacos: "🌮 Tacos",
  pasticho: "🍲 Pasticho",
  crepes_salee: "🥞 Crêpes Salées",
  sandwich: "🥪 Sandwich",
  pates: "🍝 Pâtes",
  jus: "🍊 Jus de Fruits",
  moctail: "🍹 Moctails",
  detox: "🥗 Detox",
  soda: "🥤 Sodas",
  eau: "💧 Eau",
  dessert: "🍰 Desserts",
};

const EXPENSE_CATEGORIES = ["Eau", "Électricité", "Loyer", "Fournitures", "Salaires", "Courses", "Maintenance", "Autre"];

const STOCK_ITEMS = [
  { id: "cafe_kg", name: "Café (sacs 1kg)", unit: "sac", unitQty: 60, unitLabel: "cafés/sac", alert: 2 },
  { id: "eau_33cl_stock", name: "Eau Minérale 33cl", unit: "carton", unitQty: 24, unitLabel: "bouteilles/carton", alert: 2 },
  { id: "eau_50cl_stock", name: "Eau Minérale 50cl", unit: "carton", unitQty: 24, unitLabel: "bouteilles/carton", alert: 2 },
  { id: "coca_stock", name: "Coca Cola", unit: "carton", unitQty: 24, unitLabel: "canettes/carton", alert: 1 },
  { id: "sprite_stock", name: "Sprite", unit: "carton", unitQty: 24, unitLabel: "canettes/carton", alert: 1 },
  { id: "jus_orange_stock", name: "Jus d'Orange (frais)", unit: "kg", unitQty: 1, unitLabel: "kg", alert: 5 },
  { id: "sodas_mix", name: "Sodas Mix (Poms, Hawaï...)", unit: "carton", unitQty: 24, unitLabel: "canettes/carton", alert: 1 },
  { id: "oulmas_stock", name: "Oulmas Gazeuse", unit: "carton", unitQty: 24, unitLabel: "bouteilles/carton", alert: 1 },
  { id: "lait_stock", name: "Lait", unit: "litre", unitQty: 1, unitLabel: "litres", alert: 5 },
  { id: "farine_stock", name: "Farine (crêpes/pizza)", unit: "sac", unitQty: 1, unitLabel: "kg/sac", alert: 3 },
];

const USERS = [
  { id: "patron", name: "Patron", role: "patron", password: "patron123" },
  { id: "gerant", name: "Gérant", role: "gerant", password: "gerant123" },
];

// ============================================================
// UTILS
// ============================================================
const today = () => new Date().toISOString().split("T")[0];
const fmtDH = (n) => `${Number(n || 0).toFixed(0)} DH`;
const fmtDate = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  }).reverse();
}

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; }
  });
  const set = (v) => { setVal(v); localStorage.setItem(key, JSON.stringify(v)); };
  return [val, set];
}

// ============================================================
// COMPOSANTS UI
// ============================================================
function Badge({ color, children }) {
  const colors = {
    green: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    red: "bg-red-500/20 text-red-400 border-red-500/30",
    blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    gray: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[color]}`}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 ${className}`}>{children}</div>;
}

function StatCard({ label, value, sub, color = "blue", icon }) {
  const colors = {
    blue: "from-blue-600/20 to-blue-800/10 border-blue-500/30 text-blue-400",
    green: "from-emerald-600/20 to-emerald-800/10 border-emerald-500/30 text-emerald-400",
    red: "from-red-600/20 to-red-800/10 border-red-500/30 text-red-400",
    yellow: "from-yellow-600/20 to-yellow-800/10 border-yellow-500/30 text-yellow-400",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
      {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", disabled = false, className = "" }) {
  const v = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    ghost: "bg-slate-700 hover:bg-slate-600 text-slate-200",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white",
  };
  const s = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${v[variant]} ${s[size]} rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      {label && <label className="block text-xs text-slate-400 mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-700/60 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

// ============================================================
// LOGIN
// ============================================================
function Login({ onLogin }) {
  const [user, setUser] = useState("patron");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    const found = USERS.find((u) => u.id === user && u.password === pass);
    if (found) onLogin(found);
    else setErr("Mot de passe incorrect");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐂</div>
          <h1 className="text-2xl font-bold text-white">Sallon 55</h1>
          <p className="text-slate-400 text-sm mt-1">Gestion & Suivi</p>
        </div>
        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Compte</label>
              <select
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white"
              >
                {USERS.map((u) => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
              </select>
            </div>
            <Input label="Mot de passe" type="password" value={pass} onChange={setPass} placeholder="••••••••" />
            {err && <p className="text-red-400 text-xs">{err}</p>}
            <Btn onClick={handle} className="w-full">Se connecter</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// SCAN TICKET Z (IA)
// ============================================================
function ScanTicket({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [ticket1, setTicket1] = useState(null);
  const [ticket2, setTicket2] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const toBase64 = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

  const handleFile = async (file, num) => {
    const url = URL.createObjectURL(file);
    if (num === 1) { setTicket1(file); setPreview1(url); }
    else { setTicket2(file); setPreview2(url); }
  };

  const analyze = async () => {
    if (!ticket1 || !ticket2) { setError("Veuillez uploader les 2 tickets"); return; }
    setLoading(true); setError("");
    try {
      const b1 = await toBase64(ticket1);
      const b2 = await toBase64(ticket2);
      const mt = ticket1.type || "image/jpeg";
      const mt2 = ticket2.type || "image/jpeg";

      const prompt = `Tu es un assistant de gestion de café-restaurant au Maroc. 
On te donne 2 photos de tickets Z de caisse.
- Ticket 1 : ticket CA total (chiffre d'affaires de la journée)
- Ticket 2 : ticket détail des ventes (liste de tous les produits vendus avec quantités)

Extrait toutes les informations et retourne UNIQUEMENT un JSON valide sans aucun texte autour, dans ce format exact:
{
  "ca_total": <nombre en DH>,
  "date": "<date du ticket ou aujourd'hui>",
  "ventes": [
    {"nom": "<nom produit>", "quantite": <nombre>, "prix_unitaire": <nombre>, "total": <nombre>}
  ],
  "nb_cafes": <total cafés vendus pour calcul eau>,
  "observations": "<remarques importantes>"
}

Menu de référence pour identifier les produits: Café Noir 13DH, Café Américain 15DH, Double Expresso 13DH, Ness Ness 13DH, Café Crème 15DH, Nespresso 18DH, Cappucino 18DH, Pizza Marguerite 25DH, Pizza Thon 35DH, Tacos Kefta 40DH, Sandwich Poulet 25DH, Coca Cola 15DH, Eau 33cl 4DH, etc.

Retourne SEULEMENT le JSON, rien d'autre.`;

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mt, data: b1 } },
              { type: "image", source: { type: "base64", media_type: mt2, data: b2 } },
              { type: "text", text: prompt }
            ]
          }]
        })
      });
      const data = await resp.json();
      const text = data.content?.map(c => c.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      setError("Erreur lors de l'analyse. Vérifiez que les photos sont lisibles.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">📸 Scanner Ticket Z</h2>
      <p className="text-slate-400 text-sm">Prenez en photo vos 2 tickets Z. L'IA les analyse automatiquement.</p>

      <div className="grid grid-cols-2 gap-3">
        {[{ num: 1, label: "Ticket 1 — CA Total", preview: preview1 },
          { num: 2, label: "Ticket 2 — Détail Ventes", preview: preview2 }].map(({ num, label, preview }) => (
          <div key={num}>
            <p className="text-xs text-slate-400 mb-2">{label}</p>
            <label className="block cursor-pointer">
              <div className={`border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center transition-all ${preview ? "border-blue-500" : "border-slate-600 hover:border-slate-500"}`}>
                {preview
                  ? <img src={preview} className="h-full w-full object-contain rounded-xl p-1" alt="ticket" />
                  : <>
                      <span className="text-3xl">📷</span>
                      <span className="text-xs text-slate-400 mt-1">Ajouter photo</span>
                    </>}
              </div>
              <input type="file" accept="image/*" capture="environment" className="hidden"
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0], num)} />
            </label>
          </div>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Btn onClick={analyze} disabled={loading || !ticket1 || !ticket2} className="w-full" size="lg">
        {loading ? "⏳ Analyse en cours..." : "🤖 Analyser les tickets"}
      </Btn>

      {result && (
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">✅ Résultat de l'analyse</h3>
            <Badge color="green">Analysé</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">{fmtDH(result.ca_total)}</div>
              <div className="text-xs text-slate-400">CA Total</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">{result.nb_cafes || 0}</div>
              <div className="text-xs text-slate-400">Cafés (💧 eau auto)</div>
            </div>
          </div>
          {result.ventes?.length > 0 && (
            <div>
              <p className="text-xs text-slate-400 mb-2">Produits vendus :</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {result.ventes.map((v, i) => (
                  <div key={i} className="flex justify-between text-xs bg-slate-700/30 rounded px-2 py-1">
                    <span className="text-slate-300">{v.nom} x{v.quantite}</span>
                    <span className="text-slate-400">{fmtDH(v.total)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.observations && <p className="text-xs text-slate-400 italic">{result.observations}</p>}
          <Btn onClick={() => onResult(result)} variant="success" className="w-full">
            ✅ Valider et enregistrer
          </Btn>
        </Card>
      )}
    </div>
  );
}

// ============================================================
// DÉPENSES
// ============================================================
function Depenses({ depenses, onAdd, onDelete }) {
  const [cat, setCat] = useState(EXPENSE_CATEGORIES[0]);
  const [montant, setMontant] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(today());
  const [customCat, setCustomCat] = useState("");

  const add = () => {
    if (!montant || isNaN(montant)) return;
    onAdd({ id: Date.now(), category: cat === "Autre" ? customCat || "Autre" : cat, montant: Number(montant), description: desc, date });
    setMontant(""); setDesc(""); setCustomCat("");
  };

  const todayDep = depenses.filter(d => d.date === today()).reduce((s, d) => s + d.montant, 0);
  const monthDep = depenses.filter(d => d.date?.startsWith(today().slice(0, 7))).reduce((s, d) => s + d.montant, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">💸 Dépenses</h2>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Aujourd'hui" value={fmtDH(todayDep)} icon="📅" color="red" />
        <StatCard label="Ce mois" value={fmtDH(monthDep)} icon="📆" color="yellow" />
      </div>
      <Card className="space-y-3">
        <h3 className="font-semibold text-white text-sm">Ajouter une dépense</h3>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Catégorie</label>
          <select value={cat} onChange={e => setCat(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white">
            {EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        {cat === "Autre" && <Input label="Précisez" value={customCat} onChange={setCustomCat} placeholder="Ex: Réparation machine..." />}
        <Input label="Montant (DH)" type="number" value={montant} onChange={setMontant} placeholder="0" />
        <Input label="Description (optionnel)" value={desc} onChange={setDesc} placeholder="Ex: Facture eau mars..." />
        <Input label="Date" type="date" value={date} onChange={setDate} />
        <Btn onClick={add} className="w-full" variant="success">+ Ajouter</Btn>
      </Card>
      <div className="space-y-2">
        {depenses.slice().reverse().slice(0, 20).map(d => (
          <div key={d.id} className="flex items-center justify-between bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2">
            <div>
              <div className="text-sm text-white">{d.category}</div>
              <div className="text-xs text-slate-400">{d.description} · {fmtDate(d.date)}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-semibold text-sm">{fmtDH(d.montant)}</span>
              <button onClick={() => onDelete(d.id)} className="text-slate-500 hover:text-red-400 text-xs">✕</button>
            </div>
          </div>
        ))}
        {depenses.length === 0 && <p className="text-slate-500 text-sm text-center py-4">Aucune dépense enregistrée</p>}
      </div>
    </div>
  );
}

// ============================================================
// STOCK
// ============================================================
function Stock({ stock, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [qty, setQty] = useState("");
  const [costPerUnit, setCost] = useState("");

  const getStock = (id) => stock[id] || { units: 0, cost: 0 };

  const save = (id, item) => {
    const cur = getStock(id);
    const added = Number(qty) || 0;
    const newUnits = cur.units + added * item.unitQty;
    onUpdate(id, { units: newUnits, cost: Number(costPerUnit) || cur.cost });
    setEditId(null); setQty(""); setCost("");
  };

  const consume = (id, amount) => {
    const cur = getStock(id);
    onUpdate(id, { ...cur, units: Math.max(0, cur.units - amount) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">📦 Stock</h2>
      <p className="text-slate-400 text-xs">Les cafés vendus déduisent automatiquement l'eau 33cl et le café en grain.</p>
      <div className="space-y-3">
        {STOCK_ITEMS.map(item => {
          const s = getStock(item.id);
          const isLow = s.units <= (item.alert * item.unitQty);
          const cartons = Math.floor(s.units / item.unitQty);
          const reste = s.units % item.unitQty;
          return (
            <Card key={item.id} className={isLow ? "border-red-500/50" : ""}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{item.name}</span>
                    {isLow && <Badge color="red">⚠️ Stock bas</Badge>}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {cartons} {item.unit}(s) + {reste} unité(s) — Total: <span className="text-white font-medium">{s.units} unités</span>
                  </div>
                  {s.cost > 0 && <div className="text-xs text-slate-500">Coût/carton: {fmtDH(s.cost)} · Marge visible au dashboard</div>}
                </div>
                <button onClick={() => setEditId(editId === item.id ? null : item.id)}
                  className="text-blue-400 text-xs hover:text-blue-300 ml-2">
                  {editId === item.id ? "✕" : "+ Entrée"}
                </button>
              </div>
              {editId === item.id && (
                <div className="mt-3 pt-3 border-t border-slate-700 space-y-2">
                  <Input label={`Nombre de ${item.unit}(s) reçus (1 ${item.unit} = ${item.unitQty} ${item.unitLabel})`}
                    type="number" value={qty} onChange={setQty} placeholder="Ex: 2" />
                  <Input label="Coût par carton/unité (DH)" type="number" value={costPerUnit} onChange={setCost} placeholder="Ex: 60" />
                  <Btn onClick={() => save(item.id, item)} variant="success" size="sm">Valider entrée</Btn>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD PATRON
// ============================================================
function Dashboard({ journees, depenses, stock }) {
  const days = getLast7Days();

  const getJournee = (d) => journees.find(j => j.date === d) || { ca: 0, nb_cafes: 0 };
  const getDep = (d) => depenses.filter(dep => dep.date === d).reduce((s, d) => s + d.montant, 0);

  const todayJ = getJournee(today());
  const todayDep = getDep(today());
  const todayBenef = todayJ.ca - todayDep;

  const currentMonth = today().slice(0, 7);
  const lastMonth = (() => { const d = new Date(); d.setMonth(d.getMonth() - 1); return d.toISOString().slice(0, 7); })();

  const monthCA = journees.filter(j => j.date?.startsWith(currentMonth)).reduce((s, j) => s + j.ca, 0);
  const lastMonthCA = journees.filter(j => j.date?.startsWith(lastMonth)).reduce((s, j) => s + j.ca, 0);
  const monthDep = depenses.filter(d => d.date?.startsWith(currentMonth)).reduce((s, d) => s + d.montant, 0);
  const monthBenef = monthCA - monthDep;

  const stockAlerts = STOCK_ITEMS.filter(item => {
    const s = stock[item.id] || { units: 0 };
    return s.units <= item.alert * item.unitQty;
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-white">📊 Dashboard Patron</h2>
        <p className="text-slate-400 text-xs">{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
      </div>

      {stockAlerts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
          <p className="text-red-400 font-semibold text-sm mb-2">🔴 Alertes Stock ({stockAlerts.length})</p>
          {stockAlerts.map(item => (
            <p key={item.id} className="text-xs text-red-300">· {item.name} — stock bas !</p>
          ))}
        </div>
      )}

      <div>
        <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Aujourd'hui</p>
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="CA du jour" value={fmtDH(todayJ.ca)} icon="💰" color="green" sub={`${todayJ.nb_cafes || 0} cafés`} />
          <StatCard label="Dépenses" value={fmtDH(todayDep)} icon="💸" color="red" />
          <StatCard label="Bénéfice net" value={fmtDH(todayBenef)} icon={todayBenef >= 0 ? "📈" : "📉"} color={todayBenef >= 0 ? "green" : "red"} />
          <StatCard label="Eau offerte" value={`${todayJ.nb_cafes || 0} btl`} icon="💧" color="blue" sub="33cl avec chaque café" />
        </div>
      </div>

      <div>
        <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Ce mois vs mois dernier</p>
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="CA ce mois" value={fmtDH(monthCA)} icon="📅" color="blue" />
          <StatCard label="CA mois dernier" value={fmtDH(lastMonthCA)} icon="🗓️" color="gray" />
          <StatCard label="Dépenses mois" value={fmtDH(monthDep)} icon="💸" color="red" />
          <StatCard label="Bénéfice mois" value={fmtDH(monthBenef)} icon="🏆" color={monthBenef >= 0 ? "green" : "red"} />
        </div>
      </div>

      <div>
        <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">7 derniers jours</p>
        <Card>
          <div className="space-y-2">
            {days.map(d => {
              const j = getJournee(d);
              const dep = getDep(d);
              const benef = j.ca - dep;
              const maxCA = Math.max(...days.map(d => getJournee(d).ca), 1);
              return (
                <div key={d}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{fmtDate(d)}</span>
                    <div className="flex gap-3">
                      <span className="text-emerald-400">{fmtDH(j.ca)}</span>
                      <span className="text-red-400">-{fmtDH(dep)}</span>
                      <span className={benef >= 0 ? "text-blue-400 font-semibold" : "text-orange-400 font-semibold"}>{fmtDH(benef)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(j.ca / maxCA) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3 pt-3 border-t border-slate-700">
            <span className="flex items-center gap-1 text-xs text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> CA</span>
            <span className="flex items-center gap-1 text-xs text-red-400"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Dépenses</span>
            <span className="flex items-center gap-1 text-xs text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Bénéfice</span>
          </div>
        </Card>
      </div>

      <div>
        <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Calcul Café</p>
        <Card>
          {(() => {
            const totalCafes = journees.reduce((s, j) => s + (j.nb_cafes || 0), 0);
            const sacsUtilises = (totalCafes / 60).toFixed(1);
            const sacsStock = Math.floor((stock["cafe_kg"]?.units || 0) / 60);
            return (
              <div className="grid grid-cols-3 gap-3 text-center">
                <div><div className="text-lg font-bold text-white">{totalCafes}</div><div className="text-xs text-slate-400">Cafés total</div></div>
                <div><div className="text-lg font-bold text-amber-400">{sacsUtilises}</div><div className="text-xs text-slate-400">Sacs utilisés</div></div>
                <div><div className="text-lg font-bold text-blue-400">{sacsStock}</div><div className="text-xs text-slate-400">Sacs en stock</div></div>
              </div>
            );
          })()}
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// APP PRINCIPALE
// ============================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [journees, setJournees] = useLocalStorage("s55_journees", []);
  const [depenses, setDepenses] = useLocalStorage("s55_depenses", []);
  const [stock, setStock] = useLocalStorage("s55_stock", {});
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleTicketResult = (result) => {
    const newJournee = {
      id: Date.now(),
      date: today(),
      ca: result.ca_total || 0,
      nb_cafes: result.nb_cafes || 0,
      ventes: result.ventes || [],
      scanDate: new Date().toISOString(),
    };
    // Déduire eau et café du stock automatiquement
    const nbCafes = result.nb_cafes || 0;
    const curEau = stock["eau_33cl_stock"] || { units: 0, cost: 0 };
    const curCafe = stock["cafe_kg"] || { units: 0, cost: 0 };
    const newStock = {
      ...stock,
      "eau_33cl_stock": { ...curEau, units: Math.max(0, curEau.units - nbCafes) },
      "cafe_kg": { ...curCafe, units: Math.max(0, curCafe.units - nbCafes) },
    };
    setStock(newStock);
    const existing = journees.findIndex(j => j.date === today());
    if (existing >= 0) {
      const updated = [...journees];
      updated[existing] = newJournee;
      setJournees(updated);
    } else {
      setJournees([...journees, newJournee]);
    }
    showToast("✅ Journée enregistrée ! Stock mis à jour.");
    setTab("dashboard");
  };

  const addDepense = (dep) => { setDepenses([...depenses, dep]); showToast("✅ Dépense ajoutée"); };
  const deleteDepense = (id) => setDepenses(depenses.filter(d => d.id !== id));
  const updateStock = (id, val) => setStock({ ...stock, [id]: val });

  if (!user) return <Login onLogin={(u) => { setUser(u); setTab(u.role === "patron" ? "dashboard" : "scan"); }} />;

  const isPatron = user.role === "patron";

  const tabs = [
    ...(isPatron ? [{ id: "dashboard", label: "📊", title: "Dashboard" }] : []),
    { id: "scan", label: "📸", title: "Ticket Z" },
    { id: "depenses", label: "💸", title: "Dépenses" },
    { id: "stock", label: "📦", title: "Stock" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/80 border-b border-slate-700/50 px-4 py-3 flex items-center justify-between sticky top-0 z-10 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐂</span>
          <div>
            <span className="font-bold text-white text-sm">Sallon 55</span>
            <div className="text-xs text-slate-400">{tabs.find(t => t.id === tab)?.title}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge color="blue">{user.name}</Badge>
          <button onClick={() => setUser(null)} className="text-slate-400 hover:text-white text-xs">Sortir</button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-sm px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        {tab === "dashboard" && isPatron && <Dashboard journees={journees} depenses={depenses} stock={stock} />}
        {tab === "scan" && <ScanTicket onResult={handleTicketResult} />}
        {tab === "depenses" && <Depenses depenses={depenses} onAdd={addDepense} onDelete={deleteDepense} />}
        {tab === "stock" && <Stock stock={stock} onUpdate={updateStock} />}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 border-t border-slate-700/50 backdrop-blur">
        <div className="flex max-w-lg mx-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-0.5 transition-all ${tab === t.id ? "text-blue-400" : "text-slate-500 hover:text-slate-300"}`}>
              <span className="text-xl">{t.label}</span>
              <span className="text-xs">{t.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
