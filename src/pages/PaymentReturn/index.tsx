/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-05-18 14:41:19
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-05-18 14:42:49
 * @FilePath: /playSite/src/pages/PaymentReturn/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// PaymentReturn.tsx
import { useEffect } from "react";

const PaymentReturn = () => {
  useEffect(() => {
    // 如果窗口是由 window.open 打开的，则可以关闭
    if (window.opener) {
      window.close();
    }
  }, []);

  return <div>支付完成，窗口即将关闭...</div>;
};

export default PaymentReturn;
