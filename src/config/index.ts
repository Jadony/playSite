/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-28 19:33:08
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-06-13 16:18:34
 * @FilePath: /playSite/src/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 需要显示顶部背景图片的页面
export const hasBgPage = ["/", "/games", "/user-center", "/payment"];

// 意见反馈枚举
export const FeedbackType = (t: any) => {
  return {
    topUpAndFunding: t("feedback.topUpAndFunding"),
    paymentIssues: t("feedback.paymentIssues"),
    signUpAndLogin: t("feedback.signUpAndLogin"),
    gamesAndProducts: t("feedback.gamesAndProducts"),
    afterSalesService: t("feedback.afterSalesService"),
    suggestions: t("feedback.suggestions"),
    others: t("feedback.others"),
  };
};
