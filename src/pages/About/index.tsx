/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-08-09 20:42:09
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-08-24 16:53:57
 * @FilePath: /playSite/src/pages/About/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "./style.css";

const About = () => {
  return (
    <div className="about-wrap flex flex-col text-white bg-[#000]">
      {/* Hero Section */}
      <div className="w-[1280px] mx-auto">
        <div className="relative w-full h-[1400px] bg-cover bg-center flex flex-col justify-center items-start px-10 md:px-20 lg:px-40">
          <div className="relative z-10 max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              歡迎來到 XXXX
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              這裏提供優惠、安全、好玩的遊戲充值體驗
            </p>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto px-6 pb-20">
          {/* Story Section */}
          <div className="w-full text-center space-y-8 animate-slide-up border-b border-gray-700 pb-20 mb-40">
            <div className="w-full relative inline-block mb-12">
              <div className="w-full text-5xl md:text-4xl font-bold mb-2 border-b border-gray-500 pb-8">
                我 們 的 故 事
              </div>
              <div className="absolute top-[85%] left-0 w-1/6 h-2 bg-[#611e91]"></div>
              <div className="absolute top-[85%] right-0 w-1/6 h-2 bg-[#611e91]"></div>
            </div>

            <div className="w-full text-white text-lg text-left">
              <p className="mb-4">
                在大多數交易平臺，充值只是冰冷的工具和無聊的流水線。作爲網站的創建者，同時也是熱愛遊戲的玩家
              </p>
              <p>我們始終相信：涉及遊戲的一切，都應該好玩。</p>
            </div>
          </div>

          {/* Mission Box */}
          <div className="border border-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden group animate-slide-up bg-[#070707]">
            <h3 className="text-xl font-bold mb-8 text-white">
              我們需要重新審視慣例，思考並定義產品：
            </h3>

            <ul className="space-y-6 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="leading-relaxed text-base text-white">
                  <span className="font-medium">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在安全上，
                  </span>
                  我們的技術團隊採用全鏈路數據加密和智能風控引擎，守護你的賬戶隱私與資金安全。
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="leading-relaxed text-base text-white">
                  <span className="font-medium">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在服務上，
                  </span>
                  我們提供極具競爭力的商品優惠與極速到賬服務，交易異常情況會由專業的客服團隊及時介入處理。
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="leading-relaxed text-base text-white">
                  <span className="font-medium">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在體驗上，
                  </span>
                  我們希望把“趣味”嵌入網頁，把程式化的消費，打造成一段充滿樂趣與驚喜的旅途。
                </span>
              </li>
            </ul>
          </div>

          {/* Footer Tagline */}
          <div className="text-center py-10 animate-slide-up border-t border-gray-700 mt-40 pt-20">
            <p className="text-2xl md:text-3xl font-medium text-white leading-normal">
              我們不僅是服務提供商
              <br />
              <span className="text-white font-bold mt-2 block">
                更是與你同行的玩家
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
