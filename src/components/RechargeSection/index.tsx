import React from "react";

const RechargeSection: React.FC = () => {
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: "Zenless Zone Zero",
    price: "$ 280.00",
    original: "$ 294",
    discount: "-10%",
    tag: i === 1 ? "Full today" : null,
    image:
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=300&auto=format&fit=crop",
  }));

  return (
    <section className="w-full px-4 md:px-12 lg:px-24 mb-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT SIDEBAR: Filters & Form */}
        <div className="lg:col-span-3 h-fit space-y-8">
          {/* User Info / Ticker */}
          <div className="flex items-center gap-3 bg-[#121212] border border-white/10 p-3 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-xs">👾</span>
            </div>
            <div>
              <p className="text-xs text-gray-400">User 183****923</p>
              <p className="text-[10px] text-gray-600">
                placed an order 5 minutes ago
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Community Select */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block font-medium ml-1">
                Community
              </label>
              <div className="bg-[#121212] border border-white/10 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-white/20 transition-colors">
                <span className="text-sm text-white">Zenless Zone Zero</span>
                <span className="text-gray-500 text-xs">▼</span>
              </div>
            </div>

            {/* Recharge Method */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block font-medium ml-1">
                Recharge method
              </label>
              <div className="bg-[#121212] border border-white/10 rounded-lg p-3 cursor-pointer hover:border-white/20 transition-colors">
                <span className="text-sm text-white">
                  Self-service recharge
                </span>
              </div>
            </div>

            {/* Area / Server */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block font-medium ml-1">
                Area / Server
              </label>
              <div className="bg-[#121212] border border-white/10 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-white/20 transition-colors">
                <span className="text-sm text-white">
                  International-Clothing
                </span>
                <span className="text-gray-500 text-xs">▼</span>
              </div>
            </div>

            {/* UID */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block font-medium ml-1">
                UID
              </label>
              <input
                type="text"
                placeholder="Game ID"
                className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block font-medium ml-1">
                Quantity
              </label>
              <div className="flex items-center justify-between bg-[#121212] border border-white/10 rounded-lg p-1">
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
                  -
                </button>
                <span className="text-sm font-medium">1</span>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
                  +
                </button>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4">
              <label className="text-xs text-gray-400 mb-1 block font-medium ml-1">
                Price
              </label>
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-xl font-bold text-pink-500">
                  $ 280.00
                </span>
                <span className="text-[10px] text-gray-500">
                  $200 OFF Weekly &gt;
                </span>
              </div>
              <button className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all">
                Trade Now -&gt;
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT GRID: Products */}
        <div className="lg:col-span-9 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black italic text-white tracking-wide">
              Genshin Impact
            </h3>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search for game names or keywords"
                className="w-full bg-black/20 border border-white/10 rounded-full py-1.5 pl-8 pr-4 text-xs text-white focus:outline-none focus:border-white/20"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                🔍
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#121212] rounded-xl border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer"
              >
                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end z-10">
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    {item.discount}
                  </span>
                  {item.tag && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Image */}
                <div className="p-6 flex items-center justify-center relative bg-gradient-to-b from-white/5 to-transparent">
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-24 h-24 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-3 bg-[#0a0a0a]">
                  <h4 className="text-[11px] font-bold text-white mb-2 truncate">
                    {item.title}
                  </h4>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">
                        {item.price}
                      </p>
                      <p className="text-[10px] text-gray-600 line-through">
                        {item.original}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-500">
            <span>Viewing items 1-20 of 2164</span>
            <div className="flex gap-2">
              <button className="w-6 h-6 border border-white/10 rounded flex items-center justify-center hover:bg-white/10">
                &lt;
              </button>
              <button className="w-6 h-6 border border-white/10 rounded flex items-center justify-center hover:bg-white/10">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RechargeSection;
