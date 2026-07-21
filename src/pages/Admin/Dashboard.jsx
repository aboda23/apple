import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Package, Tags, ShoppingCart, Users, Star, Ticket,
  Image as ImageIcon, LayoutTemplate, Video, Boxes, TrendingUp, Bell,
  Settings, ShieldCheck, CreditCard, Truck, ChevronDown, ChevronRight,
  Plus, Search, MoreVertical, Pencil, Trash2, Copy, EyeOff, Eye,
  Upload, ArrowUpRight, ArrowDownRight, Filter, X, Check, Box,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

/* ------------------------------- Mock data ------------------------------- */

const revenueData = [
  { month: "Aug", revenue: 182000 },
  { month: "Sep", revenue: 201000 },
  { month: "Oct", revenue: 195000 },
  { month: "Nov", revenue: 238000 },
  { month: "Dec", revenue: 312000 },
  { month: "Jan", revenue: 268000 },
  { month: "Feb", revenue: 241000 },
  { month: "Mar", revenue: 279000 },
  { month: "Apr", revenue: 265000 },
  { month: "May", revenue: 298000 },
  { month: "Jun", revenue: 312500 },
  { month: "Jul", revenue: 341200 },
];

const categorySales = [
  { name: "iPhone", value: 128400 },
  { name: "Mac", value: 96200 },
  { name: "iPad", value: 61500 },
  { name: "Watch", value: 42300 },
  { name: "AirPods", value: 28900 },
  { name: "Vision Pro", value: 19800 },
  { name: "Accessories", value: 15200 },
];

const GRAYS = ["#fafafa", "#e4e4e7", "#c7c7cc", "#a1a1aa", "#71717a", "#52525b", "#3f3f46"];

const productCategories = ["All", "Mac", "iPhone", "iPad", "Watch", "AirPods", "Vision Pro", "Accessories"];

const products = [
  { id: "P-1001", name: "MacBook Pro 16\u2033", category: "Mac", price: 2499, stock: 34, status: "Active", featured: true },
  { id: "P-1002", name: "iPhone 17 Pro", category: "iPhone", price: 1199, stock: 8, status: "Active", featured: true },
  { id: "P-1003", name: "iPad Pro 13\u2033", category: "iPad", price: 1299, stock: 0, status: "Hidden", featured: false },
  { id: "P-1004", name: "Apple Watch Ultra 3", category: "Watch", price: 799, stock: 51, status: "Active", featured: false },
  { id: "P-1005", name: "AirPods Pro 3", category: "AirPods", price: 249, stock: 120, status: "Active", featured: true },
  { id: "P-1006", name: "Vision Pro", category: "Vision Pro", price: 3499, stock: 5, status: "Active", featured: true },
  { id: "P-1007", name: "MagSafe Charger", category: "Accessories", price: 39, stock: 210, status: "Active", featured: false },
  { id: "P-1008", name: "MacBook Air 15\u2033", category: "Mac", price: 1499, stock: 6, status: "Active", featured: false },
  { id: "P-1009", name: "iPhone 17", category: "iPhone", price: 899, stock: 64, status: "Active", featured: false },
  { id: "P-1010", name: "iPad mini", category: "iPad", price: 599, stock: 22, status: "Active", featured: false },
];

const orders = [
  { id: "#10482", customer: "Omar Khaled", products: 3, total: 3247, payment: "Card", status: "Pending", date: "Jul 18, 2026" },
  { id: "#10481", customer: "Sara Ahmed", products: 1, total: 1199, payment: "Card", status: "Confirmed", date: "Jul 18, 2026" },
  { id: "#10480", customer: "Mostafa Ali", products: 2, total: 848, payment: "Cash", status: "Preparing", date: "Jul 17, 2026" },
  { id: "#10479", customer: "Nourhan Fathy", products: 1, total: 3499, payment: "Card", status: "Shipped", date: "Jul 17, 2026" },
  { id: "#10478", customer: "Youssef Adel", products: 4, total: 1876, payment: "Card", status: "Delivered", date: "Jul 16, 2026" },
  { id: "#10477", customer: "Habiba Sami", products: 1, total: 249, payment: "Cash", status: "Cancelled", date: "Jul 15, 2026" },
  { id: "#10476", customer: "Karim Nabil", products: 2, total: 2698, payment: "Card", status: "Delivered", date: "Jul 15, 2026" },
];

