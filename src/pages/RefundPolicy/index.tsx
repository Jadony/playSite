import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-inter bg-[#0E0E11] text-gray-400">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Refund Policy
        </h1>
        <p className="text-gray-500 mb-12 text-sm leading-relaxed border-l-2 border-gray-700 pl-4 py-1 italic">
          Please note that these rules shall govern the platform’s
          decision-making regarding order refunds only when a dispute arises
          between the two parties.
        </p>

        <div className="space-y-12 text-sm md:text-base">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
              1. General Rules
            </h2>
            <ol className="list-decimal pl-6 space-y-3 marker:text-gray-600">
              <li>
                Users may apply for a refund by contacting our 24/7 online
                customer service.
              </li>
              <li>
                For refund requests, please contact customer service within 7
                days of placing the order.
              </li>
              <li>Your refund may take 3-14 business days to process.</li>
            </ol>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
              2. Circumstances in Which a Refund May Be Initiated
            </h2>
            <div className="space-y-4 leading-relaxed">
              <ul className="list-disc pl-6 space-y-3 marker:text-gray-600">
                <li>
                  <strong className="text-gray-200">Undelivered:</strong> After
                  the order countdown ends or the status is marked as completed,
                  if it is confirmed that the corresponding product has not been
                  received in the designated account, the customer may apply for
                  a refund.
                </li>
                <li>
                  <strong className="text-gray-200">Repeated Payment:</strong>{" "}
                  The user has made multiple payments for a single order, and
                  the order has not yet been delivered. The user must provide
                  payment receipts for all transactions, and only the excess
                  amount will be refunded.
                </li>
                <li>
                  <strong className="text-gray-200">
                    Failure to Submit Valid Information:
                  </strong>{" "}
                  To prevent fraud, we may require customer assistance to verify
                  order information or provide supplementary verification. If
                  the customer refuses or fails to complete the verification, we
                  will automatically execute a refund after 48 hours.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
              3. Non-Refundable Situations
            </h2>
            <div className="space-y-4 leading-relaxed">
              <p>
                For the avoidance of doubt, refund rules do not apply to the
                following situations:
              </p>
              <ul className="list-disc pl-6 space-y-3 marker:text-gray-600">
                <li>
                  <strong className="text-gray-200">Delivery Completed:</strong>{" "}
                  The user purchased the order by mistake due to their own
                  reasons (e.g., providing the wrong account/region/server,
                  purchasing the wrong game, unauthorized purchase by a third
                  party using the user's device, etc.), and the order has
                  already been successfully delivered.
                </li>
                <li>
                  <strong className="text-gray-200">Consumed Goods:</strong> The
                  user has consumed all or part of the delivered game points,
                  coins, virtual goods, etc.
                </li>
                <li>
                  <strong className="text-gray-200">Unlisted Reasons:</strong>{" "}
                  Any reason not explicitly listed in the “Circumstances in
                  Which a Refund May Be Initiated” section above.
                </li>
                <li>
                  <strong className="text-gray-200">Invalid Evidence:</strong>{" "}
                  Evidence claiming the account/product is “not as described” or
                  “unusable” that was shared on external platforms other than
                  playdd.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
              4. Refund Process
            </h2>
            <div className="space-y-4 leading-relaxed">
              <p>
                Without violating reasonable conditions, please contact our
                online customer service. After the user submits the order number
                and the reason for the refund, we will review the request. Upon
                confirmation that the issue was caused by the platform’s error,
                we will issue a partial or full refund depending on the scope of
                responsibility. If approved, the refund will be returned to the
                customer's playdd balance, the original payment account, or the
                associated bank card.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
              5. Refund Method
            </h2>
            <div className="space-y-4 leading-relaxed">
              <p>
                The final method of refund (e.g., original payment path or
                platform credit) is determined solely by the platform.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
              6. Policy Updates
            </h2>
            <div className="space-y-4 leading-relaxed">
              <p>
                This policy may be adjusted based on actual circumstances, and
                we reserve the right to modify these terms at any time without
                prior notice.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;