const customers = [
  { name: "Omar Khaled", email: "omar.khaled@mail.com", orders: 12, spent: 14320, last: "Jul 18, 2026", blocked: false },
  { name: "Sara Ahmed", email: "sara.ahmed@mail.com", orders: 5, spent: 6120, last: "Jul 18, 2026", blocked: false },
  { name: "Mostafa Ali", email: "mostafa.ali@mail.com", orders: 3, spent: 2540, last: "Jul 17, 2026", blocked: false },
  { name: "Nourhan Fathy", email: "nourhan.f@mail.com", orders: 8, spent: 9870, last: "Jul 17, 2026", blocked: false },
  { name: "Youssef Adel", email: "youssef.adel@mail.com", orders: 1, spent: 1876, last: "Jul 16, 2026", blocked: true },
  { name: "Habiba Sami", email: "habiba.sami@mail.com", orders: 2, spent: 720, last: "Jul 15, 2026", blocked: false },
];

const statusOptions = ["Pending", "Confirmed", "Preparing", "Shipped", "Delivered", "Cancelled"];

const allColors = ["Space Black", "Silver", "Gold", "Blue Titanium", "Natural Titanium", "Midnight"];
const allStorage = ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"];

const statusStyle = {
  Pending: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  Confirmed: "bg-sky-400/10 text-sky-300 border-sky-400/20",
  Preparing: "bg-violet-400/10 text-violet-300 border-violet-400/20",
  Shipped: "bg-indigo-400/10 text-indigo-300 border-indigo-400/20",
  Delivered: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  Cancelled: "bg-red-400/10 text-red-300 border-red-400/20",
};

/* ------------------------------ Nav structure ----------------------------- */

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    key: "products", label: "Products", icon: Package,
    children: ["Mac", "iPhone", "iPad", "Watch", "Vision", "Accessories"],
  },
  { key: "categories", label: "Categories", icon: Tags },
  { key: "orders", label: "Orders", icon: ShoppingCart },
  { key: "customers", label: "Customers", icon: Users },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "coupons", label: "Coupons", icon: Ticket },
  { key: "media", label: "Media Library", icon: ImageIcon },
  { key: "homepage", label: "Homepage", icon: LayoutTemplate },
  { key: "landing", label: "Landing Pages", icon: LayoutTemplate },
  { key: "herovideos", label: "Hero Videos", icon: Video },
  { key: "inventory", label: "Inventory", icon: Boxes },
  { key: "analytics", label: "Analytics", icon: TrendingUp },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "shipping", label: "Shipping", icon: Truck },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "admins", label: "Admins", icon: ShieldCheck },
  { key: "settings", label: "Settings", icon: Settings },
];

/* --------------------------------- Atoms ---------------------------------- */

function Card({ children, className = "" }) {
  return (
    <div className={`relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ label, value, delta, positive, icon: Icon }) {
  return (
    <Card className="p-5 overflow-hidden group hover:border-white/[0.16] transition-colors">
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/[0.04] blur-3xl group-hover:bg-white/[0.07] transition-all" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white tracking-tight">{value}</p>
          {delta && (
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
              {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              {delta}
            </div>
          )}
        </div>
        <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-zinc-300">
          <Icon size={17} strokeWidth={1.75} />
        </div>
      </div>
    </Card>
  );
}

function Pill({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
      {children}
    </span>
  );
}

function IconBtn({ icon: Icon, ...props }) {
  return (
    <button
      {...props}
      className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.16] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
    >
      <Icon size={14} strokeWidth={1.75} />
    </button>
  );
}

function PrimaryBtn({ children, icon: Icon, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:pointer-events-none"
    >
      {Icon && <Icon size={15} strokeWidth={2} />}
      {children}
    </button>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`text-left text-xs font-medium uppercase tracking-wider text-zinc-500 px-4 py-3 ${className}`}>
      {children}
    </th>
  );
}

function StatusDropdown({ value }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(value);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle[status]}`}
      >
        {status} <ChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-36 rounded-xl border border-white/10 bg-zinc-900 shadow-2xl p-1">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s); setOpen(false); }}
              className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-white/[0.06] flex items-center justify-between"
            >
              {s}
              {s === status && <Check size={12} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Form atoms -------------------------------- */

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-zinc-400 mb-1.5 block">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-zinc-600 mt-1 block">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-white/[0.3] transition-colors";

function TagInput({ tags, setTags, placeholder }) {
  const [val, setVal] = useState("");
  const add = () => {
    const v = val.trim();
    if (v && !tags.includes(v)) setTags([...tags, v]);
    setVal("");
  };
  return (
    <div>
      <div className={`${inputCls} flex flex-wrap items-center gap-1.5 min-h-[42px]`}>
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white/[0.08] text-zinc-200">
            {t}
            <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="text-zinc-500 hover:text-white">
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }}
          onBlur={add}
          placeholder={placeholder}
          className="bg-transparent outline-none text-sm text-zinc-100 placeholder:text-zinc-600 flex-1 min-w-[80px]"
        />
      </div>
    </div>
  );
}

function UploadSlot({ label, icon: Icon, accept }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 border border-dashed border-white/[0.14] rounded-xl px-3 py-5 text-center hover:border-white/[0.28] transition-colors cursor-pointer">
      <Icon size={18} className="text-zinc-500" strokeWidth={1.5} />
      <span className="text-xs text-zinc-400">{label}</span>
      <span className="text-[11px] text-zinc-600">{accept}</span>
    </div>
  );
}

function Modal({ title, subtitle, onClose, children, footer, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start lg:items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${wide ? "max-w-3xl" : "max-w-lg"} my-8 rounded-2xl border border-white/[0.1] bg-zinc-950 shadow-2xl`}>
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/[0.06]">
          <div>
            <h3 className="text-base font-semibold text-white">{title}</h3>
            {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 max-h-[65vh] overflow-y-auto space-y-6">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-white/[0.06]">{footer}</div>}
      </div>
    </div>
  );
}

const emptyProduct = {
  id: "",
  name: "",
  category: "Mac",
  price: "",
  discount: "",
  stock: "",
  status: "Active",
  featured: false,
  description: "",
  colors: [],
  storageOptions: [],
  features: [],
  specifications: [],
};

function ProductFormModal({ initial, onClose, onSave }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(initial ? { ...emptyProduct, ...initial } : emptyProduct);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const addSpec = () => setForm((f) => ({ ...f, specifications: [...f.specifications, { key: "", value: "" }] }));
  const updateSpec = (i, field, val) =>
    setForm((f) => ({ ...f, specifications: f.specifications.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)) }));
  const removeSpec = (i) => setForm((f) => ({ ...f, specifications: f.specifications.filter((_, idx) => idx !== i) }));

  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ""] }));
  const updateFeature = (i, val) => setForm((f) => ({ ...f, features: f.features.map((s, idx) => (idx === i ? val : s)) }));
  const removeFeature = (i) => setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));

  const canSave = form.name.trim() && form.price !== "";

  return (
    <Modal
      title={isEdit ? "Edit product" : "Add product"}
      subtitle={isEdit ? `Editing ${initial.id}` : "Fill in the details below to list a new product."}
      onClose={onClose}
      wide
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white transition-colors">
            Cancel
          </button>
          <PrimaryBtn icon={Check} disabled={!canSave} onClick={() => canSave && onSave(form)}>
            {isEdit ? "Save changes" : "Create product"}
          </PrimaryBtn>
        </>
      }
    >
      {/* Basic info */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Basic info</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Product name">
            <input className={inputCls} placeholder="e.g. MacBook Pro 16″" value={form.name} onChange={set("name")} />
          </Field>
          <Field label="Category">
            <select className={inputCls} value={form.category} onChange={set("category")}>
              {productCategories.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c} className="bg-zinc-900">{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Price ($)">
            <input type="number" className={inputCls} placeholder="0.00" value={form.price} onChange={set("price")} />
          </Field>
          <Field label="Discount (%)">
            <input type="number" className={inputCls} placeholder="0" value={form.discount} onChange={set("discount")} />
          </Field>
          <Field label="Stock">
            <input type="number" className={inputCls} placeholder="0" value={form.stock} onChange={set("stock")} />
          </Field>
          <Field label="Status">
            <select className={inputCls} value={form.status} onChange={set("status")}>
              <option className="bg-zinc-900">Active</option>
              <option className="bg-zinc-900">Hidden</option>
            </select>
          </Field>
        </div>
        <label className="flex items-center gap-2 mt-4 cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            className="w-4 h-4 rounded accent-white"
          />
          <span className="text-sm text-zinc-300">Feature this product on the homepage</span>
        </label>
      </div>

      {/* Variants */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Colors & storage</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Product colors" hint="Press Enter to add">
            <TagInput tags={form.colors} setTags={(v) => setForm((f) => ({ ...f, colors: v }))} placeholder="e.g. Space Black" />
          </Field>
          <Field label="Storage options" hint="Press Enter to add">
            <TagInput tags={form.storageOptions} setTags={(v) => setForm((f) => ({ ...f, storageOptions: v }))} placeholder="e.g. 512GB" />
          </Field>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Description</p>
        <Field label="Product description">
          <textarea rows={4} className={`${inputCls} resize-none`} placeholder="Write a compelling product description…" value={form.description} onChange={set("description")} />
        </Field>
      </div>

      {/* Specifications */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Specifications</p>
          <button onClick={addSpec} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
            <Plus size={13} /> Add spec
          </button>
        </div>
        <div className="space-y-2">
          {form.specifications.length === 0 && <p className="text-xs text-zinc-600">No specifications yet.</p>}
          {form.specifications.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={inputCls} placeholder="Spec name (e.g. Chip)" value={s.key} onChange={(e) => updateSpec(i, "key", e.target.value)} />
              <input className={inputCls} placeholder="Value (e.g. M4 Pro)" value={s.value} onChange={(e) => updateSpec(i, "value", e.target.value)} />
              <button onClick={() => removeSpec(i)} className="text-zinc-500 hover:text-red-400 shrink-0">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Features</p>
          <button onClick={addFeature} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
            <Plus size={13} /> Add feature
          </button>
        </div>
        <div className="space-y-2">
          {form.features.length === 0 && <p className="text-xs text-zinc-600">No features yet.</p>}
          {form.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={inputCls} placeholder="e.g. All-day battery life" value={f} onChange={(e) => updateFeature(i, e.target.value)} />
              <button onClick={() => removeFeature(i)} className="text-zinc-500 hover:text-red-400 shrink-0">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Media */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Media & gallery</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <UploadSlot label="Upload images" icon={ImageIcon} accept="PNG, JPG, WEBP" />
          <UploadSlot label="Upload videos" icon={Video} accept="MP4, MOV" />
          <UploadSlot label="Upload 3D model" icon={Box} accept="GLB, GLTF" />
          <UploadSlot label="Gallery" icon={Upload} accept="Multiple files" />
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------ Placeholder view --------------------------- */

function PlaceholderView({ title, description, chips = [] }) {
  return (
    <div>
      <SectionHeader title={title} subtitle={description} />
      <Card className="p-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4">
          <Settings size={20} className="text-zinc-400" strokeWidth={1.5} />
        </div>
        <p className="text-sm text-zinc-400 max-w-md">
          This section is scaffolded and ready to be wired up to your backend / API.
        </p>
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {chips.map((c) => (
              <Pill key={c} className="bg-white/[0.04] text-zinc-300 border-white/[0.08]">{c}</Pill>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* -------------------------------- Dashboard -------------------------------- */

function DashboardHome() {
  return (
    <div>
      <div className="relative mb-8">
        <div className="absolute -top-24 left-1/3 w-[420px] h-[420px] rounded-full bg-white/[0.05] blur-[100px] pointer-events-none" />
        <SectionHeader
          title="Overview"
          subtitle="Sunday, July 19, 2026 — here's what's happening in your store."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Revenue" value="$341,200" delta="+9.2% vs last month" positive icon={TrendingUp} />
        <StatCard label="Total Orders" value="1,284" delta="+4.1%" positive icon={ShoppingCart} />
        <StatCard label="Total Customers" value="8,942" delta="+2.6%" positive icon={Users} />
        <StatCard label="Total Products" value="312" delta="+6 new" positive icon={Package} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Pending Orders" value="27" icon={ShoppingCart} />
        <StatCard label="Completed Orders" value="1,182" icon={Check} />
        <StatCard label="Low Stock" value="9 items" delta="Needs attention" icon={Boxes} />
        <StatCard label="Best Seller" value="iPhone 17 Pro" icon={Star} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-white">Revenue</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Last 12 months</p>
            </div>
            <Pill className="bg-white/[0.04] text-zinc-300 border-white/[0.08]">Monthly</Pill>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#71717a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "#e4e4e7" }}
                formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} fill="url(#revFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-medium text-white mb-1">Sales by category</h3>
          <p className="text-xs text-zinc-500 mb-2">Share of total revenue</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categorySales} dataKey="value" nameKey="name" innerRadius={45} outerRadius={72} paddingAngle={2}>
                {categorySales.map((_, i) => (
                  <Cell key={i} fill={GRAYS[i % GRAYS.length]} stroke="rgba(0,0,0,0.4)" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                formatter={(v) => `$${v.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
            {categorySales.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full" style={{ background: GRAYS[i % GRAYS.length] }} />
                {c.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">Latest orders</h3>
          <button className="text-xs text-zinc-400 hover:text-white transition-colors">View all</button>
        </div>
        <div className="overflow-x-auto -mx-5">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <Th>Order</Th><Th>Customer</Th><Th>Total</Th><Th>Status</Th><Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm text-zinc-200 font-medium">{o.id}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400">{o.customer}</td>
                  <td className="px-4 py-3 text-sm text-zinc-200">${o.total.toLocaleString()}</td>
                  <td className="px-4 py-3"><Pill className={statusStyle[o.status]}>{o.status}</Pill></td>
                  <td className="px-4 py-3 text-sm text-zinc-500">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* --------------------------------- Products --------------------------------- */

function ProductsView() {
  const [cat, setCat] = useState("All");
  const [list, setList] = useState(products);
  const [modalMode, setModalMode] = useState(null); // null | "add" | "edit"
  const [editingId, setEditingId] = useState(null);

  const filtered = useMemo(
    () => (cat === "All" ? list : list.filter((p) => p.category === cat)),
    [cat, list]
  );

  const editingProduct = editingId ? list.find((p) => p.id === editingId) : null;

  const handleSave = (form) => {
    if (modalMode === "edit") {
      setList((l) => l.map((p) => (p.id === editingId ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p)));
    } else {
      const newId = `P-${1000 + list.length + Math.floor(Math.random() * 900)}`;
      setList((l) => [{ ...form, id: newId, price: Number(form.price) || 0, stock: Number(form.stock) || 0 }, ...l]);
    }
    setModalMode(null);
    setEditingId(null);
  };

  const handleDuplicate = (p) => {
    const newId = `P-${1000 + list.length + Math.floor(Math.random() * 900)}`;
    setList((l) => [{ ...p, id: newId, name: `${p.name} (copy)` }, ...l]);
  };

  const handleDelete = (id) => setList((l) => l.filter((p) => p.id !== id));

  const handleToggleHide = (id) =>
    setList((l) => l.map((p) => (p.id === id ? { ...p, status: p.status === "Active" ? "Hidden" : "Active" } : p)));

  return (
    <div>
      <SectionHeader
        title="Products"
        subtitle="Manage your full catalog across every device line."
        action={<PrimaryBtn icon={Plus} onClick={() => setModalMode("add")}>Add product</PrimaryBtn>}
      />

      {modalMode && (
        <ProductFormModal
          initial={modalMode === "edit" ? editingProduct : null}
          onClose={() => { setModalMode(null); setEditingId(null); }}
          onSave={handleSave}
        />
      )}

      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {productCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
              cat === c
                ? "bg-white text-black border-white"
                : "bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:text-white hover:border-white/[0.2]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 max-w-xs">
            <Search size={14} className="text-zinc-500" />
            <input placeholder="Search products…" className="bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 outline-none w-full" />
          </div>
          <IconBtn icon={Filter} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <Th>Product</Th><Th>Category</Th><Th>Price</Th><Th>Stock</Th><Th>Status</Th><Th>Featured</Th><Th className="text-right pr-5">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-zinc-400">
                        <Package size={15} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-100 font-medium">{p.name}</p>
                        <p className="text-xs text-zinc-500">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">{p.category}</td>
                  <td className="px-4 py-3 text-sm text-zinc-200">${p.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${p.stock === 0 ? "text-red-400" : p.stock < 10 ? "text-amber-400" : "text-zinc-300"}`}>
                      {p.stock === 0 ? "Out of stock" : p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Pill className={p.status === "Active" ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20" : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}>
                      {p.status}
                    </Pill>
                  </td>
                  <td className="px-4 py-3">
                    {p.featured ? <Star size={14} className="text-amber-300 fill-amber-300" /> : <Star size={14} className="text-zinc-700" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <IconBtn icon={Pencil} title="Edit" onClick={() => { setEditingId(p.id); setModalMode("edit"); }} />
                      <IconBtn icon={Copy} title="Duplicate" onClick={() => handleDuplicate(p)} />
                      <IconBtn icon={p.status === "Active" ? EyeOff : Eye} title="Hide/show" onClick={() => handleToggleHide(p.id)} />
                      <IconBtn icon={Trash2} title="Delete" onClick={() => handleDelete(p.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <Card className="p-5">
          <p className="text-sm font-medium text-white mb-3">Media uploads</p>
          <div className="space-y-2">
            {["Images", "Videos", "3D model (GLB / GLTF)"].map((m) => (
              <div key={m} className="flex items-center justify-between px-3 py-2 rounded-xl border border-dashed border-white/[0.12] text-xs text-zinc-400">
                <span className="flex items-center gap-2"><Upload size={13} /> {m}</span>
                <span className="text-zinc-600">Drop file</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-medium text-white mb-3">Variants</p>
          <div className="flex flex-wrap gap-2">
            {["Space Black", "Silver", "Gold", "Blue Titanium"].map((c) => (
              <Pill key={c} className="bg-white/[0.04] text-zinc-300 border-white/[0.08]">{c}</Pill>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-3">Storage options</p>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {["256GB", "512GB", "1TB", "2TB"].map((s) => (
              <Pill key={s} className="bg-white/[0.04] text-zinc-300 border-white/[0.08]">{s}</Pill>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-medium text-white mb-3">Pricing & discount</p>
          <div className="space-y-2 text-xs text-zinc-400">
            <div className="flex justify-between"><span>Base price</span><span className="text-zinc-200">$1,199.00</span></div>
            <div className="flex justify-between"><span>Discount</span><span className="text-emerald-400">-10%</span></div>
            <div className="flex justify-between"><span>Final price</span><span className="text-zinc-200 font-medium">$1,079.10</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------------------------- Orders ---------------------------------- */

function OrdersView() {
  return (
    <div>
      <SectionHeader title="Orders" subtitle="Track, confirm and fulfil every order in one place." />
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <Th>Order ID</Th><Th>Customer</Th><Th>Products</Th><Th>Total</Th><Th>Payment</Th><Th>Status</Th><Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm text-zinc-100 font-medium">{o.id}</td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{o.customer}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400">{o.products} items</td>
                  <td className="px-4 py-3 text-sm text-zinc-200">${o.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400">{o.payment}</td>
                  <td className="px-4 py-3"><StatusDropdown value={o.status} /></td>
                  <td className="px-4 py-3 text-sm text-zinc-500">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* -------------------------------- Customers -------------------------------- */

function CustomersView() {
  return (
    <div>
      <SectionHeader title="Customers" subtitle="Everyone who has ever placed an order in your store." />
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <Th>Name</Th><Th>Email</Th><Th>Orders</Th><Th>Total spent</Th><Th>Last order</Th><Th className="text-right pr-5">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-xs text-zinc-300 font-medium">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm text-zinc-100 font-medium">{c.name}</span>
                      {c.blocked && <Pill className="bg-red-400/10 text-red-300 border-red-400/20">Blocked</Pill>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{c.orders}</td>
                  <td className="px-4 py-3 text-sm text-zinc-200">${c.spent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-zinc-500">{c.last}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <IconBtn icon={EyeOff} title="Block user" />
                      <IconBtn icon={Trash2} title="Delete user" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* -------------------------------- Analytics -------------------------------- */

function AnalyticsView() {
  return (
    <div>
      <SectionHeader title="Analytics" subtitle="Store performance across revenue, orders and visitors." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Conversion rate" value="3.4%" delta="+0.3pt" positive icon={TrendingUp} />
        <StatCard label="Visitors" value="94,281" delta="+11%" positive icon={Users} />
        <StatCard label="Avg. order value" value="$268" delta="+2.1%" positive icon={ShoppingCart} />
        <StatCard label="Return rate" value="1.8%" delta="-0.2pt" positive icon={ArrowDownRight} />
      </div>
      <Card className="p-5">
        <h3 className="text-sm font-medium text-white mb-4">Sales by category (units)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={categorySales} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="#71717a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#71717a" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
              formatter={(v) => `$${v.toLocaleString()}`}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {categorySales.map((_, i) => (
                <Cell key={i} fill={GRAYS[i % GRAYS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

/* --------------------------------- Sidebar ---------------------------------- */

function Sidebar({ active, setActive, open, setOpen }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-40 w-64 shrink-0 bg-zinc-950 border-r border-white/[0.06] flex flex-col transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <span className="text-black text-sm font-bold"></span>
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">Store Admin</span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-zinc-500">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            if (item.children) {
              return (
                <div key={item.key}>
                  <button
                    onClick={() => { setActive(item.key); setExpanded((e) => !e); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                      isActive ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={16} strokeWidth={1.75} />
                      {item.label}
                    </span>
                    <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  {expanded && (
                    <div className="ml-8 mt-0.5 space-y-0.5 border-l border-white/[0.06] pl-3">
                      {item.children.map((c) => (
                        <button
                          key={c}
                          onClick={() => setActive(item.key)}
                          className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                  isActive ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/[0.05] cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-xs text-zinc-300 font-medium">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-200 font-medium truncate">Admin</p>
              <p className="text-[11px] text-zinc-500 truncate">admin@store.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------------------------------- Layout ---------------------------------- */

const TITLES = {
  categories: ["Categories", "Create, edit, reorder and delete storefront categories.", ["Mac", "iPhone", "iPad", "Watch", "Vision", "Accessories"]],
  reviews: ["Reviews", "Moderate customer reviews before they go live.", ["All reviews", "Approved", "Pending", "Rating filter"]],
  coupons: ["Coupons", "Create discount codes and manage their rules.", ["% discount", "Expiry date", "Min. purchase", "Usage limit"]],
  media: ["Media Library", "A Shopify / Strapi-style library for every asset.", ["Images", "Videos", "3D models", "Search", "Replace"]],
  homepage: ["Homepage", "Control what customers see the moment they land.", ["Hero", "Featured products", "Latest products", "Banner", "Promotions"]],
  landing: ["Landing Pages", "Build large campaign pages like Vision, no code needed.", ["Hero", "Title", "Background video", "Buttons", "Sections", "Gallery", "CTA"]],
  herovideos: ["Hero Videos", "Upload and swap the video behind every hero section.", ["Homepage video", "Vision video", "Mac video", "iPhone video"]],
  inventory: ["Inventory", "Stay ahead of stockouts across every warehouse.", ["Stock", "Low stock", "Out of stock", "Incoming stock"]],
  payments: ["Payments", "Stripe transactions, refunds and failures at a glance.", ["Transactions", "Refunds", "Failed payments"]],
  shipping: ["Shipping", "Define how and what it costs to ship an order.", ["Shipping methods", "Shipping cost", "Tracking number"]],
  notifications: ["Notifications", "Stay on top of what needs your attention.", ["New order", "Low stock", "New customer", "Payment failed"]],
  admins: ["Admins", "Manage who has access to this dashboard.", ["Add admin", "Roles", "Permissions"]],
  settings: ["Settings", "The core configuration for your storefront.", ["Website name", "Logo", "Favicon", "Social links", "Contact info", "Footer", "SEO"]],
};

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeLabel = NAV.find((n) => n.key === active)?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-black flex" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif" }}>
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/[0.06] bg-black/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-zinc-400">
              <LayoutDashboard size={20} />
            </button>
            <span className="text-sm text-zinc-500">Store Admin / <span className="text-zinc-200">{activeLabel}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1.5">
              <Search size={13} className="text-zinc-500" />
              <input placeholder="Search…" className="bg-transparent text-xs text-zinc-300 placeholder:text-zinc-600 outline-none w-36" />
            </div>
            <IconBtn icon={Bell} />
          </div>
        </header>

        <main className="p-4 lg:p-8 max-w-[1400px]">
          {active === "dashboard" && <DashboardHome />}
          {active === "products" && <ProductsView />}
          {active === "orders" && <OrdersView />}
          {active === "customers" && <CustomersView />}
          {active === "analytics" && <AnalyticsView />}
          {TITLES[active] && (
            <PlaceholderView title={TITLES[active][0]} description={TITLES[active][1]} chips={TITLES[active][2]} />
          )}
        </main>
      </div>
    </div>
  );
}